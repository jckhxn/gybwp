"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollToSection } from "@/src/components/shared/ScrollToSection";
import { client } from "@/src/lib/sanity-utils";
import { LATEST_EPISODE, PODCAST_DETAILS_QUERY } from "@/src/lib/queries";
import { formatDate } from "@/src/lib/utils";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Play } from "lucide-react";

// Define interface for the episode data
interface Episode {
  _id?: string;
  title?: string;
  episodeName?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  image?: string;
  uuid?: string;
  pathname?: {
    current?: string;
  };
  publishedAt?: string;
  blurb?: string;
  youtube?: {
    title?: string;
    episodeName?: string;
    episodeNumber?: number;
    seasonNumber?: number;
    thumbnail?: string;
    uuid?: string;
    publishedAt?: string;
    blurb?: string;
  };
}

export const LatestEpisode = () => {
  const [latestEpisode, setLatestEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        // Fetch the latest episode directly using the updated LATEST_EPISODE query
        const latestEpisodeData = await client.fetch(LATEST_EPISODE);

        if (latestEpisodeData) {
          setLatestEpisode(latestEpisodeData);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching latest episode:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-8 w-3/4 bg-gray-300 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
              <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !latestEpisode) {
    return (
      <div className="w-full py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to load the latest episode
          </h2>
          <p className="text-gray-600 mb-6">Please check back later.</p>
        </div>
      </div>
    );
  }

  // Helper function for safer date formatting
  const formatEpisodeDate = (dateString: string | undefined) => {
    if (!dateString) return "Recent";

    try {
      return formatDate(dateString);
    } catch (e) {
      return "Recent";
    }
  };

  // Helper: get guests as a string
  const getGuestNames = (episode: any) => {
    if (episode.guests && episode.guests.length > 0) {
      return episode.guests.map((g: any) => g.name).join(", ");
    }
    if (
      episode.youtube &&
      episode.youtube.guests &&
      episode.youtube.guests.length > 0
    ) {
      return episode.youtube.guests.map((g: any) => g.name).join(", ");
    }
    return null;
  };

  // Helper: get duration
  const getDuration = (episode: any) => {
    return episode.youtube?.duration || episode.duration || null;
  };

  // Helper: get tags/keywords
  const getTags = (episode: any) => {
    return episode.keywords || episode.youtube?.keywords || [];
  };

  // Helper: get episode number badge
  const getEpisodeNumber = (episode: any) => {
    return episode.episodeNumber || episode.youtube?.episodeNumber || null;
  };

  // Helper: get thumbnail
  const getThumbnail = (episode: any) => {
    return (
      episode.image || episode.youtube?.thumbnail || "/images/placeholder.svg"
    );
  };

  // Helper: get episode link
  const getEpisodeLink = (episode: any) => {
    return episode.pathname?.current || `/episodes/${episode.uuid}`;
  };

  return (
    <section className="w-full py-8 md:py-12 bg-transparent relative overflow-hidden mb-0">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Pill and section header */}
          <div className="w-full flex flex-col items-center mb-2">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold text-sm mb-2">
              Latest Episode
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Don&apos;t Miss Our Newest Release
            </h1>
          </div>
          <div className="w-full flex flex-col items-center">
            {/* Thumbnail with overlays */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto mb-6 group">
              <Image
                src={getThumbnail(latestEpisode)}
                alt={latestEpisode.title || "Latest episode thumbnail"}
                fill
                className="object-cover rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              {/* Play button overlay */}
              <Link
                href={getEpisodeLink(latestEpisode)}
                aria-label="Listen to latest episode"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 dark:bg-gray-900/80 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Play
                      className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </Link>
              {/* Episode number badge */}
              {getEpisodeNumber(latestEpisode) && (
                <div className="absolute top-3 left-3 bg-gray-900/80 dark:bg-gray-100/80 text-white dark:text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                  Ep. {getEpisodeNumber(latestEpisode)}
                </div>
              )}
            </div>
          </div>
          {/* Episode info */}
          <div className="space-y-2 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
              {formatEpisodeTitle(
                latestEpisode.title ||
                  latestEpisode.episodeName ||
                  "Latest Episode"
              ).replace(/\.$/, "")}
            </h2>
            {getGuestNames(latestEpisode) && (
              <div className="text-primary font-medium text-lg mb-1">
                with {getGuestNames(latestEpisode)}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 text-sm mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatEpisodeDate(latestEpisode.publishedAt)}
              </span>
              {getDuration(latestEpisode) && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getDuration(latestEpisode)}
                </span>
              )}
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {latestEpisode.blurb ||
                latestEpisode.youtube?.blurb ||
                "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
            </p>
            {/* Tags */}
            {getTags(latestEpisode).length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {getTags(latestEpisode)
                  .slice(0, 4)
                  .map((tag: any, i: number) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link
                href={getEpisodeLink(latestEpisode)}
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary-light hover:to-primary text-white px-6 py-3 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <Play className="h-4 w-4 mr-2" fill="currentColor" />
                Listen Now
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href={getEpisodeLink(latestEpisode)}
                className="group inline-flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-6 py-3 text-base font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2"
              >
                Show Notes
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-full pt-10">
            <ScrollToSection
              targetId="episodes"
              className="inline-flex items-center text-primary hover:text-primary-light transition-colors gap-1"
            >
              Browse all episodes
              <ArrowRight className="h-4 w-4 transform transition-transform duration-200 hover:translate-x-1" />
            </ScrollToSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LatestEpisode as LatestEpisodes };
