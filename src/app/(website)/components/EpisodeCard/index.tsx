import Link from "next/link";
import React from "react";

import placeholder from "@/public/placeholder.svg";
import Image from "next/image";
import { Carousel, CarouselItem } from "../ui/carousel";
import { truncateText } from "../../lib/utils";

type YoutubeData = {
  title?: string;
  blurb?: string;
  description?: string;
};

type Props = {
  image?: string;
  uuid?: string;
  youtube?: YoutubeData;
  seasonNumber?: number;
  episodeNumber?: number;
};

const EpisodeCard = ({
  image = placeholder,
  uuid = "100",
  youtube = {
    title: "No title presented",
    description: "No description provided",
    blurb: "No description provided",
  },
  seasonNumber = 0,
  episodeNumber = 0,
}: Props) => {
  return (
    <>
      {/* Start Podcast Card. */}

      <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg">
        <Link
          className="flex flex-col group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
          href={`/episode/${uuid}`}
        >
          <Image
            alt="Episode Image"
            className="aspect-video object-cover w-full"
            height={400}
            src={image}
            width={600}
          />
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">
                {youtube.title}
              </h3>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                {`S${seasonNumber}E${episodeNumber}`}
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
