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
    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">{t("aiTool.analyzeCompany")}</h2>
        <p>{t("aiTool.description")}</p>
        <div className="">
          <div className="inputContainer">
            <input
              className="input"
              type="text"
              placeholder={t("aiTool.placeholder")}
              aria-label={t("aiTool.ariaLabel")}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            className="analyze-button"
            type="submit"
            disabled={loading}
          >
            {loading ? t("aiTool.analyzing") : t("aiTool.analyze")}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}
