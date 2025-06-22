import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

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
  youtube?: YoutubeData;
  seasonNumber?: number;
  episodeNumber?: number;
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
}: Props) => {
  // Format the date to show as Month, Date (e.g., "April 22")
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-main/80 to-gray-900/80 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 h-[400px] flex flex-col border border-gray-800/40 backdrop-blur-md">
      <Link className="flex flex-col h-full" href={`/episode/${youtube.uuid}`}>
        <div className="relative overflow-hidden h-[200px] w-full">
          <Image
            alt={`Thumbnail for ${youtube.title}`}
            className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-2xl"
            src={`${youtube.thumbnail}`}
            fill
            priority
          />
          <div className="absolute top-2 right-2 rounded-full bg-main/90 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {youtube.publishedAt
              ? formatDate(youtube.publishedAt)
              : `S${youtube.seasonNumber}E${youtube.episodeNumber}`}
          </div>
        </div>
        <div
          className="flex flex-col justify-between flex-grow p-5 text-white font-sans"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          <div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300 line-clamp-2 h-[56px]">
              {youtube.title}
            </h3>
            <p className="mt-2 text-base text-gray-300 line-clamp-3 h-[60px]">
              {youtube.blurb}
            </p>
          </div>
          <button className="mt-4 h-11 flex items-center justify-center gap-2 text-base font-semibold text-white bg-primary hover:bg-accent transition-colors duration-300 rounded-lg shadow-md px-6 focus:outline-none focus:ring-2 focus:ring-accent">
            <Play className="mr-2 h-4 w-4" />
            Watch now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
