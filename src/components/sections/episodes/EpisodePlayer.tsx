// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { PodcastPlayer, type PlayerHandle } from "@/src/components/episodes";
import StickyVideoPlayer from "@/src/components/StickyVideoPlayer";
import { getComponentId } from "@/src/lib/sectionId";

interface EpisodePlayerProps {
  section: {
    sectionId?: string;
    showTranscript?: boolean;
    showGuests?: boolean;
    showSponsors?: boolean;
    autoplay?: boolean;
  };
  episode: {
    youtube?: {
      id?: string;
      title?: string;
    };
    uuid?: string;
  };
}

export function EpisodePlayer({ section, episode }: EpisodePlayerProps) {
  const playerRef = useRef<PlayerHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const componentId = getComponentId(section, "episode-player");

  const youtubeId = episode?.youtube?.id;
  const episodeTitle = episode?.youtube?.title || "Episode";

  if (!youtubeId) {
    return (
      <div
        id={componentId}
        className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
      >
        <div className="p-8 text-center">
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 6h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">No video available</p>
            <p className="text-sm">
              This episode doesn&apos;t have a video player
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={componentId} className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
        <StickyVideoPlayer
          youtubeId={youtubeId}
          title={episodeTitle}
          autoplay={section.autoplay}
        />
      </div>

      {/* Podcast Player - Audio version */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
        <PodcastPlayer
          ref={playerRef}
          episode={{
            uuid: episode.uuid,
            youtube: episode.youtube,
          }}
          isPlaying={isPlaying}
          onPlayingChange={setIsPlaying}
        />
      </div>
    </div>
  );
}
