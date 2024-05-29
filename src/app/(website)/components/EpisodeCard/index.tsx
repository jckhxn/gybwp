import Link from "next/link";
import React from "react";

import placeholder from "@/public/placeholder.svg";
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
    thumbnail: placeholder,
  },
}: Props) => {
  // Img, UUID, SeasonNumber/EpisodeNumber

  return (
    <>
      {/* Start Podcast Card. */}

      <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg">
        <Link
          className="flex flex-col group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
          href={`/episode/${youtube.uuid}`}
        >
          <Image
            alt="Episode Image"
            className="aspect-video object-cover w-full"
            height={400}
            src={youtube.thumbnail || placeholder}
            width={600}
          />
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">
                {youtube.title}
              </h3>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                {`S${youtube.seasonNumber}E${youtube.episodeNumber}`}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-600">
              {truncateText(youtube.blurb as string, 100)}
            </p>
          </div>
        </Link>

        {/* End Podcast Card */}
      </div>
    </>
  );
};

export default EpisodeCard;
