"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { ALL_SEASONS_QUERY, EPISODES_BY_SEASON_QUERY } from "../../lib/queries";
import { formatDate, formatDuration } from "../../lib/utils";
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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
          : "w-full py-6 md:py-10 lg:py-12 bg-white"
      }
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-3 md:gap-6 text-center">
          {!hideHeading && (
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-sm text-secondary">
                All Episodes
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Browse Our Episodes
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-lg">
                Discover our library of conversations with industry leaders and
                experts.
              </p>
            </div>
          )}

          {seasons.length > 0 && (
            <div className="flex justify-center w-full mb-6 overflow-x-auto px-2 py-2">
              <div className="inline-flex rounded-md shadow-sm flex-wrap justify-center">
                {seasons.map((season) => (
                  <button
                    key={season._id}
                    type="button"
                    onClick={() => setActiveSeason(season.title)}
                    className={`
                      px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium whitespace-nowrap
                      ${
                        season.title === activeSeason
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }
                      ${seasons.indexOf(season) === 0 ? "rounded-l-lg" : ""}
                      ${seasons.indexOf(season) === seasons.length - 1 ? "rounded-r-lg" : ""}
                      border border-gray-200
                      focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary
                    `}
                  >
                    {season.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="w-full text-center py-12">Loading episodes...</div>
          ) : error ? (
            <div className="w-full text-center py-12">
              Error loading episodes.
            </div>
          ) : episodes.length > 0 ? (
            <div className="w-full relative">
              {/* Left arrow */}
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hidden md:flex items-center justify-center"
                  aria-label="Scroll left"
                >
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
                    className="text-primary"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Episodes container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-6 gap-6 snap-x scrollbar-hide px-1"
                onScroll={handleScroll}
              >
                {episodes.map((episode, idx) => (
                  <Link
                    key={`episode-${idx}`}
                    href={`/episode/${episode.youtube?.uuid}`}
                    className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[320px] snap-start overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 block cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <Image
                        src={
                          episode.youtube?.thumbnail ||
                          `/placeholder.svg?height=200&width=360&text=Episode ${episode.youtube?.episodeNumber}`
                        }
                        width={360}
                        height={200}
                        alt={`${episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`} cover`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 bg-primary/10 rounded-full">
                          <div className="w-8 h-8 flex items-center justify-center text-primary">
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
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2">
                        Episode {episode.youtube?.episodeNumber}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2">
                        {episode.youtube?.title ||
                          `Episode ${episode.youtube?.episodeNumber}`}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {episode.youtube?.blurb ||
                          "Watch this episode to learn more about business growth strategies."}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {episode.youtube?.publishedAt
                            ? formatDate(episode.youtube.publishedAt)
                            : ""}
                        </span>
                        <span className="mx-1">•</span>
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatDuration(
                            episode.youtube?.duration || episode.duration,
                            "30 min"
                          )}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="inline-flex items-center text-primary font-medium text-sm">
                          View Episode
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
                            className="ml-1"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hidden md:flex items-center justify-center"
                  aria-label="Scroll right"
                >
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
                    className="text-primary"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Mobile scroll indicator dots */}
              <div className="flex justify-center gap-1.5 mt-4 md:hidden">
                {episodes.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => scrollToEpisode(idx)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      idx === activeEpisodeIndex ? "bg-primary" : "bg-gray-300"
                    } transition-colors duration-300`}
                    aria-label={`Go to episode ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full text-center py-12">
              No episodes found for this season.
            </div>
          )}

          <div className="mt-2">
            <Link
              href="/episodes"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white shadow-md transition-colors hover:bg-primary/90"
            >
              View All Episodes
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
                className="ml-2 h-4 w-4"
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
