// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "../shared";
import heroImage from "@/public/images/main-page-hero.webp";
import Button from "../Button";
import FeaturedNews from "../FeaturedNews";
import Dropdown from "../Dropdown";

// copy
import { HERO, CTA, useGetEpisodesBySeason } from "./static-data";
import Slider from "../Slider";
import { BuzzSproutPlayer } from "../BuzzSproutPlayer";

// SWR
import useSWR, { mutate } from "swr";
import { client } from "../../sanity/sanity-utils";
import {
  ALL_SEASONS_QUERY,
  INITIAL_SEASON_EPISODES_QUERY,
  SEASON_EPISODES_QUERY,
} from "../../lib/queries";

import EpisodeSlider from "@/src/app/(website)/components/EpisodeSlider";
import JSONLD from "../SEO/jsonld";
import { Newsletter } from "../Newsletter";
import { LatestEpisode, LatestEpisodes } from "../LatestEpisode";
import { BrowseEpisodes } from "../BrowseEpisodes";

const HomePageComponent = () => {
  const [activeSeason, setActiveSeason] = useState();

  const { data, error, isLoading } = useSWR(ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // SWR
  useEffect(() => {
    if (!isLoading && data[0]?.title) {
      setActiveSeason(data[0]?.title);
    }
  }, [data]);

  useEffect(() => {
    mutate(SEASON_EPISODES_QUERY);
  }, [activeSeason]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": "gybwp",
    name: "Growing Your Business With People Podcast",
    url: "https://gybwp.com",
    thumbnailUrl: "https://gybwp/images/logo.webp",
    image: "https://gybwp.com/images/logo.webp",
    headline:
      "Listen to 'Growing Your Business with People!' – the podcast for CEOs and business leaders focusing on growth through investing in their teams.",
  };
  return (
    <>
      <JSONLD data={structuredData} />
      {/* MAIN SECTION */}
      <Section className="w-full py-16 md:py-32 lg:py-40 bg-main animate-fadeIn">
        <div className="container grid items-center gap-8 px-6 md:px-12 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-gray-200 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {HERO.header}
            </h1>
            <p className="max-w-[650px] text-gray-400 md:text-lg lg:text-xl xl:text-lg">
              {HERO.body}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-10 text-base font-medium text-gray-50 shadow transition-all duration-300 hover:bg-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:text-white dark:hover:bg-accent"
                href={HERO.buttonUrl}
              >
                {HERO.buttonText}
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md text-gray-50 bg-primary px-10 text-base font-medium shadow-sm transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:hover:bg-accent"
                href={HERO.secondButtonUrl}
              >
                {HERO.secondButtonText}
              </Link>
            </div>
          </div>
          <Image
            alt="Hero"
            className="lg:ml-64 mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
            height={600}
            src={heroImage}
            width={600}
            priority={true}
          />
        </div>
      </Section>

      {/* Episode Selector */}
      <LatestEpisode />
      <BrowseEpisodes />
      {/* <EpisodeSlider /> */}
      {/* Large Podcast Playa */}
      {/* <BuzzSproutPlayer lg /> */}

      {/* CTA */}
      <Newsletter />
      {/* <Section className={`bg-secondary`}>
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <SectionHeading className="text-white text-3xl md:text-3xl">
              {CTA.header}
            </SectionHeading>

            <p className="hidden font-extralight text-white sm:mt-4 sm:block">
              {CTA.body}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl text-center ">
            <Button
              as="a"
              color={"bg-[#0A66C2]"}
              href={CTA.buttonUrl}
              className="px-12 py-3"
            >
              {CTA.buttonText}
            </Button>
          </div>
        </div>
      </Section> */}

      {/* IN THE NEWS */}
      <FeaturedNews color="light" />
    </>
  );
};

export default HomePageComponent;
