// @ts-nocheck
"use client";

import { RelatedEpisodes as RelatedEpisodesComponent } from "@/src/components/features/episodes";

interface RelatedEpisodesProps {
  data: {
    showRelated?: boolean;
    title?: string;
    subtitle?: string;
    maxEpisodes?: number;
  };
  episode: {
    uuid?: string;
    relatedEpisodes?: any[];
  };
}

export default function RelatedEpisodes({
  data,
  episode,
}: RelatedEpisodesProps) {
  if (!data?.showRelated) return null;

  const relatedEpisodes = episode?.relatedEpisodes || [];
  if (relatedEpisodes.length === 0) return null;

  // Limit episodes based on maxEpisodes setting
  const maxEpisodes = data.maxEpisodes || 3;
  const limitedEpisodes = relatedEpisodes.slice(0, maxEpisodes);

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {data.title || "Related Episodes"}
          </h3>
          <p className="text-gray-600 text-sm">
            {data.subtitle || "More episodes you might enjoy"}
          </p>
        </div>

        <RelatedEpisodesComponent
          uuid={episode.uuid}
          relatedEpisodes={limitedEpisodes}
        />
      </div>
    </div>
  );
}
