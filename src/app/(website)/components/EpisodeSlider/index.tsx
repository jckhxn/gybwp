"use client";

import { SVGProps, useEffect, useState, useRef } from "react";
import useSWR, { mutate } from "swr";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { ALL_SEASONS_QUERY, EPISODES_BY_SEASON_QUERY } from "../../lib/queries";
import EpisodeCard from "@/src/app/(website)/components/EpisodeCard";

// Define interfaces for the types we're using
interface Season {
  _id: string;
  title: string;
}

interface Episode {
  _id: string;
  youtube?: {
    title?: string;
    episodeNumber?: number;
    seasonNumber?: number;
    thumbnail?: string;
    uuid?: string;
    publishedAt?: string;
  };
}

export default function EpisodeSlider() {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch all seasons
  const { data: seasonsData } = useSWR(ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // Get latest season episodes by season name
  const { data, error, isLoading } = useSWR(
    activeSeason ? EPISODES_BY_SEASON_QUERY : null,
    (query) => client.fetch(query, { name: activeSeason })
  );

  // Set seasons and initial active season
  useEffect(() => {
    if (seasonsData && Array.isArray(seasonsData) && seasonsData.length > 0) {
      setSeasons(seasonsData);
      if (!activeSeason) {
        setActiveSeason(seasonsData[0].title);
      }
    }
  }, [seasonsData, activeSeason]);

  useEffect(() => {
    mutate(EPISODES_BY_SEASON_QUERY);
    // Reset left arrow when changing seasons
    setShowLeftArrow(false);
  }, [activeSeason]);

  // Check if arrows should be shown
  useEffect(() => {
    const checkForScrollbar = () => {
      const container = scrollContainerRef.current;
      if (container) {
        // Reset scroll position to start when data changes
        container.scrollLeft = 0; // Force scroll to beginning
        setShowRightArrow(container.scrollWidth > container.clientWidth);
        setShowLeftArrow(false); // Ensure left arrow is hidden initially
      }
    };

    // Use setTimeout to ensure the DOM has updated with new episodes
    setTimeout(checkForScrollbar, 0);
    window.addEventListener("resize", checkForScrollbar);

    return () => window.removeEventListener("resize", checkForScrollbar);
  }, [data]);

  // Handle scroll event
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtStart = container.scrollLeft <= 5; // Adding a small threshold
      const isAtEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10;

      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);
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

  return (
    <section className="w-full max-w-6xl mx-auto py-8 md:py-12">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Latest Episodes</h2>

        {seasons.length > 0 && (
          <div className="flex justify-center w-full overflow-x-auto px-2 py-2">
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
                    ${
                      seasons.indexOf(season) === seasons.length - 1
                        ? "rounded-r-lg"
                        : ""
                    }
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
      </div>

      <div className="px-4 md:px-0 relative">
        {!isLoading ? (
          <>
            {data && Array.isArray(data) && data.length > 0 ? (
              <div className="relative">
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

                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto pb-6 gap-6 snap-x scrollbar-hide"
                  onScroll={handleScroll}
                >
                  {data.map((episode, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[320px] snap-start"
                    >
                      {/* <EpisodeCard {...episode} /> */}
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
                <div className="flex justify-center gap-1 mt-2 md:hidden">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
            ) : (
              <div className="w-full text-center py-12">
                No episodes found for this season.
              </div>
            )}
          </>
        ) : (
          <div className="w-full text-center py-12">Loading episodes...</div>
        )}
      </div>
    </section>
  );
}
