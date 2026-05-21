import Link from "next/link";
import React from "react";
import { ThumbnailImage } from "@/src/components/ui/thumbnail-image";
import { Play, ArrowRight, Calendar, Users } from "lucide-react";
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
    title: "Untitled Episode",
    description: "",
    blurb: "",
    uuid: "",
    seasonNumber: 0,
    episodeNumber: 0,
    thumbnail: "",
    publishedAt: "",
  },
  uuid,
  pathname,
  viewMode = "grid",
  guests = [],
}: Props) => {
  const getEpisodeUrl = () => {
    if (pathname?.current) return pathname.current;
    if (youtube?.uuid) return `/episodes/${youtube.uuid}`;
    if (uuid) return `/episodes/${uuid}`;
    return "/episodes";
  };

  const episodeUrl = getEpisodeUrl();
  const title = formatEpisodeTitle(youtube.title || "Untitled Episode");

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const guestNames = guests
    ?.slice(0, 2)
    .filter((g) => g?.name)
    .map((g) => g.name)
    .join(", ");

  // ── Grid card ──────────────────────────────────────────────────────────
  if (viewMode === "grid") {
    return (
      <article className="group h-full">
        <Link className="flex flex-col h-full" href={episodeUrl}>
          <div className="relative h-full rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col bg-white">

            {/* Thumbnail — dark background so circular artwork pops */}
            <div className="relative bg-stone-900 overflow-hidden flex-shrink-0" style={{ paddingBottom: "62.5%" }}>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <ThumbnailImage
                    alt={title}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    src={youtube.thumbnail || "/images/logo.webp"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={false}
                  />
                </div>
              </div>

              {/* Hover play overlay */}
              <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>

              {/* Episode number */}
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold text-white bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  EP {youtube.episodeNumber}
                </span>
              </div>

              {/* Season label */}
              {youtube.seasonNumber ? (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    S{youtube.seasonNumber}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                {title}
              </h3>

              {guestNames && (
                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <Users className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{guestNames}{guests.length > 2 ? ` +${guests.length - 2}` : ""}</span>
                </div>
              )}

              {youtube.blurb && (
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 flex-1">
                  {youtube.blurb}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-auto">
                {youtube.publishedAt ? (
                  <span className="flex items-center gap-1 text-[10px] text-stone-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(youtube.publishedAt)}
                  </span>
                ) : <span />}
                <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                  Listen <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // ── List card ───────────────────────────────────────────────────────────
  return (
    <article className="group">
      <Link href={episodeUrl} className="block">
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex">

          {/* Thumbnail — dark bg, fixed square */}
          <div className="relative w-44 h-44 flex-shrink-0 bg-stone-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <div className="relative w-full h-full">
                <ThumbnailImage
                  alt={title}
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  src={youtube.thumbnail || "/images/logo.webp"}
                  fill
                  sizes="176px"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
            </div>
            <div className="absolute top-2.5 left-2.5">
              <span className="text-[10px] font-bold text-white bg-stone-900/80 px-2 py-0.5 rounded-full">
                EP {youtube.episodeNumber}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-5 py-4 flex flex-col justify-center min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {youtube.seasonNumber ? (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  Season {youtube.seasonNumber}
                </span>
              ) : null}
              {youtube.publishedAt && (
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(youtube.publishedAt)}
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-1.5">
              {title}
            </h3>

            {youtube.blurb && (
              <p className="text-sm text-stone-500 line-clamp-2 mb-2">
                {youtube.blurb}
              </p>
            )}

            {guestNames && (
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Users className="w-3.5 h-3.5" />
                <span>{guestNames}{guests.length > 2 ? ` +${guests.length - 2} more` : ""}</span>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="flex items-center pr-5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-stone-50 group-hover:bg-amber-500 border border-stone-200 group-hover:border-amber-500 flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EpisodeCard;
