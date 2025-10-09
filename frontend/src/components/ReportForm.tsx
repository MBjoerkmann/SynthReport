
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
          <h2 className="text-2xl font-bold mb-4">Send report to my email</h2>
          <div className="flex items-center border-b-2 py-2 mb-4">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Enter your email"
              aria-label="Report Email"
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              required
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-white text-green-700 hover:bg-gray-100 font-semibold px-6 py-2 text-sm mb-3"
              type="submit"
              disabled={sendingReport || !analysis}
            >
              {sendingReport ? "Sending..." : "Send Report"}
            </button>
          </div>
          {reportMessage && (
            <p className={reportMessage.includes("successfully") ? "text-green-600" : "text-red-500"}>
              {reportMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
