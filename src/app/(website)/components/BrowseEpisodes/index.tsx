"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { ALL_SEASONS_QUERY, EPISODES_BY_SEASON_QUERY } from "../../lib/queries";
import { formatDate } from "../../lib/utils";

// Define interface for episode object based on the schema
interface Episode {
  _id: string;
  youtube?: {
    title?: string;
    episodeNumber?: number;
    seasonNumber?: number;
    thumbnail?: string;
    uuid?: string;
    publishedAt?: string;
    blurb?: string;
  };
  details?: {
    keyTakeaways?: string[];
    hashtags?: string[];
  };
}

export const BrowseEpisodes = () => {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch all seasons
  const { data: seasonsData } = useSWR(ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // Get episodes by season
  const { data, error, isLoading } = useSWR(
    activeSeason ? [EPISODES_BY_SEASON_QUERY, activeSeason] : null,
    ([query, season]) => client.fetch(query, { name: season })
  );

  // Set episodes when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Display up to 5 episodes
      setEpisodes(data.slice(0, 5));

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
    <section id="episodes" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-4 md:gap-8 text-center">
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
                  <div
                    key={`episode-${idx}`}
                    className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[320px] snap-start overflow-hidden rounded-xl border bg-background shadow-md transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
                  >
                    <div className="relative aspect-video group overflow-hidden">
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
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="rounded-full bg-primary/90 p-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
                            className="text-white h-6 w-6"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="space-y-1 mb-3">
                        <h3 className="font-bold text-lg line-clamp-1">
                          {episode.youtube?.title ||
                            `Episode ${episode.youtube?.episodeNumber}`}
                        </h3>
                        {/* <p className="text-sm text-gray-500">
                          Season {episode.youtube?.seasonNumber} | Episode{" "}
                          {episode.youtube?.episodeNumber}
                        </p> */}
                        <p className="text-sm text-gray-500">
                          {episode.youtube?.publishedAt
                            ? formatDate(episode.youtube.publishedAt)
                            : ""}
                        </p>
                      </div>
                      <p className="text-gray-600 flex-1 line-clamp-3">
                        {episode.youtube?.blurb ||
                          "Watch this episode to learn more about business growth strategies."}
                      </p>
                      <div className="pt-4 mt-auto">
                        <Link
                          href={`/episode/${episode.youtube?.uuid}`}
                          className="text-primary font-medium hover:underline inline-flex items-center group"
                        >
                          View Details
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
                            className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
                          >
                            <path d="m9 18 6-6-6-6"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
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

          <div className="mt-12">
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
