"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/locale-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

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

export default function AIToolPage() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

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
      const response = await fetch(`${API_BASE}/api/analyzer/analyze-url/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        throw new Error(t("aiTool.fetchError"));
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("aiTool.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="aitool-page">
      {/* Hero */}
      <section className="aitool-hero">
        <p className="aitool-hero-eyebrow">AI-powered</p>
        <h1 className="aitool-hero-title">{t("aiTool.heading")}</h1>
        <p className="aitool-hero-desc">{t("aiTool.description")}</p>
      </section>

      {/* URL input */}
      <URLForm
        url={url}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      {/* Cinematic loading state */}
      {loading && (
        <div className="aitool-loading" aria-label={t("aiTool.analyzing")} role="status">
          <div className="aitool-scan-wrap" aria-hidden="true">
            <div className="aitool-scan-grid" />
            <div className="aitool-scan-line" />
            <div className="aitool-scan-corner aitool-scan-corner-tl" />
            <div className="aitool-scan-corner aitool-scan-corner-tr" />
            <div className="aitool-scan-corner aitool-scan-corner-bl" />
            <div className="aitool-scan-corner aitool-scan-corner-br" />
          </div>
          <p className="aitool-loading-label">{t("aiTool.analyzing")}</p>
          <div className="aitool-loading-dots" aria-hidden="true">
            <span className="aitool-loading-dot" />
            <span className="aitool-loading-dot" />
            <span className="aitool-loading-dot" />
          </div>
        </div>
      )}

      {/* Results + report form */}
      {analysis && (
        <>
          <AnalysisDisplay analysis={analysis} />
          <ReportForm analysis={analysis} />
        </>
      )}
    </main>
  );
}
