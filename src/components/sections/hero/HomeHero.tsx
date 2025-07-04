"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Headphones } from "lucide-react";
import heroImage from "@/public/images/main-page-hero.webp";
import { HomeHeroSection } from "@/types";
import Button from "@/src/components/ui/Button";
import {
  getImageUrlClient,
  getHeroImageUrl,
  getHeroImageSrcSet,
  getHeroImageSizes,
} from "@/src/lib/imageUrlClient";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  const {
    title = "Growing Your Business With People",
    subtitle = "Where Leadership Meets Excellence",
    description = "Join CEO & Leadership Coach Jeff Lackey as he explores how the best leaders grow their companies by investing in their most valuable asset: their people.",
    badgeText = "Business Leadership Podcast",
    primaryButton = { text: "Listen Now", link: "/episodes" },
    secondaryButton = { text: "About Jeff", link: "/about" },
    platformsHeading = "Available on:",
    platforms,
    hostBadge,
    backgroundImage,
    showLatestEpisode = false,
  } = section;

  // Provide fallbacks for arrays and objects that might be null from Sanity
  const safePlatforms = platforms || [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
      logoImage: "/social-logos/apple.png",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
      logoImage: "/social-logos/spotify.png",
    },
    {
      name: "Buzzsprout",
      url: "https://www.buzzsprout.com/2057493",
      logoImage: "/social-logos/buzzsprout.png",
    },
  ];

  const safeHostBadge = hostBadge || {
    label: "Host",
    name: "Jeff Lackey",
    title: "CEO & Leadership Coach",
  };

  return (
    <section className="w-full pt-16 md:pt-24 lg:pt-28 pb-4 md:pb-6 lg:pb-8 bg-gradient-to-br from-main-dark via-main to-main-light relative overflow-hidden">
      {/* Pattern overlay for texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNNDAgMzJoNHYxaC00ek0zMiAzN2g0djFoLTR6TTM2IDM5aDR2MWgtNHpNNDAgNDFoNHYxaC00ek0zMiA0NGg0djFoLTR6TTM2IDQ2aDR2MWgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] mix-blend-overlay"></div>

      {/* Enhanced animated floating shapes */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl z-0"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-1/2 -left-12 w-44 h-44 rounded-full bg-secondary/20 blur-2xl z-0"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-52 h-52 rounded-full bg-accent/10 blur-3xl z-0"
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-24">
          <div className="lg:w-1/2 flex flex-col gap-8 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 w-fit">
                <span className="text-primary-light font-semibold tracking-widest uppercase text-sm md:text-base">
                  {badgeText}
                </span>
              </div>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight font-sans bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-200 text-xl md:text-2xl max-w-[600px] leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <Button
                as="a"
                href={primaryButton.link}
                color="primary"
                className="group relative h-14 px-8 text-base font-medium text-white overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-light shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
              >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                <Play className="inline-block w-5 h-5 relative z-10" />
                <span className="relative z-10">{primaryButton.text}</span>
              </Button>

              {secondaryButton && (
                <Button
                  as="a"
                  href={secondaryButton.link}
                  color="secondary"
                  className="group h-14 px-8 text-base font-medium text-white bg-transparent border-2 border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 flex items-center gap-2"
                >
                  <Headphones className="inline-block w-5 h-5 group-hover:scale-110 transition-transform" />
                  {secondaryButton.text}
                </Button>
              )}
            </motion.div>

            {/* PODCAST PLATFORMS */}
            {safePlatforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-8"
              >
                <p className="text-gray-300 mb-4 font-medium">
                  {platformsHeading}
                </p>
                <div className="flex flex-wrap gap-4">
                  {safePlatforms.map((platform, index) => (
                    <Link
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all py-2.5 px-5 rounded-full shadow-md hover:scale-105 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm"
                    >
                      <Image
                        src={
                          platform.logoImage
                            ? getImageUrlClient(platform.logoImage, {
                                width: 48,
                                height: 48,
                                quality: 100,
                              })
                            : "/social-logos/default.png"
                        }
                        alt={platform.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span className="text-white font-medium">
                        {platform.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Enhanced Host Badge */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/70 backdrop-blur-xl px-6 py-4 rounded-xl shadow-xl border border-primary/20 ring-1 ring-white/10">
              <div className="flex items-center gap-4">
                <div className="w-[3px] h-14 bg-gradient-to-b from-primary to-primary-light rounded-full"></div>
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider font-medium">
                    {safeHostBadge.label}
                  </p>
                  <p className="text-white font-bold text-xl">
                    {safeHostBadge.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {safeHostBadge.title}
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-accent/20 blur-3xl"></div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur-xl opacity-30"></div>
                <Image
                  alt="Growing Your Business With People Podcast"
                  className="relative z-10 rounded-2xl shadow-2xl object-cover border border-white/10"
                  height={750}
                  src={
                    backgroundImage
                      ? getHeroImageUrl(backgroundImage, 1600)
                      : heroImage
                  }
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  width={600}
                  priority={true}
                  quality={100}
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
