"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Headphones } from "lucide-react";
import heroImage from "@/public/images/main-page-hero.webp";
import { HomeHeroSection } from "@/types";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  const {
    title = "Growing Your Business With People",
    subtitle = "Where Leadership Meets Excellence",
    description = "Join CEO & Leadership Coach Jeff Lackey as he explores how the best leaders grow their companies by investing in their most valuable asset: their people.",
    primaryButton = { text: "Listen Now", link: "/episode" },
    secondaryButton,
    backgroundImage,
    showLatestEpisode = false,
  } = section;

  return (
    <section className="w-full py-16 md:py-24 lg:py-28 bg-gradient-to-br from-main-dark via-main to-main-light relative overflow-hidden">
      {/* ...existing code... */}
      {/* Pattern overlay for texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNNDAgMzJoNHYxaC00ek0zMiAzN2g0djFoLTR6TTM2IDM5YTEgMSAwIDAgMSAxIDFoNHYxaC00YTEgMSAwIDAgMS0xLTF2LTR6TTMxIDM0aDR2MWgtNHpNMzUgMzJoNHYxaC00ek0yNyAzN2g0djFoLTR6TTMxIDM5YTEgMSAwIDAgMSAxIDFoNHYxaC00YTEgMSAwIDAgMS0xLTF2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-secondary/15 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30"
            >
              <Headphones className="h-4 w-4" />
              Leadership Podcast
            </motion.div>

            {/* Main Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">
                  {subtitle}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href={primaryButton.link}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="h-5 w-5" />
                  {primaryButton.text}
                </Link>
                {secondaryButton && (
                  <Link
                    href={secondaryButton.link}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                  >
                    {secondaryButton.text}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
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
                  height={500}
                  src={backgroundImage || heroImage}
                  width={500}
                  priority={true}
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
