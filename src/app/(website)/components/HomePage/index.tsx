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

const HomePageComponent = () => {
  const [activeSeason, setActiveSeason] = useState();

  const { data, error, isLoading } = useSWR(ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // Fucking SWR
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
    "name": "Growing Your Business With People Podcast",
    "url": "https://gybwp.com",
    "thumbnailUrl": "https://gybwp/images/logo.webp",
    "image": "https://gybwp.com/images/logo.webp",
    "headline": "Listen to 'Growing Your Business with People!' – the podcast for CEOs and business leaders focusing on growth through investing in their teams."
  }
  return (
    <>
      <JSONLD data={structuredData} />
      {/* MAIN SECTION */}
      <Section className="w-full py-12 md:py-24 lg:py-3 bg-main ">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-2 ">
          <div className="space-y-4">
            <h1 className="text-gray-200 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {HERO.header}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {HERO.body}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-white-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:text-white dark:hover:bg-primary-50/90 dark:focus-visible:ring-gray-300"
                href={HERO.buttonUrl}
              >
                {HERO.buttonText}
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 
                text-gray-50 bg-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:hover:bg-primary dark:hover:text-white dark:focus-visible:ring-gray-300"
                href={HERO.secondButtonUrl}
              >
                {HERO.secondButtonText}
              </Link>
            </div>
          </div>
          <Image
            alt="Hero"
            className=" lg:ml-64 mx-auto aspect-square   overflow-hidden rounded-xl object-cover"
            height={550}
            src={heroImage}
            width={550}
            priority={true}
          />
        </div>
      </Section>
      {/* Large Podcast Playa */}
      <Section className="">
        <BuzzSproutPlayer lg />
      </Section>
      {/* EPISODES */}
      {/* <Section className="py-8 px-4 overflow-x-hidden h-[650px]">
        <div className="flex gap-8 justify-between mx-8 md:mx-[10vw]">
          <div className="w-full mx-0">
            <h1 className="leading-normal text-lg">{`Season ${
              activeSeason || ""
            }`}</h1>
          </div>

          <Dropdown setActiveSeason={setActiveSeason} />
        </div>

        <Slider
          activeSeason={activeSeason}
          items={useGetEpisodesBySeason(activeSeason)}
        />
      </Section> */}
      <EpisodeSlider />

      {/* CTA */}
      <Section className={`bg-secondary`}>
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
      </Section>

      {/* IN THE NEWS */}
      <FeaturedNews color="light" />
    </>
  );
};

export default HomePageComponent;
