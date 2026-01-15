"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Headphones, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/public/images/main-page-hero.webp";
import { HomeHeroSection } from "@/types";
import { SmartButton } from "@/src/components/ui/SmartButton";
import {
  getImageUrlClient,
  getHeroImageUrl,
  getHeroImageSrcSet,
  getHeroImageSizes,
} from "@/src/lib/imageUrlClient";
import { getComponentId } from "@/src/lib/sectionId";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  const componentId = getComponentId(section, "home-hero");

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
    <section
      id={componentId}
      className="relative w-full min-h-[90vh] flex items-center bg-surface-900 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pattern-grid"></div>

      <div className="container relative z-10 py-16 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                  {badgeText}
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-display-lg font-bold text-white leading-[1.1] tracking-tight">
                {title.split(" ").map((word, i) => (
                  <span key={i}>
                    {word === "People" ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-surface-300 leading-relaxed max-w-lg"
            >
              {description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <SmartButton
                data={primaryButton}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-xl
                           shadow-glow transition-all duration-300 ease-smooth-out
                           hover:bg-primary-light hover:shadow-glow-lg hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{primaryButton.text}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </SmartButton>

              {secondaryButton && (
                <SmartButton
                  data={secondaryButton}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl
                             border border-white/20 backdrop-blur-sm
                             transition-all duration-300 ease-smooth-out
                             hover:bg-white/20 hover:border-white/30 hover:-translate-y-1"
                >
                  <Headphones className="w-5 h-5" />
                  <span>{secondaryButton.text}</span>
                </SmartButton>
              )}
            </motion.div>

            {/* Podcast Platforms */}
            {safePlatforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <p className="text-sm text-surface-400 mb-4 uppercase tracking-wider font-medium">
                  {platformsHeading}
                </p>
                <div className="flex flex-wrap gap-3">
                  {safePlatforms.map((platform, index) => (
                    <Link
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 
                                 border border-white/10 hover:border-white/20 rounded-xl
                                 transition-all duration-300"
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
                        width={20}
                        height={20}
                        className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-sm font-medium text-surface-300 group-hover:text-white transition-colors">
                        {platform.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-48 lg:w-72 h-48 lg:h-72 bg-primary/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-8 -left-8 w-40 lg:w-60 h-40 lg:h-60 bg-secondary/20 rounded-full blur-[60px]"></div>
            
            {/* Main image container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-60"></div>
              
              {/* Image frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  alt="Growing Your Business With People Podcast"
                  className="relative z-10 object-cover w-full h-auto"
                  height={500}
                  width={600}
                  src={
                    backgroundImage
                      ? getHeroImageUrl(backgroundImage, 1600)
                      : heroImage
                  }
                  sizes="(max-width: 1200px) 50vw, 600px"
                  priority={true}
                  quality={100}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900/40 via-transparent to-transparent"></div>
              </div>
              
              {/* Host Badge - Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 left-2 lg:-bottom-6 lg:-left-6 z-20"
              >
                <div className="bg-surface-900/95 backdrop-blur-md px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl shadow-elevated border border-white/20">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-1 h-10 lg:h-12 bg-gradient-to-b from-primary to-primary-light rounded-full"></div>
                    <div>
                      <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">
                        {safeHostBadge.label}
                      </p>
                      <p className="text-base lg:text-lg font-bold text-white">
                        {safeHostBadge.name}
                      </p>
                      <p className="text-xs lg:text-sm text-surface-300">
                        {safeHostBadge.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              

            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
