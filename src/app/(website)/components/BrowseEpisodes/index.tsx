"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { ALL_SEASONS_QUERY, EPISODES_BY_SEASON_QUERY } from "../../lib/queries";
import {
  formatDate,
  formatDuration,
  formatDurationCompact,
} from "../../lib/utils";
import { Badge } from "@/src/app/(website)/components/ui/badge";

// Define interface for episode object based on the schema
interface Episode {
  _id: string;
  duration?: string;
  youtube?: {
    title?: string;
    episodeNumber?: number;
    seasonNumber?: number;
    thumbnail?: string;
    uuid?: string;
    publishedAt?: string;
    blurb?: string;
    duration?: string;
  };
  details?: {
    keyTakeaways?: string[];
  };
}

export const BrowseEpisodes = ({
  hideHeading = false,
  hideBackground = false,
} = {}) => {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);

  // Define Season interface
  interface Season {
    title: string;
    number: number;
    _id: string;
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [seasonsData, setSeasonsData] = useState<Season[]>([]);
  useEffect(() => {
    client.fetch(ALL_SEASONS_QUERY).then(setSeasonsData);
  }, []);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (activeSeason) {
      setIsLoading(true);
      client
        .fetch(EPISODES_BY_SEASON_QUERY, { name: activeSeason })
        .then((res) => setData(res))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [activeSeason]);

  // Set episodes when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Remove the slice to show all episodes
      setEpisodes(data);

      // Reset scroll states when episodes change
      setShowLeftArrow(false); // Left arrow should be hidden initially

      // Only check right arrow on next render after episodes are updated
      setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          setShowRightArrow(container.scrollWidth > container.clientWidth);
        }
      }, 0);
    }
  }, [data]);

  // Set seasons and initial active season
  useEffect(() => {
    if (seasonsData && Array.isArray(seasonsData) && seasonsData.length > 0) {
      setSeasons(seasonsData);
      if (!activeSeason) {
        setActiveSeason(seasonsData[0].title);
      }
    }
  }, [seasonsData, activeSeason]);

  // Ensure snap behavior is properly applied
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && episodes.length > 0) {
      // Force snap behavior
      container.style.scrollSnapType = "x mandatory";
      (container.style as any).WebkitOverflowScrolling = "touch";
      container.style.overscrollBehaviorX = "contain";
    }
  }, [episodes]);

  // Check if arrows should be shown
  useEffect(() => {
    const checkForScrollbar = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowRightArrow(container.scrollWidth > container.clientWidth);
      }
    };

    checkForScrollbar();
    window.addEventListener("resize", checkForScrollbar);

    return () => window.removeEventListener("resize", checkForScrollbar);
  }, [episodes]);

  // Handle scroll event with improved detection of active slide
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtStart = container.scrollLeft === 0;
      const isAtEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10;

      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);

      // Calculate which episode is most visible in the viewport
      if (episodes.length > 0) {
        const cardWidth = container.scrollWidth / episodes.length;
        const centerPosition = container.scrollLeft + container.clientWidth / 2;
        const activeIndex = Math.min(
          Math.floor(centerPosition / cardWidth),
          episodes.length - 1
        );
        setActiveEpisodeIndex(activeIndex);
      }
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current && episodes.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / episodes.length;
      const scrollAmount = Math.max(cardWidth, 320); // Use card width or minimum 320px
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && episodes.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / episodes.length;
      const scrollAmount = Math.max(cardWidth, 320); // Use card width or minimum 320px
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll to a specific episode
  const scrollToEpisode = (index: number) => {
    if (scrollContainerRef.current && episodes.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / episodes.length;
      const targetScrollPosition = cardWidth * index;

      container.scrollTo({
        left: targetScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="episodes"
      className={
        hideBackground
          ? "w-full py-2"
          : "w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-200/90 to-gray-50 relative"
      }
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          {!hideHeading && (
            <div className="space-y-4 max-w-3xl">
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
                All Episodes
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Browse Our Episodes
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Discover our curated library of conversations with industry
                  leaders, innovators, and experts who are shaping the future of
                  business.
                </p>
              </div>
            </div>
          )}

          {seasons.length > 0 && (
            <div className="flex justify-center w-full mb-8 px-4">
              <div className="flex flex-wrap justify-center gap-2 p-1 max-w-4xl">
                {seasons.map((season, index) => (
                  <button
                    key={season._id}
                    type="button"
                    onClick={() => setActiveSeason(season.title)}
                    className={`
                      relative px-3 py-2.5 text-sm font-medium whitespace-nowrap rounded-xl transition-all duration-200 ease-in-out flex-shrink-0 shadow-lg border backdrop-blur-sm
                      ${
                        season.title === activeSeason
                          ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105 border-primary/30"
                          : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 border-gray-400/70"
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                    `}
                  >
                    {season.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="w-full text-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                <p className="text-gray-500 font-medium">Loading episodes...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full text-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
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
                    className="text-red-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" x2="9" y1="9" y2="15" />
                    <line x1="9" x2="15" y1="9" y2="15" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  Error loading episodes.
                </p>
              </div>
            </div>
          ) : episodes.length > 0 ? (
            <div className="w-full relative">
              {/* Left arrow */}
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-3 shadow-xl border border-gray-300/80 hidden md:flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-2xl group"
                  aria-label="Scroll left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 group-hover:text-primary transition-colors duration-200"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Episodes container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x-enhanced scrollbar-hide px-4 md:px-16"
                onScroll={handleScroll}
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                }}
              >
                {episodes.map((episode, idx) => (
                  <Link
                    key={`episode-${idx}`}
                    href={`/episode/${episode.youtube?.uuid}`}
                    className="group flex-shrink-0 w-[85vw] sm:w-[360px] md:w-[320px] snap-start-enhanced block cursor-pointer"
                    style={{
                      scrollSnapAlign: "start",
                      scrollSnapStop: "always",
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-400/70 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-1 group-hover:border-primary/40 ring-1 ring-gray-300/60">
                      <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 relative overflow-hidden">
                        <Image
                          src={
                            episode.youtube?.thumbnail ||
                            `/placeholder.svg?height=200&width=360&text=Episode ${episode.youtube?.episodeNumber}`
                          }
                          width={360}
                          height={200}
                          alt={`${episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`} cover`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
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
                              className="text-primary"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg leading-tight text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {episode.youtube?.title ||
                              `Episode ${episode.youtube?.episodeNumber}`}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                            {episode.youtube?.blurb ||
                              "Dive into insights and strategies that will transform your approach to business leadership and growth."}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-700 mt-4 pt-4 border-t border-gray-300">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span className="font-medium">
                              {episode.youtube?.publishedAt
                                ? formatDate(episode.youtube.publishedAt)
                                : ""}
                            </span>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-medium">
                              {formatDurationCompact(
                                episode.youtube?.duration || episode.duration,
                                "30m"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-2">
                          <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors duration-200">
                            Listen Now
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
                              className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Right arrow */}
              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 rounded-full p-3 shadow-xl border border-gray-300/80 hidden md:flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-2xl group"
                  aria-label="Scroll right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 group-hover:text-primary transition-colors duration-200"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Mobile scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-6 md:hidden">
                {episodes.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => scrollToEpisode(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeEpisodeIndex
                        ? "bg-primary w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to episode ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full text-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
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
                    className="text-gray-400"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                    <line x1="8" x2="16" y1="22" y2="22" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 font-medium">No episodes found</p>
                  <p className="text-gray-400 text-sm">
                    Try selecting a different season
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/episodes"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            >
              Explore All Episodes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
