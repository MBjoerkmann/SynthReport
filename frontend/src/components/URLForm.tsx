"use client";

import { useTranslation } from "@/lib/locale-context";

type URLFormProps = {
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
  url: string;
};

export default function URLForm({ setUrl, handleSubmit, loading, error, url }: URLFormProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="aitool-form-card">
      <label className="aitool-form-label" htmlFor="aitool-url-input">
        {t("aiTool.analyzeCompany")}
      </label>
      <div className="aitool-input-row">
        <input
          id="aitool-url-input"
          className="aitool-input"
          type="text"
          placeholder={t("aiTool.placeholder")}
          aria-label={t("aiTool.ariaLabel")}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="aitool-submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? t("aiTool.analyzing") : t("aiTool.analyze")}
        </button>
      </div>
      {error && (
        <p className="aitool-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
