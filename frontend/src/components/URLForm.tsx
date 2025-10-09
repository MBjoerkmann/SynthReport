
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
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="url-form-container">
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
  );
}
