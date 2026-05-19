import Link from "next/link";
import React from "react";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { Play, ArrowRight, Clock, Calendar, Users, Sparkles } from "lucide-react";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

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

type Props = {
  image?: string;
  uuid?: string;
  pathname?: { current?: string };
  youtube?: YoutubeData;
  seasonNumber?: number;
  episodeNumber?: number;
  viewMode?: "grid" | "list";
  guests?: Array<{ name?: string }>;
  sponsors?: Array<{
    _id: string;
    name: string;
    uuid: string;
    slug?: { current: string };
    logo?: any;
    image?: string;
    description?: string;
    website?: string;
    tier?: string;
    bgColor?: string;
    isActive?: boolean;
  }>;
};

const EpisodeCard = ({
  youtube = {
    title: "No title presented",
    description: "No description provided",
    blurb: "No description provided",
    uuid: "100",
    seasonNumber: 0,
    episodeNumber: 0,
    thumbnail: "/api/placeholder/600/400",
    publishedAt: "",
  },
  uuid,
  pathname,
  viewMode = "grid",
  guests = [],
}: Props) => {
  const getEpisodeUrl = () => {
    if (pathname?.current) {
      return pathname.current;
    }
    if (youtube?.uuid) {
      return `/episodes/${youtube.uuid}`;
    }
    if (uuid) {
      return `/episodes/${uuid}`;
    }
    return "/episodes";
  };

  const episodeUrl = getEpisodeUrl();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Grid view (default)
  if (viewMode === "grid") {
    return (
      <article className="group h-full">
        <Link className="block h-full" href={episodeUrl}>
          <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-surface-200/80 shadow-soft hover:shadow-elevated transition-all duration-500 hover:border-primary/20 hover:-translate-y-1">
            {/* Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden">
              <ThumbnailImage
                alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                src={youtube.thumbnail || "/images/logo.webp"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
              
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Play button - centered with glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full bg-white shadow-glow flex items-center justify-center">
                    <Play className="w-7 h-7 text-primary fill-primary ml-1" />
                  </div>
                </div>
              </div>

              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                {/* Episode number pill */}
                <div className="flex items-center gap-1.5 bg-primary px-3 py-1.5 rounded-full shadow-medium">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    EP {youtube.episodeNumber}
                  </span>
                </div>
                
                {/* Date badge */}
                <div className="bg-surface-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-xs font-medium text-white">
                    {youtube.publishedAt
                      ? formatDate(youtube.publishedAt)
                      : `S${youtube.seasonNumber}`}
                  </span>
                </div>
              </div>

              {/* Bottom gradient text area */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {youtube.seasonNumber && (
                  <span className="inline-block text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md mb-2">
                    Season {youtube.seasonNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-lg font-bold text-surface-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-3">
                {formatEpisodeTitle(youtube.title)}
              </h3>

              {/* Blurb */}
              <p className="text-sm text-surface-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                {youtube.blurb}
              </p>

              {/* Footer with CTA */}
              <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                  <span>Watch Episode</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
                
                {/* Guests indicator */}
                {guests && guests.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-surface-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{guests.length} guest{guests.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Decorative accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </Link>
      </article>
    );
  }

  // List view
  return (
    <article className="group">
      <Link href={episodeUrl} className="block">
        <div className="relative bg-white rounded-2xl overflow-hidden border border-surface-200/80 shadow-soft hover:shadow-elevated transition-all duration-400 hover:border-primary/20">
          <div className="flex">
            {/* Thumbnail */}
            <div className="relative w-56 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0">
                <ThumbnailImage
                  alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  src={youtube.thumbnail || "/images/logo.webp"}
                  fill
                  sizes="224px"
                />
              </div>
              
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 via-transparent to-transparent opacity-60" />
              
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg" />
                  <div className="relative w-12 h-12 rounded-full bg-white shadow-medium flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                  </div>
                </div>
              </div>
              
              {/* Episode badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary px-2.5 py-1 rounded-full shadow-soft">
                <span className="text-xs font-bold text-white">EP {youtube.episodeNumber}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    {youtube.seasonNumber && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-surface-500 bg-surface-100 px-2 py-1 rounded-md">
                        Season {youtube.seasonNumber}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs text-surface-400">
                      <Calendar className="w-3 h-3" />
                      {youtube.publishedAt ? formatDate(youtube.publishedAt) : "Coming soon"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-2">
                    {formatEpisodeTitle(youtube.title)}
                  </h3>

                  {/* Blurb */}
                  <p className="text-sm text-surface-500 line-clamp-2 mb-3">
                    {youtube.blurb}
                  </p>

                  {/* Guests */}
                  {guests && guests.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-surface-400" />
                      <span className="text-xs font-medium text-surface-600">
                        {guests
                          .slice(0, 2)
                          .filter((guest) => guest?.name)
                          .map((guest) => guest.name)
                          .join(", ")}
                        {guests.length > 2 && ` +${guests.length - 2} more`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow button */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-50 group-hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-soft group-hover:shadow-medium">
                  <ArrowRight className="w-5 h-5 text-surface-400 group-hover:text-white transition-colors duration-200 group-hover:translate-x-0.5 transform" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
    </article>
  );
};

export default EpisodeCard;
