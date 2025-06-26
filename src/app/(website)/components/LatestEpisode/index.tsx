"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollToSection } from "../shared/ScrollToSection";
import { client } from "../../sanity/sanity-utils";
import { LATEST_EPISODE, PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { formatDate } from "../../lib/utils";
import { formatEpisodeTitle } from "../../../../lib/formatTitle";
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
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50/70 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-8 md:gap-10 text-center">
          <div className="space-y-6 max-w-4xl w-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
                <line x1="8" x2="16" y1="22" y2="22" />
              </svg>
              Latest Episode
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-[1.1] pb-2">
                Discover Our Newest Insights
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Tune in to our latest episode where we discuss important topics
                and insights with industry experts.
              </p>
            </div>
          </div>

          {/* Enhanced Episode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200/80 bg-white ring-1 ring-gray-100/80"
          >
            {/* Light gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100/50"></div>

            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>

            {/* Light color accent gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 via-transparent to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/5 via-transparent to-transparent blur-3xl"></div>

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
              {/* Left column - Image */}
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
                <Link href={`/episode/${latestEpisode.uuid}`} className="block">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 backdrop-blur-sm border border-gray-200/50 cursor-pointer">
                    <Image
                      src={latestEpisode.thumbnail || "/images/placeholder.svg"}
                      alt={latestEpisode.title || "Latest episode thumbnail"}
                      width={640}
                      height={360}
                      className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-105"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>

              {/* Right column - Content */}
              <div className="flex flex-col justify-center text-gray-900">
                {/* Episode metadata */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {latestEpisode.seasonNumber && latestEpisode.episodeNumber && (
                    <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                      Season {latestEpisode.seasonNumber}, Episode {latestEpisode.episodeNumber}
                    </div>
                  )}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatEpisodeDate(latestEpisode.publishedAt)}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-tight">
                  {formatEpisodeTitle(latestEpisode.title || "Latest Episode").replace(/\.$/, "")}
                </h3>

                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {latestEpisode.blurb ||
                      "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/episode/${latestEpisode.uuid}`}
                      className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary-light hover:to-primary text-white px-6 py-3 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      <Play className="h-4 w-4 mr-2" fill="currentColor" />
                      Listen Now
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    
                    <Link
                      href={`/episode/${latestEpisode.uuid}`}
                      className="group inline-flex items-center justify-center rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-6 py-3 text-base font-medium border border-gray-300 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
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
      </div>
    </section>
  );
};

export { LatestEpisode as LatestEpisodes };
