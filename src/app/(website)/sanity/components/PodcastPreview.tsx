// @ts-nocheck
"use client";
// Next Stuff
import { draftMode } from "next/headers";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";
const builder = imageUrlBuilder({ projectId, dataset });

import { usePathname, useRouter } from "next/navigation";
// components
import { Section, SectionHeading } from "../../components/shared";
import Image from "next/image";
import Button from "../../components/Button";
import Socials from "../../components/Socials";
import Link from "next/link";
import Slider from "../../components/Slider";
// BuzzSprout Player
import { BuzzSproutPlayer } from "../../components/BuzzSproutPlayer";

import {
  DATA,
  CTA,
} from "../../../(website)/components/Pages/PodcastDetailsPage/static-data";

import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";

import { useState } from "react";
import { EPISODE_QUERY } from "../../lib/queries";
import { episodeType } from "../../components/Pages/HomePage/episode-data";

export interface compiledEpisodeType extends episodeType {
  season: string;
}
export default function PodcastPreview({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityDocument>;
  params: QueryParams;
}) {
  const [episode, setEpisode] = useState<compiledEpisodeType>();
  const [nextEpisode, setNextEpisode] = useState<string>();
  const [allPrevGuestEpisodes, setPrevGuestEpisodes] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const uuid = pathname?.split("/")[2];

  // Get UUID and pass it to this query
  const { data } = useQuery<SanityDocument | null>(
    EPISODE_QUERY,
    { uuid },
    {
      initial,
    }
  );

  const isClip = data?.youtube.uuid?.includes("_");
  const isPart = data?.youtube.uuid?.includes("-");

  return data ? (
    <>
      <Section flex className="bg-light ">
        <div className="md:px-20 py-6 w-full"></div>
        <div className="flex flex-col-reverse xl:flex-row flex-wrap justify-around mx-10 mb-10 mt-4 xl:mt-0">
          <div className="flex flex-col mt-12 lg:max-w-[40vw]">
            <h2 className="text-2xl font-bold">{data.youtube.title}</h2>
            <div className="mb-8 font-light">
              Season {data.youtube.seasonNumber} | Episode{" "}
              {data.youtube.episodeNumber}
              {isPart ? `, Part ${data.uuid.split("-")[1]}` : null}
              {isClip ? `| Clip ${data.uuid.split("_")[1]}` : null}
            </div>

            <div className="xl:max-w-lg">{data.youtube.blurb}</div>

            {data.podcastLinks?.length ? (
              <Socials socials={data.podcastLinks} />
            ) : null}
          </div>

          <div className="video-responsive m-auto">
            <iframe
              className="block sm:hidden"
              width="280"
              height="157"
              src={`https://www.youtube.com/embed/${
                data.url?.split("/")[3] || data.youtube.id
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>{" "}
            <iframe
              className="hidden sm:block"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                data.url?.split("/")[3] || data.youtube.id
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Guest Section */}
        {/* If you check length it doesn't display, otherwise it renders too many of same. */}
        {data?.details
          ? data.details.featuredGuests?.map((guest, idx) => {
              const isOdd = idx % 2;

              return (
                <Section
                  key={`featured-guest-${guest.name}-${idx}`}
                  className=" justify-items-center overflow-hidden mx-auto  bg-gray-50 sm:grid sm:grid-cols-2"
                >
                  {!isOdd && guest.image ? (
                    <Image
                      alt={`guest ${guest.name} picture`}
                      src={builder
                        .image(guest.image)
                        .width(400)
                        .height(400)
                        .quality(100)
                        .url()}
                      className=" "
                      height={400}
                      width={400}
                      quality={100}
                    />
                  ) : null}
                  <div className="p-8 md:p-12 lg:px-16 lg:py-24 h-[500px] ">
                    <div className="mx-auto max-w-xl text-center sm:text-left">
                      <h2 className="text-xl font-bold text-gray-900 md:text-2xl mb-6">
                        {guest.name}
                      </h2>
                      <p className="text-gray-500 md:mt-4">{guest.about}</p>
                      <div className="border-b-[.5px] border-black my-4" />
                      <p className="italic font-thin">{guest.title}</p>
                      <div className="mt-6  md:mt-12">
                        <a
                          href={guest.url}
                          target="_blank"
                          className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/70"
                        >
                          {DATA.featuredGuestButtonText}
                        </a>
                      </div>
                    </div>
                  </div>

                  {isOdd ? (
                    <Image
                      alt={`guest ${guest.name} picture`}
                      src={builder
                        .image(guest.image)
                        .width(400)
                        .height(400)
                        .quality(100)
                        .url()}
                      className="object-cover  sm:h-full"
                      height={500}
                      width={500}
                      quality={100}
                    />
                  ) : null}
                  {/* {allPrevGuestEpisodes[idx]?.length > 0 ? (
                    <div className=" ">
                      <h1 className="font-medium text-xl lg:text-center">
                        Episodes Featuring this Guest
                      </h1>
                      <Slider items={allPrevGuestEpisodes[idx]} />
                    </div>
                  ) : null} */}
                </Section>
              );
            })
          : null}
        {/* About Section */}

        <Section className="bg-light flex  justify-center items-center ">
          {!isClip && data?.youtube?.description ? (
            <Section className=" text-center mx-6 py-5 md:mx-20 mt-8 ">
              <SectionHeading className="  ">
                {DATA.aboutThisEpisodeHeader}
              </SectionHeading>

              {data?.youtube?.description ? (
                <div className="mt-8  ">
                  <div
                    key={`episode description `}
                    className="text-gray-500  whitespace-break-spaces   md:mt-4  "
                  >
                    {data?.youtube?.description}
                  </div>
                </div>
              ) : null}

              {episode?.details?.hashtags?.length ? (
                <div className="mt-8 italic font-thin">
                  {data.episodeDetails[0]?.hashtags.map((ht) => `#${ht} `)}
                </div>
              ) : null}
            </Section>
          ) : null}
        </Section>
      </Section>
    </>
  ) : (
    <h1 className="text-center">
      Possibly missing data, please enter more information in the document
      field.
    </h1>
  );
}
