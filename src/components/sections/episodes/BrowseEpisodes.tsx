"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { client } from "@/src/lib/sanity-utils";
import {
  ALL_SEASONS_QUERY,
  EPISODES_BY_SEASON_QUERY,
  FEATURED_SEASON_QUERY,
} from "@/src/lib/queries";
import { formatDate, formatDurationCompact } from "@/src/lib/utils";
import { getComponentId } from "@/src/lib/sectionId";
import {
  Season,
  getSeasonDisplayName,
} from "@/src/lib/utils";

interface Episode {
  _id: string;
  duration?: string;
  pathname?: { current?: string };
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
  const { title = "Browse Episodes", subtitle } = section;

  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [featuredSeason, setFeaturedSeason] = useState<Season | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const getEpisodeUrl = (episode: Episode): string => {
    if (episode.pathname?.current) return episode.pathname.current;
    if (episode.youtube?.uuid) return `/episodes/${episode.youtube.uuid}`;
    return "/episodes";
  };

  // Load seasons on mount
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      client.fetch(ALL_SEASONS_QUERY),
      client.fetch(FEATURED_SEASON_QUERY),
    ])
      .then(([seasonsData, featuredSeasonData]) => {
        setSeasons(seasonsData);
        setFeaturedSeason(featuredSeasonData);
        if (!activeSeason) {
          setActiveSeason(
            featuredSeasonData?.title ?? seasonsData?.[0]?.title ?? null
          );
        }
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [activeSeason]);

  // Load episodes when season changes
  useEffect(() => {
    if (!activeSeason || seasons.length === 0) return;
    setIsLoading(true);
    client
      .fetch(EPISODES_BY_SEASON_QUERY, { name: activeSeason })
      .then((res) => {
        setEpisodes(Array.isArray(res) ? res : []);
        setError(null);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [activeSeason, seasons]);

  return (
    <section id={componentId} className="mt-14 w-full py-12 md:py-16 lg:py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-6 md:gap-10 text-center">

          {/* Heading */}
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Episode Library
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {subtitle || "Conversations with industry leaders, innovators, and experts shaping the future of business."}
            </p>
          </div>

          {/* Season pills */}
          {seasons.length > 0 && (
            <div className="flex flex-col items-center gap-3 w-full px-4">
              {featuredSeason && (
                <button
                  type="button"
                  onClick={() => setActiveSeason(featuredSeason.title)}
                  className={`relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
                    ${featuredSeason.title === activeSeason
                      ? "bg-amber-500 text-white shadow-md scale-105"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-500 hover:text-white"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs opacity-80">Featured</span>
                    <span className="w-px h-3.5 bg-current opacity-30" />
                    {getSeasonDisplayName(featuredSeason)}
                  </span>
                </button>
              )}
              <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-2xl p-2 shadow-sm">
                {seasons
                  .filter((s) => !featuredSeason || s._id !== featuredSeason._id)
                  .map((season) => (
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
                      {getSeasonDisplayName(season)}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Episode carousel */}
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
              <Carousel
                className="w-full max-w-none"
                opts={{ align: "start", loop: false, dragFree: true, containScroll: "trimSnaps" }}
              >
                <CarouselContent className="-ml-4 px-4">
                  {episodes.map((episode, idx) => (
                    <CarouselItem key={`ep-${idx}`} className="min-w-0 shrink-0 grow-0 basis-auto pl-4">
                      <Link
                        href={getEpisodeUrl(episode)}
                        className="group block w-[260px] md:w-[280px]"
                      >
                        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-amber-200 flex flex-col">

                          {/* Square thumbnail */}
                          <div className="aspect-square bg-stone-100 relative overflow-hidden">
                            <ThumbnailImage
                              src={episode.youtube?.thumbnail || "/images/logo.webp"}
                              fill
                              alt={episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`}
                              className="object-contain p-2"
                              sizes="280px"
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
                          <div className="p-4 flex flex-col gap-2">
                            <h3 className="font-semibold text-sm leading-snug text-stone-900 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2">
                              {episode.youtube?.title || `Episode ${episode.youtube?.episodeNumber}`}
                            </h3>
                            <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white border-stone-200 hover:bg-amber-50 hover:border-amber-300 text-stone-500 hover:text-amber-600 -left-5 shadow-md" />
                <CarouselNext className="bg-white border-stone-200 hover:bg-amber-50 hover:border-amber-300 text-stone-500 hover:text-amber-600 -right-5 shadow-md" />
              </Carousel>
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
}
