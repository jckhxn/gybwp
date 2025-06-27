"use client";
import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Button from "../Button";
import { urlForImage } from "../../lib/sanity-image";
import EpisodeCard from "../EpisodeCard";
import SeasonDropdown from "@/src/app/(website)/components/SeasonDropdown";

// Icons
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Calendar,
  Users,
  Star,
  Search,
  Filter,
  Grid,
  List,
  Play,
  LayoutGrid,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Home,
} from "lucide-react";

import routes from "@/src/app/(website)/routes";

// SWR
import { client } from "../../sanity/sanity-utils";
import { SPONSOR_DETAILS_QUERY, ALL_SEASONS_QUERY } from "../../lib/queries";

// Types
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
  uuid?: string;
  image?: string;
  youtube?: YoutubeData;
  seasonNumber?: number;
  episodeNumber?: number;
  guests?: Array<{ name?: string }>;
  season?: {
    title?: string;
    seasonNumber?: number;
  };
};

type Sponsor = {
  _id: string;
  name: string;
  uuid: string;
  slug?: string;
  logo?: any;
  image?: string;
  description?: string;
  website?: string;
  tier?: string;
  bgColor?: string;
  isActive?: boolean;
  social?: Array<{ _key: string; link: string; name: string }>;
};

type SponsorWithEpisodes = {
  sponsors: Sponsor[];
  episodes: Episode[];
};

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

const SponsorsDetailPageComponent = () => {
  const [data, setData] = useState<SponsorWithEpisodes | null>(null);
  const [allSeasons, setAllSeasons] = useState<any[]>([]);
  const [sponsoredSeasons, setSponsoredSeasons] = useState<any[]>([]);
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "episode">(
    "newest"
  );
  const [showFilters, setShowFilters] = useState(false);

  const pathname = usePathname();
  const slug = pathname.split("/sponsors/")[1];

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [sponsorResult, seasonsData] = await Promise.all([
          client.fetch(SPONSOR_DETAILS_QUERY, { slug }),
          client.fetch(ALL_SEASONS_QUERY),
        ]);

        setData(sponsorResult);
        setAllSeasons(seasonsData);

        // Get unique seasons from sponsored episodes only
        const uniqueSponsoredSeasons =
          sponsorResult?.episodes?.reduce((seasons: any[], episode: any) => {
            const season = episode.season;
            if (season && !seasons.find((s) => s.title === season.title)) {
              seasons.push(season);
            }
            return seasons;
          }, []) || [];

        // Sort sponsored seasons by season number
        uniqueSponsoredSeasons.sort((a: any, b: any) => {
          const aNum = a.seasonNumber || 0;
          const bNum = b.seasonNumber || 0;
          return bNum - aNum; // Newest first
        });

        setSponsoredSeasons(uniqueSponsoredSeasons);

        // Set first sponsored season as active by default
        if (uniqueSponsoredSeasons.length > 0) {
          setActiveSeason(uniqueSponsoredSeasons[0].title);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  // Filter episodes by active season and search term, then sort
  const filteredAndSortedEpisodes = useMemo(() => {
    if (!data?.episodes) return [];

    let episodes = [...data.episodes];

    // Filter by active season if one is selected
    if (activeSeason) {
      episodes = episodes.filter((episode) => {
        // Check if episode belongs to the active season
        const episodeSeasonTitle = episode.season?.title;
        return episodeSeasonTitle === activeSeason;
      });
    }

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
          return false;
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
  }, [data?.episodes, activeSeason, searchTerm, sortBy]);

  const sponsor = data?.sponsors?.[0];
  const episodes = data?.episodes || [];
  const totalEpisodes = episodes.length;
  const currentSeasonEpisodes = filteredAndSortedEpisodes.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sponsor details...</p>
        </div>
      </div>
    );
  }

  if (error || !sponsor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sponsor Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The sponsor you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link href={routes.internal.sponsors}>
            <Button color="primary" className="px-6 py-3">
              Back to Sponsors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/70 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50/70 to-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link href={routes.internal.sponsors}>
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-sm transition-all px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Back to Sponsors
              </button>
            </Link>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            {/* Sponsor Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div
                className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl"
                style={{ backgroundColor: sponsor.bgColor || "#f8f9fa" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <Image
                    src={
                      sponsor?.logo
                        ? urlForImage(sponsor.logo)
                            ?.width(300)
                            .height(300)
                            .url()
                        : sponsor?.image || "/placeholder-logo.png"
                    }
                    alt={`${sponsor?.name} logo`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]"
            >
              {sponsor.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
                <Star className="h-4 w-4" />
                {sponsor.tier ? `${sponsor.tier} Sponsor` : "Valued Sponsor"}
              </div>
            </motion.div>

            {sponsor.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
              >
                {sponsor.description}
              </motion.p>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {sponsor.website && (
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Globe className="h-5 w-5" />
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {sponsor.social && sponsor.social.length > 0 && (
                <div className="flex gap-3">
                  {sponsor.social.map((socialItem) => {
                    if (!socialItem.link || !socialItem.name) return null;

                    // Function to get the appropriate icon
                    const getIcon = (name: string) => {
                      const iconName = name.toLowerCase();
                      switch (iconName) {
                        case "facebook":
                          return <Facebook className="h-5 w-5 text-gray-700" />;
                        case "twitter":
                          return <Twitter className="h-5 w-5 text-gray-700" />;
                        case "linkedin":
                          return <Linkedin className="h-5 w-5 text-gray-700" />;
                        case "instagram":
                          return (
                            <Instagram className="h-5 w-5 text-gray-700" />
                          );
                        case "home":
                          return <Home className="h-5 w-5 text-gray-700" />;
                        default:
                          return <Globe className="h-5 w-5 text-gray-700" />;
                      }
                    };

                    return (
                      <a
                        key={socialItem._key}
                        href={socialItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md"
                        aria-label={`Visit ${sponsor.name} on ${socialItem.name}`}
                      >
                        {getIcon(socialItem.name)}
                      </a>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Active Sponsor</span>
              </div>
              {totalEpisodes > 0 && (
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span>{totalEpisodes} Sponsored Episodes</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Business Growth Partner</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controls Section - Only show if there are episodes */}
      {totalEpisodes > 0 && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Left side - Season and Search */}
              <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Play className="h-4 w-4 text-primary" />
                  Sponsored Episodes
                </div>

                {sponsoredSeasons.length > 0 && (
                  <SeasonDropdown
                    seasons={sponsoredSeasons}
                    activeSeason={activeSeason}
                    setActiveSeason={setActiveSeason}
                  />
                )}

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
                      {currentSeasonEpisodes} of {totalEpisodes} episodes
                      {searchTerm && ` matching "${searchTerm}"`}
                      {activeSeason && ` in ${activeSeason}`}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Episodes Section */}
      <main className="container mx-auto px-6 py-12">
        {totalEpisodes > 0 ? (
          <>
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/20 mb-6">
                <Users className="h-4 w-4" />
                Sponsored Content
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Episodes Sponsored by {sponsor.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the valuable content made possible through{" "}
                {sponsor.name}&apos;s support of our podcast.
              </p>
              {sponsoredSeasons.length > 0 && (
                <div className="mt-6 text-sm text-gray-500">
                  Sponsored episodes across {sponsoredSeasons.length} season
                  {sponsoredSeasons.length > 1 ? "s" : ""}:{" "}
                  {sponsoredSeasons.map((season, index) => (
                    <span key={season.title}>
                      {season.title}
                      {index < sponsoredSeasons.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Episodes Grid/List */}
            {filteredAndSortedEpisodes.length > 0 ? (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    : "space-y-6"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedEpisodes.map(
                    (episode: Episode, idx: number) => {
                      // Final safeguard before rendering
                      const safeEpisode = safeguardEpisodeData(episode);
                      return (
                        <motion.div
                          key={
                            safeEpisode._id || safeEpisode.youtube?.uuid || idx
                          }
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className={
                            viewMode === "list" ? "max-w-4xl mx-auto" : ""
                          }
                        >
                          <EpisodeCard {...safeEpisode} viewMode={viewMode} />
                        </motion.div>
                      );
                    }
                  )}
                </AnimatePresence>
              </motion.div>
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
                      : "No episodes found."}
                  </p>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Interested in Sponsoring?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join {sponsor.name} and other forward-thinking companies in
                  supporting quality business content.
                </p>
                <Link href={routes.internal.sponsors}>
                  <Button color="primary" className="px-8 py-3">
                    Learn More About Sponsorship
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty State for No Episodes */
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Episodes Yet
            </h3>
            <p className="text-gray-600 mb-8">
              {sponsor.name} is a valued sponsor, but hasn&apos;t sponsored any
              episodes yet. Check back soon for sponsored content!
            </p>
            <Link href={routes.internal.sponsors}>
              <Button color="primary" className="px-6 py-3">
                View All Sponsors
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SponsorsDetailPageComponent;
