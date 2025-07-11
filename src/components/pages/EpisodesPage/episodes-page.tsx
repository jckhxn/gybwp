"use client";

import { useState, useEffect, useMemo } from "react";
import { client } from "@/src/lib/sanity-utils";
import {
  EPISODES_BY_SEASON_QUERY,
  ALL_SEASONS_QUERY,
  ALL_EPISODES,
} from "@/src/lib/queries";
import SeasonDropdown from "@/src/components/features/SeasonDropdown";
import EpisodeCard from "@/src/components/features/EpisodeCard";
import { PaginationControls } from "@/src/components/features/PaginationControls";
import { usePagination } from "@/src/lib/usePagination";
import {
  Search,
  Filter,
  Grid,
  List,
  Play,
  Calendar,
  Users,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

// Utility function for safe data access
const safeguardEpisodeData = (episode: any) => {
  return {
    ...episode,
    guests: episode.guests?.filter((guest: any) => guest && guest.name) || [],
    youtube: {
      ...episode.youtube,
      title: episode.youtube?.title || "Untitled Episode",
      blurb: episode.youtube?.blurb || "No description available",
      uuid: episode.youtube?.uuid || episode._id || "unknown",
    },
  };
};

export function EpisodesPage() {
  // Define the Episode type based on what EpisodeCard expects
  type YoutubeData = {
    title?: string;
    blurb?: string;
    description?: string;
    uuid?: string;
    seasonNumber?: number;
    episodeNumber: number;
    thumbnail?: string;
    publishedAt?: string;
  };

  type Episode = {
    _id?: string;
    youtube?: YoutubeData;
    seasonNumber?: number;
    episodeNumber?: number;
    guests?: Array<{ name?: string }>; // Made name optional to match real data
  };

  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [allSeasons, setAllSeasons] = useState<any[]>([]);
  const [data, setData] = useState<Episode[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "episode">(
    "newest"
  );
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get page from query string
  const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);

  // Load all seasons and episodes on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [seasonsData, episodesData] = await Promise.all([
          client.fetch(ALL_SEASONS_QUERY),
          client.fetch(ALL_EPISODES),
        ]);

        setAllSeasons(seasonsData);
        setAllEpisodes(episodesData);

        // Set first season as active by default
        if (seasonsData && seasonsData.length > 0) {
          setActiveSeason(seasonsData[0].title);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Load episodes for active season
  useEffect(() => {
    if (activeSeason) {
      client
        .fetch(EPISODES_BY_SEASON_QUERY, { name: activeSeason })
        .then((res) => {
          // Safeguard the data before setting it
          const safeguardedData = res.map(safeguardEpisodeData);
          setData(safeguardedData);
        })
        .catch((err) => setError(err));
    }
  }, [activeSeason]);

  // Filter and sort episodes
  const filteredAndSortedEpisodes = useMemo(() => {
    let episodes = [...data];

    // Filter by search term with robust error handling
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      episodes = episodes.filter((episode) => {
        try {
          const titleMatch = episode.youtube?.title
            ?.toLowerCase()
            .includes(searchTermLower);
          const blurbMatch = episode.youtube?.blurb
            ?.toLowerCase()
            .includes(searchTermLower);
          const guestMatch = episode.guests?.some((guest) => {
            return guest?.name?.toLowerCase()?.includes(searchTermLower);
          });

          return titleMatch || blurbMatch || guestMatch;
        } catch (error) {
          console.warn("Error filtering episode:", episode, error);
          return false; // Skip episodes that cause errors
        }
      });
    }

    // Sort episodes
    episodes.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.youtube?.publishedAt || 0).getTime() -
            new Date(a.youtube?.publishedAt || 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.youtube?.publishedAt || 0).getTime() -
            new Date(b.youtube?.publishedAt || 0).getTime()
          );
        case "episode":
          return (
            (b.youtube?.episodeNumber || 0) - (a.youtube?.episodeNumber || 0)
          );
        default:
          return 0;
      }
    });

    return episodes;
  }, [data, searchTerm, sortBy]);

  // Use pagination hook
  const pagination = usePagination({
    data: filteredAndSortedEpisodes,
    itemsPerPage: viewMode === "grid" ? 12 : 8, // Fewer items for list view
    initialPage: pageFromQuery,
    scrollToTop: false,
  });

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    router.push(`?${params.toString()}`);
    pagination.goToPage(page);
  };

  // Reset pagination when filters change
  useEffect(() => {
    pagination.reset();
    // Remove ?page= from URL when filters change
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("page");
    router.replace(`?${params.toString()}`);
    // Only depend on things that should trigger a reset
  }, [searchTerm, sortBy, activeSeason, viewMode]);

  const totalEpisodes = allEpisodes.length;
  const currentSeasonEpisodes = data.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/70 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50/70 to-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
                <Play className="h-4 w-4" />
                Episode Library
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]"
            >
              Browse Our Episodes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Explore our complete library of business insights, leadership
              strategies, and growth tactics
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{totalEpisodes} Total Episodes</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>{allSeasons.length} Seasons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Expert Guests</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Left side - Season and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              <SeasonDropdown setActiveSeason={setActiveSeason} />

              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search episodes, topics, or guests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Right side - View controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-slate-200"
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="episode">Episode Number</option>
                    </select>
                  </div>

                  <div className="text-sm text-slate-600">
                    {pagination.totalItems} of {currentSeasonEpisodes} episodes
                    {searchTerm && ` matching "${searchTerm}"`}
                    {pagination.totalPages > 1 && (
                      <span className="ml-2">
                        (Page {pagination.currentPage} of{" "}
                        {pagination.totalPages})
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Episodes Grid/List */}
      <main className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading episodes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">
              Error loading episodes. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : pagination.totalItems > 0 ? (
          <>
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }
            >
              <AnimatePresence mode="popLayout">
                {pagination.currentItems.map((episode, idx) => {
                  // Final safeguard before rendering
                  const safeEpisode = safeguardEpisodeData(episode);
                  return (
                    <motion.div
                      key={safeEpisode._id || safeEpisode.youtube?.uuid || idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={viewMode === "list" ? "max-w-4xl mx-auto" : ""}
                    >
                      <EpisodeCard {...safeEpisode} viewMode={viewMode} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                totalItems={pagination.totalItems}
                startIndex={pagination.startIndex}
                endIndex={pagination.endIndex}
                className="border-t border-gray-200 pt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No episodes found
              </h3>
              <p className="text-slate-600">
                {searchTerm
                  ? `No episodes match "${searchTerm}". Try a different search term.`
                  : "No episodes found for this season."}
              </p>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
