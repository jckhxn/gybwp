"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Play, ChevronRight } from "lucide-react";
import {
  StoryImage,
  StoryAuthor,
  StoryOverlay,
} from "@/src/components/ui/kibo-ui/stories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { client } from "@/src/lib/sanity-utils";
import {
  ALL_SEASONS_QUERY,
  EPISODES_BY_SEASON_QUERY,
  FEATURED_SEASON_QUERY,
} from "@/src/lib/queries";
import {
  formatDate,
  formatDuration,
  formatDurationCompact,
} from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { getComponentId } from "@/src/lib/sectionId";
import {
  Season,
  getSeasonIdentifier,
  getSeasonForUrl,
  getSeasonDisplayName,
} from "@/src/lib/utils";

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
  section: {
    _type: "browseEpisodes";
    _key?: string;
    sectionId?: string;
    title?: string;
    subtitle?: string;
    showFeatured?: boolean;
    episodesPerPage?: number;
    showFilters?: boolean;
  };
}

export function BrowseEpisodes({ section }: BrowseEpisodesProps) {
  const componentId = getComponentId(section, "browse-episodes");

  const {
    title = "Browse Episodes",
    subtitle,
    showFeatured = true,
    episodesPerPage = 12,
    showFilters = true,
  } = section;

  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [featuredSeason, setFeaturedSeason] = useState<Season | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [visibleEpisodes, setVisibleEpisodes] = useState<Set<string>>(
    new Set()
  );
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set()); // Track which videos are muted (all start muted)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const episodeRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Toggle mute state for a video
  const toggleMute = useCallback((episodeId: string) => {
    setMutedVideos((prev) => {
      const newMuted = new Set(prev);
      if (newMuted.has(episodeId)) {
        newMuted.delete(episodeId);
      } else {
        newMuted.add(episodeId);
      }
      return newMuted;
    });
  }, []);

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
  const getYouTubeEmbedUrl = (
    videoId: string,
    muted: boolean = true
  ): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoId}`;
  };

  // Custom YouTube Story component for autoplay on hover
  const StoryYouTube = ({
    episode,
    isHovered,
    isVisible,
    isLoaded,
    episodeId,
  }: {
    episode: Episode;
    isHovered: boolean;
    isVisible: boolean;
    isLoaded: boolean;
    episodeId: string;
  }) => {
    const isMuted = !mutedVideos.has(episodeId); // Videos start muted, set contains unmuted ones
    return (
      <>
        {/* Static thumbnail image */}
        <StoryImage
          src={
            episode.youtube?.thumbnail ||
            `/placeholder.svg?height=200&width=360&text=Episode ${episode.youtube?.episodeNumber}`
          }
          alt={`${episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`} cover`}
          className={`transition-opacity duration-500 ${
            isHovered && episode.youtube?.id ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* YouTube video iframe - only render when hovered */}
        {isHovered && episode.youtube?.id && (
          <>
            <iframe
              key={`video-${episodeId}-${isMuted ? "muted" : "unmuted"}`}
              src={getYouTubeEmbedUrl(episode.youtube.id, isMuted)}
              className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-100 z-10 pointer-events-none"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${episode.youtube.title} - Video Preview`}
              aria-label={`Auto-playing video preview for ${episode.youtube.title}`}
            />

            {/* Unmute/Mute button - top right corner */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMute(episodeId);
              }}
              className="absolute top-3 right-3 z-30 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
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
                  <path d="M11 5 6 9H2v6h4l5 4z" />
                  <line x1="22" x2="16" y1="9" y2="15" />
                  <line x1="16" x2="22" y1="9" y2="15" />
                </svg>
              ) : (
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
                  <path d="M11 5 6 9H2v6h4l5 4z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </>
        )}

        {/* Play button overlay - only show when not playing video */}
        {!(isHovered && episode.youtube?.id) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play
                className="w-6 h-6 text-gray-800 ml-0.5"
                fill="currentColor"
              />
            </div>
          </div>
        )}

        {/* Episode number badge */}
        {episode.youtube?.episodeNumber && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
              EP {episode.youtube.episodeNumber}
            </div>
          </div>
        )}

        {/* Gradient overlay for text readability */}
        <StoryOverlay
          side="bottom"
          className="from-black/70 to-transparent h-24"
        />

        {/* Episode info */}
        <StoryAuthor className="p-4 z-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 space-y-3">
            <h3 className="font-semibold text-sm leading-tight text-white line-clamp-2">
              {episode.youtube?.title ||
                `Episode ${episode.youtube?.episodeNumber}`}
            </h3>

            <div className="flex items-center gap-2 text-xs text-white/90">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                <span>
                  {episode.youtube?.publishedAt
                    ? formatDate(episode.youtube.publishedAt)
                    : ""}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/60"></div>
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

            {/* View Details Link */}
            <Link
              href={getEpisodeUrl(episode)}
              className="inline-flex items-center gap-1 text-xs font-medium text-white/90 hover:text-white transition-colors group"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </StoryAuthor>
      </>
    );
  };

  // Define Season interface to match the utils Season type
  interface LocalSeason {
    title: string;
    number: number;
    _id: string;
  }

  const [seasonsData, setSeasonsData] = useState<Season[]>([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Intersection Observer setup for performance
  useEffect(() => {
    if (typeof window !== "undefined") {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          setVisibleEpisodes((prev) => {
            const newVisibleEpisodes = new Set(prev);

            entries.forEach((entry) => {
              const episodeId = entry.target.getAttribute("data-episode-id");
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
                  setLoadedVideos((prevLoaded) => {
                    const newLoaded = new Set<string>();
                    prevLoaded.forEach((id) => {
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
          rootMargin: "50px",
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
  const setEpisodeRef = useCallback(
    (episodeId: string, element: HTMLElement | null) => {
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
    },
    []
  );

  // Hover handlers - immediate on enter, delayed on leave
  const handleMouseEnter = useCallback(
    (episodeId: string, youtubeId?: string) => {
      // Clear any pending leave timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      // Set hover state immediately
      if (youtubeId) {
        setHoveredEpisode(episodeId);
        setLoadedVideos((prev) => {
          const newLoaded = new Set(prev);
          newLoaded.add(episodeId);
          return newLoaded;
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Delay clearing hover state to prevent flicker
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredEpisode(null);
      hoverTimeoutRef.current = null;
    }, 150);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Load seasons on component mount
  useEffect(() => {
    setIsLoading(true);

    // Fetch both all seasons and featured season
    Promise.all([
      client.fetch(ALL_SEASONS_QUERY),
      client.fetch(FEATURED_SEASON_QUERY),
    ])
      .then(([seasonsData, featuredSeasonData]) => {
        setSeasonsData(seasonsData);
        setSeasons(seasonsData);
        setFeaturedSeason(featuredSeasonData);

        // Auto-select featured season if available, otherwise first season
        if (!activeSeason) {
          if (featuredSeasonData) {
            setActiveSeason(featuredSeasonData.title);
          } else if (seasonsData && seasonsData.length > 0) {
            setActiveSeason(seasonsData[0].title);
          }
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [activeSeason]);

  // Load episodes when active season changes
  useEffect(() => {
    if (activeSeason && seasons.length > 0) {
      setIsLoading(true);
      // Use the activeSeason directly as it's now the title
      const queryIdentifier = activeSeason;

      client
        .fetch(EPISODES_BY_SEASON_QUERY, { name: queryIdentifier })
        .then((res) => {
          setData(res);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setData(null);
          setIsLoading(false);
        });
    }
  }, [activeSeason, seasons]);

  // Set episodes when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEpisodes(data);
    }
  }, [data]);

  return (
    <section id={componentId} className="mt-14">
      <div className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50/70 to-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center gap-4 md:gap-8 text-center">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
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
                Episodes
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-base sm:text-lg text-muted-foreground">
                  {subtitle}
                </p>
              )}
              {!subtitle && (
                <p className="text-base sm:text-lg text-muted-foreground">
                  Discover our curated library of conversations with industry
                  leaders, innovators, and experts who are shaping the future of
                  business.
                </p>
              )}
            </div>

            {seasons.length > 0 && (
              <div className="flex flex-col items-center gap-4 w-full mb-8 px-4">
                {/* Featured Season Button - Centered above */}
                {featuredSeason && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveSeason(featuredSeason.title)}
                      className={`
                      relative px-6 py-3 text-sm font-semibold whitespace-nowrap rounded-xl 
                      transition-all duration-200 group overflow-hidden
                      ${
                        featuredSeason.title === activeSeason
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                          : "bg-gradient-to-r from-amber-400/90 to-orange-400/90 text-white hover:from-amber-500 hover:to-orange-500 hover:shadow-lg hover:shadow-amber-500/20"
                      }
                    `}
                    >
                      {/* Star icon */}
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                        <svg
                          className="relative w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-medium opacity-90">
                          Featured
                        </span>
                        <span className="w-px h-4 bg-white/30"></span>
                        {getSeasonDisplayName(featuredSeason)}
                      </span>
                    </button>
                  </div>
                )}

                {/* Other Season Buttons */}
                <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
                  {seasons
                    .filter(
                      (season) =>
                        !featuredSeason || season._id !== featuredSeason._id
                    )
                    .map((season) => {
                      const isActive = season.title === activeSeason;

                      return (
                        <button
                          key={season._id}
                          type="button"
                          onClick={() => setActiveSeason(season.title)}
                          className={`
                        relative px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-lg 
                        transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        }
                      `}
                        >
                          <span className="flex items-center gap-2">
                            {getSeasonDisplayName(season)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="w-full text-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                  <p className="text-gray-500 font-medium">
                    Loading episodes...
                  </p>
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
                <Carousel
                  className="w-full max-w-none"
                  opts={{
                    align: "start",
                    loop: false,
                    dragFree: true,
                    containScroll: "trimSnaps",
                    slidesToScroll: 1,
                  }}
                >
                  <CarouselContent className="-ml-4 gap-4 px-4">
                    {episodes.map((episode, idx) => (
                      <CarouselItem
                        key={`episode-${idx}`}
                        className="min-w-0 shrink-0 grow-0 basis-auto pl-4"
                      >
                        <div
                          className="group relative overflow-hidden rounded-xl bg-gray-100/40 dark:bg-gray-800/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg w-[280px] md:w-[320px] aspect-[4/5] min-h-[350px]"
                          data-episode-id={episode._id}
                          ref={(el) => setEpisodeRef(episode._id, el)}
                          onMouseEnter={() =>
                            handleMouseEnter(episode._id, episode.youtube?.id)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          <StoryYouTube
                            episode={episode}
                            episodeId={episode._id}
                            isHovered={hoveredEpisode === episode._id}
                            isVisible={visibleEpisodes.has(episode._id)}
                            isLoaded={loadedVideos.has(episode._id)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 flex items-center justify-center" />
                  <CarouselNext className="-right-12 top-1/2 -translate-y-1/2 flex items-center justify-center" />
                </Carousel>
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
                    <p className="text-gray-500 font-medium">
                      No episodes found
                    </p>
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
      </div>
    </section>
  );
}
