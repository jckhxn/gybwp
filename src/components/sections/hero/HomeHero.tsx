"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Star } from "lucide-react";
import heroImage from "@/public/images/main-page-hero.webp";
import { HomeHeroSection } from "@/types";
import { SmartButton } from "@/src/components/ui/SmartButton";
import {
  getImageUrlClient,
  getHeroImageUrl,
} from "@/src/lib/imageUrlClient";
import { getComponentId } from "@/src/lib/sectionId";

interface HomeHeroProps {
  section: HomeHeroSection;
}

export function HomeHero({ section }: HomeHeroProps) {
  const componentId = getComponentId(section, "home-hero");

  const {
    title = "I talk to the people who built the teams you wish you had.",
    subtitle = "Growing Your Business With People",
    description = "One conversation, every Tuesday. No script, no slides. Just operators sharing what actually worked — and what didn't.",
    badgeText = "New episode every Tuesday",
    primaryButton = { text: "Start with Episode 1", link: "/episodes" },
    secondaryButton = { text: "Browse all episodes", link: "/episodes" },
    platformsHeading = "Listen on:",
    platforms,
    hostBadge,
    backgroundImage,
  } = section;

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
      className="relative w-full bg-amber-50 overflow-hidden"
    >
      {/* Subtle warm texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Host greeting */}
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
              {badgeText}
            </p>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-stone-900 leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <SmartButton
                data={primaryButton}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-white font-semibold rounded-xl
                           transition-all duration-200 hover:bg-stone-800 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{primaryButton.text}</span>
              </SmartButton>

              {secondaryButton && (
                <SmartButton
                  data={secondaryButton}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-stone-900 font-semibold rounded-xl
                             border-2 border-stone-300 transition-all duration-200 hover:border-stone-400 hover:bg-stone-100 hover:-translate-y-0.5"
                >
                  <span>{secondaryButton.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </SmartButton>
              )}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-stone-500 font-medium">
                4.9 · 612 reviews on Apple Podcasts
              </span>
            </div>

            {/* Platforms */}
            {safePlatforms.length > 0 && (
              <div className="pt-2">
                <p className="text-xs text-stone-400 mb-3 uppercase tracking-wider font-semibold">
                  {platformsHeading}
                </p>
                <div className="flex flex-wrap gap-2">
                  {safePlatforms.map((platform, index) => (
                    <Link
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-stone-50
                                 border border-stone-200 hover:border-stone-300 rounded-xl
                                 transition-all duration-200 shadow-sm"
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
                        width={18}
                        height={18}
                        className="w-4.5 h-4.5 object-contain"
                      />
                      <span className="text-xs font-semibold text-stone-600 group-hover:text-stone-900 transition-colors">
                        {platform.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Host portrait */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Warm background circle */}
            <div className="absolute inset-0 -top-8 -bottom-8 flex items-center justify-center">
              <div className="w-[420px] h-[420px] bg-amber-100 rounded-full opacity-70" />
            </div>

            {/* Portrait frame */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-2 border-stone-200/60 max-w-sm w-full aspect-square lg:aspect-auto lg:h-[480px]">
              <Image
                alt={safeHostBadge.name ?? "Host"}
                className="object-cover w-full h-full"
                fill
                src={
                  (backgroundImage
                    ? getHeroImageUrl(backgroundImage, 900)
                    : null) ?? heroImage
                }
                sizes="(max-width: 1024px) 80vw, 420px"
                priority
                quality={95}
              />
              {/* Subtle bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
            </div>

            {/* Host name badge — bottom-left of image */}
            <div className="absolute bottom-4 -left-4 z-20 bg-white rounded-xl px-4 py-3 shadow-lg border border-stone-100">
              <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-0.5">
                {safeHostBadge.label}
              </p>
              <p className="text-sm font-bold text-stone-900 leading-tight">
                {safeHostBadge.name}
              </p>
              <p className="text-xs text-stone-500">
                {safeHostBadge.title}
              </p>
            </div>

            {/* "New episode" sticker — top-right */}
            <div
              className="absolute -top-4 -right-2 z-20 bg-amber-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-center shadow-lg"
              style={{ transform: "rotate(-6deg)" }}
            >
              <span className="text-[11px] font-bold leading-tight px-2">
                New ep<br />every Tue!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
