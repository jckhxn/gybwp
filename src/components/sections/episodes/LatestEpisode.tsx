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
import { Calendar, Clock, ArrowRight, Play, Headphones } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";
import { SmartButton } from "@/src/components/ui/SmartButton";

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
  section: {
    _type: "latestEpisode";
    _key?: string;
    sectionId?: string;
    title?: string;
    description?: string;
    showAutomatic?: boolean;
    specificEpisode?: any;
    primaryButton?: {
      text?: string;
      componentLink?: any;
    };
    secondaryButton?: {
      text?: string;
      componentLink?: any;
    };
  };
}

export function LatestEpisode({ section }: LatestEpisodeProps) {
  const componentId = getComponentId(section, "latest-episode");
  const [latestEpisode, setLatestEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    title = "Latest Episode",
    description,
    showAutomatic = true,
    specificEpisode,
    primaryButton = { text: "Listen Now", componentLink: null },
    secondaryButton = { text: "Show Notes", componentLink: null },
  } = section;

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        if (showAutomatic) {
          // Fetch the latest episode directly using the updated LATEST_EPISODE query
          const latestEpisodeData = await client.fetch(LATEST_EPISODE);

          if (latestEpisodeData) {
            setLatestEpisode(latestEpisodeData);
          }
        } else if (specificEpisode) {
          // Use the specific episode from Sanity
          setLatestEpisode(specificEpisode);
        }
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching latest episode:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, [showAutomatic, specificEpisode]);

  if (isLoading) {
    return (
      <section id={componentId} className="pt-14 pb-10 md:pt-20 md:pb-16 relative">
        {/* Subtle divider at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
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
      </section>
    );
  }

  if (error || !latestEpisode) {
    return (
      <section id={componentId} className="pt-14 pb-10 md:pt-20 md:pb-16 relative">
        {/* Subtle divider at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
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
    <section id={componentId} className="relative w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNhZGE0YWMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                    {title}
                  </span>
                  {getEpisodeNumber(latestEpisode) && (
                    <span className="text-gray-500 text-xs font-medium">
                      Episode {getEpisodeNumber(latestEpisode)}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {formatEpisodeTitle(
                  latestEpisode.title ||
                    latestEpisode.episodeName ||
                    "Latest Episode"
                ).replace(/\.$/, "")}
              </motion.h1>

              {getGuestNames(latestEpisode) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-2 text-lg text-primary font-medium"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Featuring {getGuestNames(latestEpisode)}
                </motion.div>
              )}
            </div>

            {/* Episode Metadata */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {formatEpisodeDate(latestEpisode.publishedAt)}
                </span>
              </div>
              {getDuration(latestEpisode) && (
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {getDuration(latestEpisode)}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              {latestEpisode.blurb ||
                latestEpisode.youtube?.blurb ||
                description ||
                "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
            </motion.p>

            {/* Tags */}
            {getTags(latestEpisode).length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-2"
              >
                {getTags(latestEpisode)
                  .slice(0, 4)
                  .map((tag: any, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <SmartButton
                data={{
                  ...primaryButton,
                  link: primaryButton.componentLink ? undefined : getEpisodeLink(latestEpisode),
                  componentLink: primaryButton.componentLink,
                }}
                className="group relative h-14 px-8 text-base font-semibold text-white overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-light shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-3 justify-center"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <Play className="w-5 h-5 relative z-10" fill="currentColor" />
                <span className="relative z-10">{primaryButton.text}</span>
                <ArrowRight className="w-4 h-4 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
              </SmartButton>

              {secondaryButton && (
                <SmartButton
                  data={{
                    ...secondaryButton,
                    link: secondaryButton.componentLink ? undefined : getEpisodeLink(latestEpisode),
                    componentLink: secondaryButton.componentLink,
                  }}
                  className="group h-14 px-8 text-base font-medium text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 flex items-center gap-3 justify-center"
                >
                  <Headphones className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{secondaryButton.text}</span>
                </SmartButton>
              )}
            </motion.div>

            {/* Browse Episodes Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-4"
            >
              <ScrollToSection
                targetId="episodes"
                className="inline-flex items-center text-primary hover:text-primary-light transition-colors gap-2 font-medium group"
              >
                Browse all episodes
                <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </ScrollToSection>
            </motion.div>
          </div>

          {/* Right Column - Episode Artwork */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              {/* Main image container */}
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute -inset-2 bg-gradient-to-br from-white/40 to-white/20 rounded-2xl backdrop-blur-sm" />
                
                {/* Episode image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <Image
                    src={getThumbnail(latestEpisode)}
                    alt={latestEpisode.title || "Latest episode thumbnail"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play button overlay */}
                  <Link
                    href={getEpisodeLink(latestEpisode)}
                    aria-label="Listen to latest episode"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white">
                      <Play
                        className="w-8 h-8 text-primary ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </Link>
                </div>

                {/* Episode number badge */}
                {getEpisodeNumber(latestEpisode) && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white">
                    Episode {getEpisodeNumber(latestEpisode)}
                  </div>
                )}
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl backdrop-blur-sm hidden lg:block"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl backdrop-blur-sm hidden lg:block"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}