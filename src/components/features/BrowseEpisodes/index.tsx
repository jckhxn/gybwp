"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [visibleEpisodes, setVisibleEpisodes] = useState<Set<string>>(new Set());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Helper function to generate YouTube embed URL
  const getYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoId}`;
  };

  // Intersection Observer setup for performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          setVisibleEpisodes(prev => {
            const newVisibleEpisodes = new Set(prev);
            
            entries.forEach((entry) => {
              const episodeId = entry.target.getAttribute('data-episode-id');
              if (episodeId) {
                if (entry.isIntersecting) {
                  newVisibleEpisodes.add(episodeId);
                } else {
                  newVisibleEpisodes.delete(episodeId);
                  // Clean up hover state and loaded videos if episode is no longer visible
                  if (hoveredEpisode === episodeId) {
                    setHoveredEpisode(null);
                  }
                  // Clean up loaded videos for better memory management
                  setLoadedVideos(prevLoaded => {
                    const newLoaded = new Set<string>();
                    prevLoaded.forEach(id => {
                      if (id !== episodeId) {
                        newLoaded.add(id);
                      }
                    });
                    return newLoaded;
                  });
                }
              }
            });
            
            return newVisibleEpisodes;
          });
        },
        {
          root: null,
          rootMargin: '50px',
          threshold: 0.1,
        }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleEpisodes, hoveredEpisode]);

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

  // Debounced hover handlers - now with visibility check
  const handleMouseEnter = useCallback((episodeId: string, youtubeId?: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      if (youtubeId && visibleEpisodes.has(episodeId)) {
        setHoveredEpisode(episodeId);
        setLoadedVideos(prev => {
          const newLoaded = new Set(prev);
          newLoaded.add(episodeId);
          return newLoaded;
        });
      }
    }, 300); // Debounce hover by 300ms
  }, [visibleEpisodes]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredEpisode(null);
    }, 200); // Small delay before hiding video
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
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
      className={
        hideBackground
          ? "w-full py-2"
          : "w-full py-12 md:py-16 lg:py-20 bg-gray-50 relative"
      }
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-4 md:gap-8 text-center">
          {!hideHeading && (
            <div className="space-y-3 max-w-3xl">
              <div className="authority-badge inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold shadow-professional">
                <div className="relative">
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
                    className="w-4 h-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
                <span className="tracking-wide">Browse Episodes</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-main">
                Browse Our Episodes
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Discover our curated library of conversations with industry
                leaders, innovators, and experts who are shaping the future of
                business.
              </p>
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
                      relative px-4 py-3 text-sm font-semibold whitespace-nowrap rounded-xl transition-all duration-300 ease-out flex-shrink-0 border backdrop-blur-sm
                      ${
                        season.title === activeSeason
                          ? "bg-primary text-white shadow-executive hover:shadow-premium hover:-translate-y-1 border-primary/30 scale-105"
                          : "glass-card text-gray-700 hover:text-main hover:bg-white/90 border-white/30 hover:shadow-professional-lg hover:-translate-y-0.5"
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 glass-card hover:bg-white/90 rounded-full p-4 shadow-professional hover:shadow-executive hidden md:flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
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
                    className="text-gray-700 group-hover:text-primary transition-colors duration-300 group-hover:scale-110"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Episodes container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-6 gap-4 snap-x-enhanced scrollbar-hide px-2 sm:px-4 md:px-16"
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
                    href={getEpisodeUrl(episode)}
                    className="group flex-shrink-0 w-[90vw] max-w-xs sm:w-[360px] md:w-[320px] snap-start-enhanced block cursor-pointer"
                    style={{
                      scrollSnapAlign: "start",
                      scrollSnapStop: "always",
                    }}
                    data-episode-id={episode._id}
                    ref={(el) => setEpisodeRef(episode._id, el)}
                    onMouseEnter={() => handleMouseEnter(episode._id, episode.youtube?.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-lg group-hover:border-gray-200 transition-all duration-300 group-hover:-translate-y-1">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        {/* Static thumbnail image */}
                        <Image
                          src={
                            episode.youtube?.thumbnail ||
                            `/placeholder.svg?height=200&width=360&text=Episode ${episode.youtube?.episodeNumber}`
                          }
                          width={360}
                          height={200}
                          alt={`${episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`} cover`}
                          className={`h-full w-full object-cover transition-all duration-500 ${
                            hoveredEpisode === episode._id && episode.youtube?.id ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                        
                        {/* YouTube video iframe - only render when hovered and has video ID */}
                        {hoveredEpisode === episode._id && episode.youtube?.id && loadedVideos.has(episode._id) && visibleEpisodes.has(episode._id) && (
                          <iframe
                            src={getYouTubeEmbedUrl(episode.youtube.id)}
                            className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            title={`${episode.youtube.title} - Video Preview`}
                            aria-label={`Auto-playing video preview for ${episode.youtube.title}`}
                          />
                        )}
                        
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        
                        {/* Play button overlay - only show when not playing video */}
                        {!(hoveredEpisode === episode._id && episode.youtube?.id) && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <Play className="w-6 h-6 text-gray-800 ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        )}
                        
                        {/* Episode number badge */}
                        {episode.youtube?.episodeNumber && (
                          <div className="absolute top-3 left-3">
                            <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                              EP {episode.youtube.episodeNumber}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg leading-tight text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {episode.youtube?.title ||
                              `Episode ${episode.youtube?.episodeNumber}`}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {episode.youtube?.blurb ||
                              "Dive into insights and strategies that will transform your approach to business leadership and growth."}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-4">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            <span>
                              {episode.youtube?.publishedAt
                                ? formatDate(episode.youtube.publishedAt)
                                : ""}
                            </span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDurationCompact(
                                episode.youtube?.duration || episode.duration,
                                "30m"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary-600 transition-all duration-200">
                            <span>Watch Episode</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 glass-card hover:bg-white/90 rounded-full p-4 shadow-professional hover:shadow-executive hidden md:flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
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
                    className="text-gray-700 group-hover:text-primary transition-colors duration-300 group-hover:scale-110"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Mobile scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {episodes.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => scrollToEpisode(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === activeEpisodeIndex
                        ? "bg-primary w-7"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to episode ${idx + 1}`}
                    style={{ minWidth: 12, minHeight: 12 }}
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

          <div className="mt-12">
            <Link
              href="/episodes"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary via-primary-light to-primary px-10 py-4 text-lg font-bold text-white shadow-executive transition-all duration-300 hover:shadow-premium hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 min-w-[240px] justify-center"
            >
              <span className="tracking-wide">Explore All Episodes</span>
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
                className="transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110"
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
