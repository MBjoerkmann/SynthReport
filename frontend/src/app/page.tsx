"use client";

import { useState } from "react";

type Recommendation = {
  name: string;
  description: string;
  feasibility: string;
  action_plan: string[];
  duration: string;
};

type Analysis = {
  company_description: string;
  recommendations: Recommendation[];
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportEmail, setReportEmail] = useState("");
  const [sendingReport, setSendingReport] = useState(false);
  const [reportMessage, setReportMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setReportMessage(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyzer/analyze-url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analysis. Please check the URL and try again.");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
    <main className="flex min-h-screen flex-col items-center p-24 text-white">
      <h1 className="text-4xl font-bold mb-8">Company Page Analyzer</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mb-8">
        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="w-full bg-white/10 max-w-4xl backdrop-blur-sm shadow-md rounded-lg p-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Analyze Company</h2>
              <div className="flex items-center border-b-2 border-blue-500 py-2 mb-4">
                <input
                  className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter company website URL"
                  aria-label="Company URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </form>

        {/* Report Generation Card */}
        <form onSubmit={handleGenerateReport} className="flex-1">
          <div className="w-full bg-white/10 max-w-4xl backdrop-blur-sm shadow-md rounded-lg p-8 mt-8 p-8 h-full flex flex-col justify-between bg-gradient-to-r from-orange-600/20 to-pink-600/20">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get Report by Email</h2>
              <div className="flex items-center border-b-2 border-blue-500 py-2 mb-4" >
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
                  className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  disabled={sendingReport || !analysis}
                >
                  {sendingReport ? "Sending..." : "Send Report"}
                </button>
              </div>
              {reportMessage && (
                <p className={reportMessage.includes("successfully") ? "text-green-400" : "text-red-500"}>
                  {reportMessage}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {analysis && (
        <div className="w-full bg-white/10 max-w-4xl backdrop-blur-sm shadow-md rounded-lg p-8 mt-8">
          
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold ">Company Description</h3>
            <p className="text-white">{analysis.company_description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="bg-white/5 rounded-lg -5 backdrop-blur-sm border border-white/20 flex flex-col h-full">
                  <h4 className="text-lg font-bold">{rec.name}</h4>
                  <p className="text-white mb-2">{rec.description}</p>
                  <p><strong>Feasibility:</strong> {rec.feasibility}</p>
                  <p><strong>Duration:</strong> {rec.duration}</p>
                  <div className="mt-2">
                    <h5 className="font-semibold">Action Plan:</h5>
                    <ul className="list-disc list-inside pl-4">
                      {rec.action_plan.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
