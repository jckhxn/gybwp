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
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-[400px] flex flex-col">
        <Link className="flex flex-col h-full" href={episodeUrl}>
          <div className="relative overflow-hidden h-[200px] w-full">
            <Image
              alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
              src={`${youtube.thumbnail}`}
              fill
              priority
            />
            {/* Light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>

            {/* Episode info badge */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
              {youtube.publishedAt
                ? formatDate(youtube.publishedAt)
                : `S${youtube.seasonNumber}E${youtube.episodeNumber}`}
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow p-6 text-gray-900">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {formatEpisodeTitle(youtube.title)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {youtube.blurb}
              </p>
            </div>

            {/* Button */}
            <div className="mt-4 pt-2">
              <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors duration-200">
                <Play className="h-4 w-4 mr-2" fill="currentColor" />
                Listen Now
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
                  className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // List view
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
      <Link href={episodeUrl} className="flex">
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image
            alt={`Thumbnail for ${formatEpisodeTitle(youtube.title)}`}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={`${youtube.thumbnail}`}
            fill
            sizes="192px"
          />
          {/* Light overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 flex-1 mr-4">
                {formatEpisodeTitle(youtube.title)}
              </h3>
              <div className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-200">
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
          <div className="flex items-center justify-between pt-2">
            <div className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors duration-200">
              <Play className="h-4 w-4 mr-2" fill="currentColor" />
              Listen Now
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
                className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
