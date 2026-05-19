"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { CalendarDays, Clock, Play } from "lucide-react";
import { client } from "@/src/lib/sanity-utils";
import { ALL_SEASONS_QUERY, EPISODES_BY_SEASON_QUERY } from "@/src/lib/queries";
import {
  formatDate,
  formatDuration,
  formatDurationCompact,
} from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";

// Define interface for episode object based on the schema
interface Episode {
  _id: string;
  duration?: string;
  pathname?: {
    current?: string;
  };
  youtube?: {
    id?: string;
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

interface BrowseEpisodesProps {
  section?: {
    title?: string;
    subtitle?: string;
    showFeatured?: boolean;
    episodesPerPage?: number;
    showFilters?: boolean;
  };
  hideHeading?: boolean;
  hideBackground?: boolean;
}

export const BrowseEpisodes = ({
  section,
  hideHeading = false,
  hideBackground = false,
}: BrowseEpisodesProps = {}) => {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const episodeRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Helper function to get episode URL - prioritize pathname over UUID
  const getEpisodeUrl = (episode: Episode): string => {
    if (episode.pathname?.current) {
      return episode.pathname.current;
    }
    // Fallback to UUID format for episodes without pathname
    if (episode.youtube?.uuid) {
      return `/episodes/${episode.youtube.uuid}`;
    }
    return "/episodes"; // Fallback to episodes listing
  };

  // Intersection Observer setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        () => {},
        { root: null, rootMargin: '50px', threshold: 0.1 }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe episode elements
  const setEpisodeRef = useCallback((episodeId: string, element: HTMLElement | null) => {
    if (element) {
      episodeRefs.current.set(episodeId, element);
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    } else {
      const oldElement = episodeRefs.current.get(episodeId);
      if (oldElement && observerRef.current) {
        observerRef.current.unobserve(oldElement);
      }
      episodeRefs.current.delete(episodeId);
    }
  }, []);


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
      className={hideBackground ? "w-full py-2" : "w-full py-12 md:py-16 lg:py-20 bg-stone-50"}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-6 md:gap-10 text-center">

          {!hideHeading && (
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Episode Library
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
                Browse Our Episodes
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Conversations with industry leaders, innovators, and experts shaping the future of business.
              </p>
            </div>
          )}

          {/* Season pills */}
          {seasons.length > 0 && (
            <div className="flex justify-center w-full px-4">
              <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-2xl p-2 shadow-sm">
                {seasons.map((season) => (
                  <button
                    key={season._id}
                    type="button"
                    onClick={() => setActiveSeason(season.title)}
                    className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
                      ${season.title === activeSeason
                        ? "bg-amber-500 text-white shadow-sm scale-105"
                        : "bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                  >
                    {season.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Episode list */}
          {isLoading ? (
            <div className="w-full flex flex-col items-center gap-3 py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent" />
              <p className="text-stone-400 text-sm font-medium">Loading episodes…</p>
            </div>
          ) : error ? (
            <div className="w-full flex flex-col items-center gap-3 py-16">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" />
                </svg>
              </div>
              <p className="text-stone-500 text-sm font-medium">Could not load episodes.</p>
            </div>
          ) : episodes.length > 0 ? (
            <div className="w-full relative">
              {/* Left arrow */}
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-stone-200 hover:bg-amber-50 hover:border-amber-300 text-stone-500 hover:text-amber-600 rounded-full p-3 shadow-md hidden md:flex items-center justify-center transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
              )}

              {/* Cards */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 gap-5 scrollbar-hide px-2 sm:px-4 md:px-14"
                onScroll={handleScroll}
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
              >
                {episodes.map((episode, idx) => (
                  <Link
                    key={`episode-${idx}`}
                    href={getEpisodeUrl(episode)}
                    className="group flex-shrink-0 w-[85vw] max-w-xs sm:w-[300px] block"
                    style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
                    data-episode-id={episode._id}
                    ref={(el) => setEpisodeRef(episode._id, el)}
                  >
                    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-amber-200 h-full flex flex-col">

                      {/* Square thumbnail */}
                      <div className="aspect-square bg-stone-100 relative overflow-hidden">
                        <ThumbnailImage
                          src={episode.youtube?.thumbnail || "/images/logo.webp"}
                          fill
                          alt={episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`}
                          className="object-contain p-2"
                          sizes="300px"
                        />

                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </div>

                        {/* EP badge */}
                        {episode.youtube?.episodeNumber && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                              EP {episode.youtube.episodeNumber}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <h3 className="font-semibold text-sm leading-snug text-stone-900 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2">
                          {episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`}
                        </h3>
                        <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 flex-1">
                          {episode.youtube?.blurb || ""}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                          {episode.youtube?.publishedAt && (
                            <>
                              <CalendarDays className="w-3 h-3 flex-shrink-0" />
                              <span>{formatDate(episode.youtube.publishedAt)}</span>
                              <span className="w-1 h-1 rounded-full bg-stone-300" />
                            </>
                          )}
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{formatDurationCompact(episode.youtube?.duration || episode.duration, "30m")}</span>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex items-center gap-1 text-amber-600 font-semibold text-xs">
                          <span>Listen now</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6" /></svg>
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-stone-200 hover:bg-amber-50 hover:border-amber-300 text-stone-500 hover:text-amber-600 rounded-full p-3 shadow-md hidden md:flex items-center justify-center transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              )}

              {/* Mobile dots */}
              <div className="flex justify-center gap-1.5 mt-4 md:hidden">
                {episodes.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => scrollToEpisode(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeEpisodeIndex ? "bg-amber-500 w-6" : "bg-stone-300 w-2 hover:bg-stone-400"}`}
                    aria-label={`Go to episode ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3 py-16">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /><line x1="8" x2="16" y1="22" y2="22" />
                </svg>
              </div>
              <p className="text-stone-500 text-sm font-medium">No episodes found</p>
              <p className="text-stone-400 text-xs">Try selecting a different season</p>
            </div>
          )}

          {/* CTA */}
          <Link
            href="/episodes"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>Explore All Episodes</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>

        </div>
      </div>
    </section>
  );
};
