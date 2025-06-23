"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollToSection } from "../shared/ScrollToSection";
import { client } from "../../sanity/sanity-utils";
import { LATEST_EPISODE, PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { formatDate } from "../../lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Play } from "lucide-react";

// Define interface for the episode data
interface Episode {
  _id?: string;
  title?: string;
  episodeName?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  thumbnail?: string;
  uuid?: string;
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
        // Fetch the latest episode directly using the new LATEST_EPISODE query
        const latestEpisodeData = await client.fetch(LATEST_EPISODE);

        if (latestEpisodeData && latestEpisodeData.youtube?.uuid) {
          setLatestEpisode(latestEpisodeData.youtube);
        }
        if (latestEpisodeData && latestEpisodeData.uuid) {
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

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 mb-3">
              <span className="text-primary font-medium text-sm">
                Latest Episode
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Discover our newest insights
            </h2>
          </div>
          <Link
            href="/episode"
            className="inline-flex items-center mt-4 md:mt-0 text-secondary hover:text-secondary-light transition-colors"
          >
            View All Episodes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Enhanced Episode Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white"
      >
        {/* Improved gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>

        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        {/* Color accent gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/15 via-transparent to-transparent blur-3xl"></div>

        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Left column - Image */}
          <div className="relative group">
            {/* Enhanced glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-700"></div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
              <Image
                src={latestEpisode.thumbnail || "/images/placeholder.svg"}
                alt={latestEpisode.title || "Latest episode thumbnail"}
                width={640}
                height={360}
                className="object-cover w-full h-full transform transition-all duration-700 group-hover:scale-105"
              />
              {/* Improved image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

              {/* Play button overlay */}
              <Link
                href={`/episode/${latestEpisode.uuid}`}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div className="bg-gradient-to-r from-primary to-primary-light backdrop-blur-sm rounded-full p-5 transform transition-all duration-500 hover:scale-110 shadow-2xl border border-white/20">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </Link>
            </div>

            {/* Episode info badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center border border-white/20">
                <Calendar className="h-3 w-3 mr-1.5" />
                {formatEpisodeDate(latestEpisode.publishedAt)}
              </div>
              {latestEpisode.seasonNumber && latestEpisode.episodeNumber && (
                <div className="bg-gradient-to-r from-primary to-primary-light backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                  S{latestEpisode.seasonNumber} · E{latestEpisode.episodeNumber}
                </div>
              )}
            </div>
          </div>

          {/* Right column - Content */}
          <div className="flex flex-col justify-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {(latestEpisode.title || "Latest Episode").replace(/\.$/, "")}
            </h3>

            <div className="space-y-4">
              <p className="text-gray-100 leading-relaxed">
                {latestEpisode.blurb ||
                  "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
              </p>

              <div className="pt-6">
                <Link
                  href={`/episode/${latestEpisode.uuid}`}
                  className="group relative inline-flex items-center rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white px-8 py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Episode Details
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center w-full pt-10">
        <ScrollToSection
          targetId="episode"
          className="inline-flex items-center text-primary hover:text-primary-light transition-colors gap-1"
        >
          Browse all episodes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </ScrollToSection>
      </div>
    </div>
  );
};

export { LatestEpisode as LatestEpisodes };
