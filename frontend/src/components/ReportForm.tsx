"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/locale-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

type Analysis = {
  company_name: string;
  company_description: string;
  recommendations: Recommendation[];
};

type Step = {
  name: string;
  duration: string;
};

type Recommendation = {
  name: string;
  description: string;
  feasibility: string;
  action_plan: string[];
  duration: string;
  steps: Step[];
};

type ReportFormProps = {
  analysis: Analysis | null;
};

export default function ReportForm({ analysis }: ReportFormProps) {
  const [reportEmail, setReportEmail] = useState("");
  const [sendingReport, setSendingReport] = useState(false);
  const [reportMessage, setReportMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingReport(true);
    setReportMessage(null);

    if (!analysis) {
      setReportMessage(t("report.noAnalysis"));
      setSendingReport(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/analyzer/generate-report/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: reportEmail, analysis: analysis }),
      });

      if (!response.ok) {
        throw new Error(t("report.sendError"));
      }

      setReportMessage(t("report.success"));
      setReportEmail("");
    } catch (err) {
      setReportMessage(err instanceof Error ? err.message : t("report.unknownError"));
    } finally {
      setSendingReport(false);
    }
  };

  return (
    <form onSubmit={handleGenerateReport} className="flex-1">
      <div className="report-form-container">
        <div>
          <h1>{t("report.heading")}</h1>
          <div>
            <input
              className="input"
              type="email"
              placeholder={t("report.placeholder")}
              aria-label={t("report.ariaLabel")}
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              required
            />
            <button
              className="send-report-button"
              type="submit"
              disabled={sendingReport || !analysis}
            >
              {sendingReport ? t("report.sending") : t("report.sendReport")}
            </button>
          </div>
          {reportMessage && (
            <p className={reportMessage === t("report.success") ? "text-white-600" : "text-red-500"}>
              {reportMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
