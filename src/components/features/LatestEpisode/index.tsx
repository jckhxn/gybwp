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

interface LatestEpisodeProps {
  section?: {
    title?: string;
    description?: string;
    showAutomatic?: boolean;
    specificEpisode?: any;
  };
}

export const LatestEpisode = ({ section }: LatestEpisodeProps = {}) => {
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
      <section className="w-full py-8 md:py-16 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
        <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2 sm:space-y-3">
              <div className="w-20 h-5 bg-gray-300 rounded-full mx-auto"></div>
              <div className="space-y-1 sm:space-y-2">
                <div className="h-7 bg-gray-300 rounded w-60 mx-auto"></div>
                <div className="h-7 bg-gray-300 rounded w-44 mx-auto"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>

            {/* Large thumbnail skeleton */}
            <div className="relative">
              <div className="w-60 h-60 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] bg-gray-200 rounded-2xl"></div>
              <div className="absolute -top-2 -right-2 w-12 h-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4 sm:space-y-6 max-w-xs sm:max-w-2xl mx-auto w-full">
              <div className="flex gap-2 sm:gap-3 justify-center">
                <div className="h-7 bg-gray-200 rounded-full w-20"></div>
                <div className="h-7 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-3/5 mx-auto"></div>
              </div>
              <div className="flex gap-1 sm:gap-2 justify-center">
                <div className="h-5 bg-gray-200 rounded-full w-12"></div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                <div className="h-5 bg-gray-200 rounded-full w-10"></div>
              </div>
              <div className="flex gap-2 sm:gap-3 justify-center">
                <div className="h-9 bg-gray-300 rounded-xl w-24"></div>
                <div className="h-9 bg-gray-200 rounded-xl w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !latestEpisode) {
    return (
      <section className="w-full py-12 md:py-16 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Unable to load the latest episode
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              We&apos;re having trouble loading the latest episode. Please check
              back in a few moments.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-light text-white px-6 py-3 font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
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
    <section className="w-full py-8 md:py-16 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-6 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Header Section */}
          <div className="space-y-2 sm:space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block bg-primary text-white px-3 sm:px-4 py-1 rounded-full font-semibold text-xs sm:text-sm tracking-wide uppercase"
            >
              Latest Episode
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xs sm:max-w-3xl mx-auto break-words"
            >
              {formatEpisodeTitle(
                latestEpisode.title ||
                  latestEpisode.episodeName ||
                  "Latest Episode"
              ).replace(/\.$/, "")}
            </motion.h1>

            {getGuestNames(latestEpisode) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-primary font-medium text-base sm:text-lg"
              >
                Featuring {getGuestNames(latestEpisode)}
              </motion.div>
            )}
          </div>

          {/* Large Thumbnail Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            {/* Main thumbnail container - large and centered */}
            <div className="relative w-[85vw] max-w-xs sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] aspect-square rounded-2xl overflow-hidden shadow-xl shadow-black/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/10">
              <Image
                src={getThumbnail(latestEpisode)}
                alt={latestEpisode.title || "Latest episode thumbnail"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Play button overlay */}
              <Link
                href={getEpisodeLink(latestEpisode)}
                aria-label="Listen to latest episode"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-300 hover:scale-110">
                  <Play
                    className="h-7 w-7 sm:h-9 sm:w-9 text-primary ml-0.5"
                    fill="currentColor"
                  />
                </div>
              </Link>
            </div>

            {/* Episode number badge */}
            {getEpisodeNumber(latestEpisode) && (
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-primary text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg border-2 border-white">
                Ep. {getEpisodeNumber(latestEpisode)}
              </div>
            )}

            {/* Subtle glow effect */}
            <div className="absolute -z-10 -inset-3 sm:-inset-6 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl opacity-60" />
          </motion.div>

          {/* Content Section */}
          <div className="space-y-4 sm:space-y-6 max-w-xs sm:max-w-2xl mx-auto">
            {/* Episode metadata */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-600"
            >
              <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-xs sm:text-sm">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {formatEpisodeDate(latestEpisode.publishedAt)}
                </span>
              </span>
              {getDuration(latestEpisode) && (
                <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-xs sm:text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {getDuration(latestEpisode)}
                  </span>
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-700 text-sm sm:text-base leading-relaxed"
            >
              {latestEpisode.blurb ||
                latestEpisode.youtube?.blurb ||
                "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
            </motion.p>

            {/* Tags */}
            {getTags(latestEpisode).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap justify-center gap-1 sm:gap-2"
              >
                {getTags(latestEpisode)
                  .slice(0, 4)
                  .map((tag: any, i: number) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-2 w-full"
            >
              <Link
                href={getEpisodeLink(latestEpisode)}
                className="group inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-light text-white w-full sm:w-auto px-4 sm:px-6 py-3 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <Play className="h-4 w-4 mr-2" fill="currentColor" />
                Listen Now
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={getEpisodeLink(latestEpisode)}
                className="group inline-flex items-center justify-center rounded-xl bg-white hover:bg-gray-50 text-gray-900 w-full sm:w-auto px-4 sm:px-6 py-3 text-base font-medium border border-gray-200 hover:border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Show Notes
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Browse all episodes link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-2 sm:pt-4"
            >
              <ScrollToSection
                targetId="episodes"
                className="inline-flex items-center text-primary hover:text-primary-light transition-colors gap-2 font-medium group text-xs sm:text-sm"
              >
                Browse all episodes
                <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </ScrollToSection>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { LatestEpisode as LatestEpisodes };
