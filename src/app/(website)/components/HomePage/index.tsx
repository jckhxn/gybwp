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
import { Play, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const HomePageComponent = () => {
  const [activeSeason, setActiveSeason] = useState();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(ALL_SEASONS_QUERY)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading && data?.[0]?.title) {
      setActiveSeason(data[0].title);
    }
  }, [data, isLoading]);

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
      <Section className="w-full py-10 md:py-16 lg:py-20 bg-gradient-to-br from-main to-gray-900 relative overflow-hidden">
        {/* Animated floating shapes */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute -top-10 left-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl z-0"
        />
        {/* Removed orange (accent) floating shape */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute top-1/2 left-0 w-24 h-24 rounded-full bg-secondary/20 blur-2xl z-0"
        />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 flex flex-col gap-8 mb-10 lg:mb-0">
              <div className="flex flex-col gap-2">
                <h2 className="text-primary font-semibold tracking-widest uppercase text-lg md:text-xl">
                  Business Leadership Podcast
                </h2>
                <h1 className="text-gray-100 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-sans">
                  {HERO.header}
                </h1>
              </div>
              <p className="text-gray-300 text-xl md:text-2xl max-w-[600px]">
                {HERO.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  as="a"
                  href={HERO.buttonUrl}
                  color="primary"
                  className="h-14 px-8 text-base font-medium text-gray-50 shadow-lg transition-all duration-300 hover:bg-accent hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 flex items-center gap-2"
                >
                  <Play className="inline-block w-5 h-5" />
                  {HERO.buttonText}
                </Button>
                <Button
                  as="a"
                  href={HERO.secondButtonUrl}
                  color="accent"
                  className="h-14 px-8 text-base font-medium text-gray-100 border-2 border-gray-400 transition-all duration-300 hover:bg-gray-800 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 flex items-center gap-2"
                >
                  <Headphones className="inline-block w-5 h-5" />
                  {HERO.secondButtonText}
                </Button>
              </div>
              {/* PODCAST PLATFORMS */}
              <div className="pt-6">
                <p className="text-gray-400 mb-3 font-medium">Available on:</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-all py-2 px-5 rounded-full shadow-md hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src="/social-logos/apple.png"
                      alt="Apple Podcasts"
                      width={24}
                      height={24}
                    />
                    <span className="text-white font-medium">
                      Apple Podcasts
                    </span>
                  </Link>
                  <Link
                    href="https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-all py-2 px-5 rounded-full shadow-md hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src="/social-logos/spotify.png"
                      alt="Spotify"
                      width={24}
                      height={24}
                    />
                    <span className="text-white font-medium">Spotify</span>
                  </Link>
                  <Link
                    href="https://www.buzzsprout.com/2057493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-all py-2 px-5 rounded-full shadow-md hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src="/social-logos/buzzsprout.png"
                      alt="Buzzsprout"
                      width={24}
                      height={24}
                    />
                    <span className="text-white font-medium">Buzzsprout</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
              {/* Host Badge - Stationary */}
              <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-white/20 ring-2 ring-accent/30">
                <div className="flex items-center gap-3">
                  <div className="w-[3px] h-12 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-gray-300 text-xs uppercase tracking-wider font-medium">
                      Host
                    </p>
                    <p className="text-white font-bold text-lg">Jeff Lackey</p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="relative"
              >
                {/* Decorative element */}
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-accent/20 blur-2xl"></div>
                <Image
                  alt="Growing Your Business With People Podcast"
                  className="relative z-10 rounded-2xl shadow-2xl object-cover border-2 border-accent/60"
                  height={500}
                  src={heroImage}
                  width={500}
                  priority={true}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Episode Selector */}
      <Section className="pt-2 pb-0 md:pb-0 lg:pb-0">
        <LatestEpisode />
        <div className="mt-4">
          <BrowseEpisodes />
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section className="relative w-full py-6 md:py-10 lg:py-12 flex items-center justify-center overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 mb-6">
        <Newsletter />
      </Section>

      {/* Featured News */}
      <Section className="w-full py-6 md:py-10 lg:py-12 bg-white rounded-xl shadow-lg border border-gray-100 mt-8 mb-6">
        <FeaturedNews color="light" />
      </Section>
    </>
  );
};

export default HomePageComponent;
