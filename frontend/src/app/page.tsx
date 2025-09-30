"use client";

import { useState } from "react";

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

type Analysis = {
  company_name: string;
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
    setAnalysis(null); // Should perhaps still be set
    setReportMessage(null);

    let formattedUrl = url;
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://www." + formattedUrl;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/analyzer/analyze-url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white">
      <h1 className="text-4xl font-bold mb-8">AI recommendation tool</h1>

      <div className="container mx-auto px-6 py-8">
        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="w-full bg-white/10 max-w-4xl backdrop-blur-sm shadow-md rounded-lg p-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Analyze Company</h2>
              <div className="flex items-center border-b-2 py-2 mb-4">
                <input
                  className="appearance-none bg-transparent focus-visible border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter company website URL"
                  aria-label="Company URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-white text-green-700 hover:bg-gray-100 font-semibold px-6 py-2 text-sm mb-3"
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
        {analysis && (
          <form onSubmit={handleGenerateReport} className="flex-1">
            <div className="w-full bg-white/10 max-w-4xl backdrop-blur-sm shadow-md rounded-lg p-8 mt-8 p-8 h-full flex flex-col justify-between bg-gradient-to-r from-orange-600/20 to-pink-600/20">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get Report by Email?</h2>
                <div className="flex items-center border-b-2 py-2 mb-4" >
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
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {analysis && (
        <div className="w-full bg-blue/10 backdrop-blur-sm shadow-md rounded-lg mb-8 p-8">
          
          <h2 className="text-2xl font-bold mb-4">Analysis Results for {analysis.company_name} </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold ">Company Description</h3>
            <p className="text-white">{analysis.company_description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className={`rounded-lg -5 backdrop-blur-sm border border-white/20 flex flex-col h-full mb-3 p-3 ${index === 0 ? 'bg-green-500/20' : index === 1 ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                  <h4 className="text-lg font-bold">{rec.name}</h4>
                  <p className="text-gray-200 mb-2">{rec.description}</p>
                  <p><strong>Feasibility:</strong> {rec.feasibility}</p>
                  <p><strong>Duration:</strong> {rec.duration}</p>
                  <div className="mt-2">
                    <h5 className="font-semibold">Action Plan:</h5>
                    <ul className="list-disc list-inside pl-4 text-gray-200">
                      {rec.action_plan.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  {rec.steps && rec.steps.length > 0 && (
                    <div className="mt-2">
                      <h5 className="font-semibold">Steps:</h5>
                      <ul className="list-disc list-inside pl-4 text-gray-200">
                        {rec.steps.map((step, i) => (
                          <li key={i}>{step.name} ({step.duration})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
