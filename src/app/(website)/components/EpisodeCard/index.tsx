import Link from "next/link";
import React from "react";
import Image from "next/image";
import { truncateText } from "../../lib/utils";

type YoutubeData = {
  title?: string;
  blurb?: string;
  description?: string;
  uuid?: string;
  seasonNumber?: number;
  episodeNumber: number;
  thumbnail?: string;
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
  },
}: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-[#293243] shadow-md transition-all duration-300 hover:shadow-xl h-[400px] flex flex-col">
      <Link className="flex flex-col h-full" href={`/episode/${youtube.uuid}`}>
        <div className="relative overflow-hidden h-[200px]">
          <Image
            alt={`Thumbnail for ${youtube.title}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            src={`${youtube.thumbnail}`}
            layout="fill"
          />
          <div className="absolute top-2 right-2 rounded-full bg-[#293243] bg-opacity-90 px-3 py-1 text-xs font-medium text-white">
            {`S${youtube.seasonNumber}E${youtube.episodeNumber}`}
          </div>
        </div>
        <div className="flex flex-col justify-between flex-grow p-4 text-white">
          <div>
            <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 h-[56px]">
              {youtube.title}
            </h3>
            <p className="mt-2 text-sm text-gray-300 line-clamp-3 h-[60px]">
              {youtube.blurb}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-300 group-hover:text-blue-300 transition-colors duration-300">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Watch now
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
