"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/locale-context";

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

type AnalysisDisplayProps = {
  analysis: Analysis | null;
};

type ModalProps = {
  rec: Recommendation;
  index: number;
  onClose: () => void;
};

function RecommendationModal({ rec, index, onClose }: ModalProps) {
  const { t } = useTranslation();

  const hasDetails =
    (rec.action_plan && rec.action_plan.length > 0) ||
    (rec.steps && rec.steps.length > 0);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="aitool-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={rec.name}
    >
      <div className="aitool-modal-panel">
        {/* Header */}
        <div className="aitool-modal-header">
          <div className="aitool-modal-header-text">
            <p className="aitool-rec-number">
              #{String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="aitool-modal-title">{rec.name}</h2>
          </div>
          <button
            className="aitool-modal-close"
            onClick={onClose}
            aria-label={t("analysis.close")}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="aitool-modal-body">
          {/* Badges */}
          <div className="aitool-modal-badges">
            <span className="aitool-badge aitool-badge-feasibility">
              {t("analysis.feasibility")} {rec.feasibility}
            </span>
            <span className="aitool-badge aitool-badge-duration">
              {t("analysis.duration")} {rec.duration}
            </span>
          </div>

          {/* Full description */}
          <p className="aitool-modal-desc">{rec.description}</p>

          {hasDetails && (
            <div className="aitool-modal-details">
              {rec.action_plan && rec.action_plan.length > 0 && (
                <div className="aitool-modal-section">
                  <p className="aitool-rec-section-title">
                    {t("analysis.actionPlan")}
                  </p>
                  <ol className="aitool-rec-list">
                    {rec.action_plan.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {rec.steps && rec.steps.length > 0 && (
                <div className="aitool-modal-section">
                  <div className="aitool-rec-divider" />
                  <p className="aitool-rec-section-title">
                    {t("analysis.steps")}
                  </p>
                  <ol className="aitool-rec-steps-list">
                    {rec.steps.map((step, i) => (
                      <li key={i} className="aitool-rec-step-item">
                        <span className="aitool-rec-step-num">{i + 1}.</span>
                        <span>{step.name}</span>
                        <span className="aitool-rec-step-duration">
                          {step.duration}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  if (!analysis) {
    return null;
  }

  const activeRec =
    activeIndex !== null ? analysis.recommendations[activeIndex] : null;

  return (
    <>
      <div className="aitool-results">
        <div className="aitool-results-header">
          <p className="aitool-results-eyebrow">{t("analysis.resultsFor")}</p>
          <h2 className="aitool-results-company">{analysis.company_name}</h2>
          <p className="aitool-results-desc">{analysis.company_description}</p>
        </div>

        <p className="aitool-rec-heading">{t("analysis.recommendations")}</p>
        <div className="aitool-rec-grid">
          {analysis.recommendations.map((rec, index) => (
            <button
              key={index}
              className="aitool-rec-card aitool-rec-card--clickable"
              onClick={() => openModal(index)}
              aria-label={`${rec.name} — ${t("analysis.showMore")}`}
            >
              {/* Section 1: identity */}
              <div className="aitool-rec-identity">
                <p className="aitool-rec-number">
                  #{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="aitool-rec-name">{rec.name}</h3>
              </div>

              {/* Section 2: description (always clamped on card) */}
              <div className="aitool-rec-desc-block">
                <p className="aitool-rec-desc aitool-rec-desc--clamped">
                  {rec.description}
                </p>
              </div>

              {/* Section 3: badges */}
              <div className="aitool-rec-badges-block">
                <div className="aitool-rec-badges">
                  <span className="aitool-badge aitool-badge-feasibility">
                    {t("analysis.feasibility")} {rec.feasibility}
                  </span>
                  <span className="aitool-badge aitool-badge-duration">
                    {t("analysis.duration")} {rec.duration}
                  </span>
                </div>
              </div>

              {/* Clickable hint */}
              <div className="aitool-rec-card-hint">
                <span className="aitool-rec-hint-label">
                  {t("analysis.showMore")}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeRec !== null && activeIndex !== null && (
        <RecommendationModal
          rec={activeRec}
          index={activeIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
}
