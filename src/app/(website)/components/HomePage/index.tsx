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
    if (!isLoading && data?.[0]?.title) {
      setActiveSeason(data[0].title);
    }
  }, [data, isLoading]);

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

      {/* REDESIGNED HERO SECTION */}
      <Section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-main to-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="lg:w-1/2 space-y-8 mb-10 lg:mb-0">
              <div>
                <h2 className="text-primary font-semibold tracking-wide uppercase">
                  Business Leadership Podcast
                </h2>
                <h1 className="text-gray-100 text-4xl md:text-5xl lg:text-6xl font-bold mt-2 leading-tight">
                  {HERO.header}
                </h1>
              </div>

              <p className="text-gray-300 text-lg md:text-xl max-w-[600px]">
                {HERO.body}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-gray-50 shadow-lg transition-all duration-300 hover:bg-accent hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                  href={HERO.buttonUrl}
                >
                  {HERO.buttonText}
                </Link>
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-md border-2 border-gray-400 px-8 text-base font-medium text-gray-100 transition-all duration-300 hover:bg-gray-800 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                  href={HERO.secondButtonUrl}
                >
                  {HERO.secondButtonText}
                </Link>
              </div>

              {/* PODCAST PLATFORMS */}
              <div className="pt-6">
                <p className="text-gray-400 mb-4 font-medium">Available on:</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors py-2 px-4 rounded-lg"
                  >
                    <Image
                      src="/social-logos/apple.png"
                      alt="Apple Podcasts"
                      width={24}
                      height={24}
                    />
                    <span className="text-white">Apple Podcasts</span>
                  </Link>
                  <Link
                    href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors py-2 px-4 rounded-lg"
                  >
                    <Image
                      src="/social-logos/spotify.png"
                      alt="Spotify"
                      width={24}
                      height={24}
                    />
                    <span className="text-white">Spotify</span>
                  </Link>
                  <Link
                    href="https://www.buzzsprout.com/2057493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors py-2 px-4 rounded-lg"
                  >
                    <Image
                      src="/social-logos/buzzsprout.png"
                      alt="Buzzsprout"
                      width={24}
                      height={24}
                    />
                    <span className="text-white">Buzzsprout</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative element */}
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-accent/20 blur-2xl"></div>

                <Image
                  alt="Growing Your Business With People Podcast"
                  className="relative z-10 rounded-2xl shadow-2xl object-cover border-4 border-gray-800/50"
                  height={500}
                  src={heroImage}
                  width={500}
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Episode Selector */}
      <LatestEpisode />
      <BrowseEpisodes />

      {/* Newsletter CTA */}
      <Newsletter />

      {/* Featured News */}
      <FeaturedNews color="light" />
    </>
  );
};

export default HomePageComponent;
