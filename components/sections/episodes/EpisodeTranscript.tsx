// @ts-nocheck
"use client";

import TranscriptDisplay from "@/src/app/(website)/components/TranscriptDisplay";

interface EpisodeTranscriptProps {
  data: {
    showTranscript?: boolean;
    showTimestamps?: boolean;
    allowDownload?: boolean;
  };
  episode: {
    transcript?: any;
    transcriptSegments?: any[];
  };
}

export default function EpisodeTranscript({
  data,
  episode,
}: EpisodeTranscriptProps) {
  if (!data?.showTranscript) return null;

  const transcript = episode?.transcript || "";
  const transcriptSegments = episode?.transcriptSegments || [];

  if (!transcript && (!transcriptSegments || transcriptSegments.length === 0)) {
    return null;
  }

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-green-600"
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
            Episode Transcript
          </h3>
          <p className="text-gray-600 text-sm">
            Full transcript with{" "}
            {data.showTimestamps ? "timestamps" : "text only"}
          </p>
        </div>

        <TranscriptDisplay
          transcript={transcript}
          transcriptSegments={transcriptSegments}
          showTimestamps={data.showTimestamps}
          allowDownload={data.allowDownload}
        />
      </div>
    </div>
  );
}
