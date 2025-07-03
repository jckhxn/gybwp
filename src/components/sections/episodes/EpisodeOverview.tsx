// @ts-nocheck
"use client";

import { formatDescriptionText } from "@/src/lib/utils";

interface EpisodeOverviewProps {
  data: {
    showDescription?: boolean;
    customDescription?: string;
  };
  episode: {
    youtube?: {
      description?: string;
      blurb?: string;
    };
    blurb?: string;
  };
}

export default function EpisodeOverview({
  data,
  episode,
}: EpisodeOverviewProps) {
  if (!data?.showDescription) return null;

  const description =
    data.customDescription ||
    episode?.youtube?.description ||
    episode?.youtube?.blurb ||
    episode?.blurb ||
    "";

  if (!description) return null;

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Episode Overview
          </h3>
          <p className="text-gray-600 text-sm">
            What you&apos;ll learn in this episode
          </p>
        </div>

        <div className="prose prose-lg prose-gray max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: formatDescriptionText(description),
            }}
          />
        </div>
      </div>
    </div>
  );
}
