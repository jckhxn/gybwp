import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
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
  guests?: Array<{ name?: string }>; // Made name optional to match real data
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
  // Helper function to generate episode URL
  const getEpisodeUrl = () => {
    // Prioritize pathname, fallback to UUID-based URL for backwards compatibility
    if (pathname?.current) {
      return pathname.current;
    }
    if (youtube?.uuid) {
      return `/episodes/${youtube.uuid}`;
    }
    if (uuid) {
      return `/episodes/${uuid}`;
    }
    return "/episodes"; // Fallback to episodes listing
  };

  const episodeUrl = getEpisodeUrl();

  // Format the date to show as Month, Date (e.g., "April 22")
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  // Grid view (default)
  if (viewMode === "grid") {
    return (
      <div className="group card-executive h-[400px] flex flex-col overflow-hidden">
        <Link className="flex flex-col h-full" href={episodeUrl}>
          <div className="relative overflow-hidden h-[200px] w-full">
            <Image
              alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
              src={`${youtube.thumbnail}`}
              fill
              priority
            />
            {/* Professional overlay with depth */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-primary/5"></div>

            {/* Premium episode info badge */}
            <div className="glass-card absolute top-3 right-3 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-glass">
              {youtube.publishedAt
                ? formatDate(youtube.publishedAt)
                : `S${youtube.seasonNumber}E${youtube.episodeNumber}`}
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow p-6 text-gray-900 relative">
            {/* Subtle content depth */}
            <div className="absolute inset-0 bg-white/25 pointer-events-none"></div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {formatEpisodeTitle(youtube.title)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {youtube.blurb}
              </p>
            </div>

            {/* Premium CTA Button */}
            <div className="mt-6 pt-2 relative z-10">
              <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary-light transition-all duration-300 group-hover:translate-x-1">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-all duration-300">
                  <Play className="h-4 w-4" fill="currentColor" />
                  <span>Listen Now</span>
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
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // List view
  return (
    <div className="group card-professional overflow-hidden">
      <Link href={episodeUrl} className="flex">
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image
            alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={`${youtube.thumbnail}`}
            fill
            sizes="192px"
          />
          {/* Professional overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-primary/3"></div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1 mr-4">
                {formatEpisodeTitle(youtube.title)}
              </h3>
              <div className="authority-badge whitespace-nowrap">
                {youtube.publishedAt
                  ? formatDate(youtube.publishedAt)
                  : `S${youtube.seasonNumber}E${youtube.episodeNumber}`}
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {youtube.blurb}
            </p>
            {guests && guests.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">
                  Featuring:
                </span>
                <span className="text-xs text-gray-700">
                  {guests
                    .slice(0, 2)
                    .filter((guest) => guest?.name) // Filter out guests without names
                    .map((guest) => guest.name)
                    .join(", ")}
                  {guests.length > 2 && ` +${guests.length - 2} more`}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary-light transition-all duration-300 group-hover:translate-x-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-all duration-300">
                <Play className="h-4 w-4" fill="currentColor" />
                <span>Listen Now</span>
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
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
