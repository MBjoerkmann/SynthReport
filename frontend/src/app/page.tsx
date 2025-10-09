"use client";

import { useState, useEffect } from "react";

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

import URLForm from "@/components/URLForm";
import AnalysisDisplay from "@/components/AnalysisDisplay";
import ReportForm from "@/components/ReportForm";

export default function Home() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("analysis");
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    }
  }, []);

  useEffect(() => {
    if (analysis) {
      localStorage.setItem("analysis", JSON.stringify(analysis));
    }
  }, [analysis]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

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

  return (
    <main className="main-container">
      <h1 className="text-5xl font-bold mb-8">AI recommendation tool</h1>

      <div className="container mx-auto items-center px-6 py-8">
        <URLForm
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        {analysis && <ReportForm analysis={analysis} />}
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {analysis && <AnalysisDisplay analysis={analysis} />}
    </main>
  );
}
