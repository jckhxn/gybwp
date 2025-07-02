// @ts-nocheck
"use client";

import { useState } from "react";
import { 
  Play, 
  Share2, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";
import { formatDate, formatDuration } from "@/src/app/(website)/lib/utils";

interface EpisodeHeroProps {
  section: {
    title?: string;
    showPlayButton?: boolean;
    backgroundImage?: any;
  };
  episode: {
    youtube?: {
      title?: string;
      blurb?: string;
      publishedAt?: string;
      duration?: string;
      seasonNumber?: string;
      episodeNumber?: string;
    };
    episodeName?: string;
    blurb?: string;
    publishedAt?: string;
    seasonNumber?: string;
    episodeNumber?: string;
    prevEpisode?: string;
    nextEpisode?: string;
  };
}

export function EpisodeHero({ section, episode }: EpisodeHeroProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Extract data from episode with proper fallbacks
  const rawTitle = 
    section.title || 
    episode?.youtube?.title || 
    episode?.episodeName || 
    "Untitled Episode";
  const title = formatEpisodeTitle(rawTitle);
  const blurb = episode?.youtube?.blurb || episode?.blurb || "";
  const seasonNumber = episode?.youtube?.seasonNumber || episode?.seasonNumber || "";
  const episodeNumber = episode?.youtube?.episodeNumber || episode?.episodeNumber || "";
  const publishedAt = episode?.youtube?.publishedAt || episode?.publishedAt;
  const duration = episode?.youtube?.duration || "";

  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-b border-gray-100">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Episode Navigation */}
        <div className="flex justify-between items-center mb-8">
          {episode?.prevEpisode ? (
            <Link href={episode.prevEpisode}>
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 py-2 rounded-lg text-sm font-medium">
                <ChevronLeft className="h-4 w-4" />
                Previous Episode
              </button>
            </Link>
          ) : (
            <button
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 opacity-50 px-4 py-2 rounded-lg text-sm font-medium"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Episode
            </button>
          )}

          {episode?.nextEpisode ? (
            <Link href={episode.nextEpisode}>
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 py-2 rounded-lg text-sm font-medium">
                Next Episode
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          ) : (
            <button
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 opacity-50 px-4 py-2 rounded-lg text-sm font-medium"
              disabled
            >
              Next Episode
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Episode Header */}
        <div className="text-center max-w-4xl mx-auto">
          {(seasonNumber || episodeNumber) && (
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/20 mb-6">
              {seasonNumber && `Season ${seasonNumber}`}
              {seasonNumber && episodeNumber && " • "}
              {episodeNumber && `Episode ${episodeNumber}`}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h1>

          {blurb && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              {blurb}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
            {publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDate(publishedAt)}
                </span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDuration(duration)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {section.showPlayButton && (
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Play className="h-5 w-5" />
                Play Episode
              </button>
            )}

            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
