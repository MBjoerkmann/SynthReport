
"use client";

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

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  if (!analysis) {
    return null;
  }

  return (
    <div className="analysis-display">
      <h2>Analysis Results for {analysis.company_name}</h2>
      <div className="pb-6 mb-6 border-b">
        <h3 className="text-xl font-semibold">Company Description</h3>
        <p className="text-white">{analysis.company_description}</p>
      </div>
      <div>
        <h3>Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-card recommendation-${index}`}>
              <h4>{rec.name}</h4>
              <p>{rec.description}</p>
              <p><strong className="feasibility">Feasibility:</strong> {rec.feasibility}</p>
              <p><strong className="duration">Duration:</strong> {rec.duration}</p>
              <div className="action-plan">
                <h5 className="font-semibold mb-2">Action Plan:</h5>
                <ol>
                  {rec.action_plan.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              {rec.steps && rec.steps.length > 0 && (
                <div className="steps">
                  <h5>Steps:</h5>
                  <ol>
                    {rec.steps.map((step, i) => (
                      <li key={i}>{step.name} ({step.duration})</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
