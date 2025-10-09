
"use client";

import { useState } from "react";

type Analysis = {
  company_name: string;
  company_description: string;
  recommendations: any[];
};

type ReportFormProps = {
  analysis: Analysis | null;
};

export default function ReportForm({ analysis }: ReportFormProps) {
  const [reportEmail, setReportEmail] = useState("");
  const [sendingReport, setSendingReport] = useState(false);
  const [reportMessage, setReportMessage] = useState<string | null>(null);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingReport(true);
    setReportMessage(null);

    if (!analysis) {
      setReportMessage("Please analyze a company first to generate a report.");
      setSendingReport(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/analyzer/generate-report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: reportEmail, analysis: analysis }),
      });

      if (!response.ok) {
        throw new Error("Failed to send report. Please try again.");
      }

      setReportMessage("Report successfully sent to your email!");
      setReportEmail(""); // Clear email after sending
    } catch (err) {
      setReportMessage(err instanceof Error ? err.message : "An unknown error occurred while sending the report.");
    } finally {
      setSendingReport(false);
    }
  };

  return (
    <form onSubmit={handleGenerateReport} className="flex-1">
      <div className="report-form-container">
        <div>
          <h1>Send report to my email</h1>
          <div>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              aria-label="Report Email"
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              required
            />
            <button
              className="send-report-button"
              type="submit"
              disabled={sendingReport || !analysis}
            >
              {sendingReport ? "Sending..." : "Send Report"}
            </button>
          </div>
          {reportMessage && (
            <p className={reportMessage.includes("successfully") ? "text-white-600" : "text-red-500"}>
              {reportMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
