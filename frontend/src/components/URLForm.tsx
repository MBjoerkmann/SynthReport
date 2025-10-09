
"use client";

import { useState } from "react";

type URLFormProps = {
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
  url: string;
};

export default function URLForm({ setUrl, handleSubmit, loading, error, url }: URLFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Analyze Company</h2>
          <p> Simply put in the url of your website and get recommendations for AI implementation!</p>
          <div className="">
            <div className="inputContainer">
            <input
              className="input"
              type="text"
              placeholder="Enter company website URL"
              aria-label="Company URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            </div>
            <button
              className="analyze-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
    </form>
  );
}
