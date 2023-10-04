// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import routes from "routes";

// components
import { Section, SectionHeading } from "components/shared";
import Image from "next/image";
import Button from "components/Button";
import Socials from "components/Socials";
import Link from "next/link";

// BuzzSprout Player
import { BuzzSproutPlayer } from "components/BuzzSproutPlayer";

// copy
import { episodeType } from "components/Pages/HomePage/episode-data";
import { DATA, CTA, getEpisode, getNextEpisode } from "./static-data";
import { SPONSORS } from "components/Pages/SponsorsPage/static-data";

// SWR
import useSWR from "swr";
import { groq, createClient } from "next-sanity";

const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: false,
});

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV.

export interface compiledEpisodeType extends episodeType {
  season: string;
}

const PodcastDetailsPageComponent = () => {
  const [episode, setEpisode] = useState<compiledEpisodeType>();
  const [nextEpisode, setNextEpisode] = useState<string>();

  const router = useRouter();

  const thisWindow =
    typeof window !== "undefined" ? window.location.pathname : null;

  const uuid = thisWindow?.split("/")[2];

  const { data, error, isLoading } = useSWR(
    groq`{ "episodes":*[_type == "episode"],"episodeDetails":*[_type == "episode"  && uuid == "${uuid}"]}{
      episodeDetails[]
{
blurb,
episodeName,
episodeNumber,
image,
podcastLinks,
seasonName,
seasonNumber,
sponsors,
url,
uuid,
details{
description,
links,
featuredGuests[]
{
name,
about,
title,
url,
"image":image.asset->url
}
}

}
}`,
    (query) => client.fetch(query)
  );

  useEffect(() => {
    if (!isLoading) {
      setEpisode(data.episodeDetails[0]);

      if (!data.episodeDetails.length) {
        // Error Handling if Episode doesn't exist
        throw new Error("No episode for this link.");
      }

      if (episode) {
        const nextEpisode = getNextEpisode(episode.uuid, episode);
        if (nextEpisode) {
          setNextEpisode(nextEpisode);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data, episode]);

  const isClip = episode?.uuid?.includes("_");

  if (episode)
    return (
      <>
        <Section flex className="bg-light ">
          <div className="md:px-20 py-6 w-full">
            <div
              className={`${
                nextEpisode ? "text-center" : "text-left ml-6"
              } mb-4 md:text-left md:mb-0`}
            >
              <Button
                onClick={router.back}
                className="px-10 py-2 mt-4"
                color="main"
              >
                {DATA.backButtonText}
              </Button>
              {nextEpisode ? (
                <Button
                  onClick={() => router.push(nextEpisode)}
                  className="ml-2 px-6 py-2 mt-4"
                  color="primary"
                >
                  {DATA.nextEpisodeButton}
                </Button>
              ) : null}
            </div>
            <div className="flex flex-col-reverse xl:flex-row flex-wrap justify-around mx-10 mb-10 mt-4 xl:mt-0">
              <div className="flex flex-col mt-12 lg:max-w-[40vw]">
                <h2 className="text-2xl font-bold">{episode.episodeName}</h2>
                <div className="mb-8 font-light">
                  Season {episode.seasonNumber} | Episode{" "}
                  {episode.episodeNumber}{" "}
                  {isClip ? `| Clip ${episode.uuid.split("_")[1]}` : null}
                </div>

                <div className="xl:max-w-lg">{episode.blurb}</div>

                {episode.podcastLinks?.length ? (
                  <Socials socials={episode.podcastLinks} />
                ) : null}
              </div>

              <div className="video-responsive m-auto">
                <iframe
                  className="block sm:hidden"
                  width="280"
                  height="157"
                  src={`https://www.youtube.com/embed/${
                    episode.url.split("/")[3]
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="hidden sm:block"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    episode.url.split("/")[3]
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                {episode.podcastLinks?.map((links) => {
                  {
                    if (links.name.includes("buzzsprout")) {
                      return (
                        <BuzzSproutPlayer lg={false} podcast={links.link} />
                      );
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </Section>
        {/* If you check length it doesn't display, otherwise it renders too many of same. */}
        {episode.details
          ? episode.details.featuredGuests?.map((guest, idx) => {
              const isOdd = idx % 2;
              return (
                <Section
                  key={`featured-guest-${guest.name}-${idx}`}
                  className=" justify-items-center overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2"
                >
                  {!isOdd && guest.image ? (
                    <Image
                      alt={`guest ${guest.name} picture`}
                      src={guest.image}
                      className="  object-cover  sm:h-full"
                      fit
                      height={500}
                      width={500}
                      quality={100}
                    />
                  ) : null}
                  <div className="p-8 md:p-12 lg:px-16 lg:py-24 h-[500px]">
                    <div className="mx-auto max-w-xl text-center sm:text-left">
                      <h2 className="text-xl font-bold text-gray-900 md:text-2xl mb-6">
                        {guest.name}
                      </h2>
                      <p className="text-gray-500 md:mt-4">{guest.about}</p>
                      <div className="border-b-[.5px] border-black my-4" />
                      <p className="italic font-thin">{guest.title}</p>

                      <div className="mt-6 md:mt-12">
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
                      src={guest.image}
                      className="object-cover  sm:h-full"
                      height={500}
                      width={500}
                      quality={100}
                    />
                  ) : null}
                </Section>
              );
            })
          : null}
        <Section className="bg-light flex  justify-center items-center ">
          {!isClip && episode.details ? (
            <Section className=" text-center mx-6 py-5 md:mx-20 mt-8 ">
              <SectionHeading className="  ">
                {DATA.aboutThisEpisodeHeader}
              </SectionHeading>

              {episode.details?.description ? (
                <div className="mt-8 ">
                  <div
                    key={`episode description `}
                    className="text-gray-500  whitespace-break-spaces   md:mt-4  "
                  >
                    {episode.details.description}
                  </div>
                </div>
              ) : null}

              {episode.details?.hashtags?.length ? (
                <div className="mt-8 italic font-thin">
                  {data.episodeDetails[0]?.hashtags.map((ht) => `#${ht} `)}
                </div>
              ) : null}
            </Section>
          ) : null}
          {!isClip && episode.links ? (
            <Section className="mx-6 md:mx-20 mt-8">
              <SectionHeading className="text-right">
                {DATA.importantLinksHeader}
              </SectionHeading>

              <div className=" mt-8  break-words">
                {episode.details.links?.map(
                  ({ text, linkText, linkUrl, secondaryText = "" }, idx) => {
                    if (!text || !linkUrl) {
                      return null;
                    }

                    return (
                      <div
                        key={`episode-link-${idx}`}
                        className="underline mb-4 md:flex-wrap md:w-max"
                      >
                        <Link href={linkUrl}>{text}</Link>

                        {/* <a
                      className="hover:text-primary"
                      target="_blank"
                      href={linkUrl}
                    >
                      {linkText || linkUrl}
                    </a>{" "}
                    {secondaryText} */}
                      </div>
                    );
                  }
                )}
              </div>
            </Section>
          ) : null}
        </Section>
        {episode.sponsors?.length ? (
          <Section
            className={`flex flex-row flex-wrap items-center justify-center mt-20 mx-6 md:mx-20 `}
          >
            {episode.sponsors.map((sponsorUUID, idx) => {
              const sponsor = SPONSORS.filter((s) => s.uuid === sponsorUUID)[0];
              if (!sponsor) {
                return null;
              }

              const { name, uuid, imgUrl, imgAlt, bgColor } = sponsor;

              return (
                <Link
                  key={`sponsor-${name}`}
                  href={`/sponsors/${uuid}`}
                  className="m-3 lg:m-6"
                >
                  <div
                    className={`${
                      bgColor || ""
                    } w-[250px] max-h-[150px] overflow-hidden`}
                  >
                    <Image
                      src={imgUrl}
                      alt={imgAlt}
                      className="h-[150px] w-auto m-auto px-4"
                      width={250}
                      height={150}
                      quality={100}
                    />
                  </div>
                </Link>
              );
            })}
          </Section>
        ) : null}
        <Section className={`bg-main ${isClip ? "mt-0" : "mt-20"}`}>
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="flex lg:mx-20 text-center md:text-left flex-col md:flex-row items-center">
              <SectionHeading className="text-white text-2xl md:text-3xl w-full mb-4 sm:mb-0">
                {CTA.header}
              </SectionHeading>

              <Button
                as="a"
                color={"primary"}
                href={CTA.buttonURL}
                className="px-12 py-3 mt-4 md:mt-0"
              >
                {CTA.buttonText}
              </Button>
            </div>
          </div>
        </Section>
      </>
    );
};

export default PodcastDetailsPageComponent;
