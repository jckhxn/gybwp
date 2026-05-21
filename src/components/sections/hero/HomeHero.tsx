"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Headphones, Quote } from "lucide-react";
import heroImage from "@/public/images/main-page-hero.webp";
import { HomeHeroSection } from "@/types";
import { SmartButton } from "@/src/components/ui/SmartButton";
import {
  getImageUrlClient,
  getHeroImageUrl,
} from "@/src/lib/imageUrlClient";
import { getComponentId } from "@/src/lib/sectionId";
import { FeaturedGuests } from "@/src/components/sections/shared/FeaturedGuests";

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
    primaryButton = { text: "Start Listening", link: "/episodes" },
    secondaryButton = { text: "Browse all episodes", link: "/episodes" },
    platformsHeading = "Listen free on:",
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
    <>
    <section
      id={componentId}
      className="relative w-full bg-amber-50 overflow-hidden"
    >
      {/* Warm background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Top bar: show label + platforms ── */}
        <div className="flex items-center justify-between py-4 border-b border-amber-200/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-amber-700 tracking-wide">{badgeText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-stone-600 font-medium">{platformsHeading}</span>
            {safePlatforms.map((platform, i) => (
              <Link
                key={i}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                title={platform.name}
                className="w-7 h-7 bg-white rounded-lg border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all"
              >
                <Image
                  src={platform.logoImage ? getImageUrlClient(platform.logoImage, { width: 48, height: 48, quality: 100 }) : "/social-logos/default.png"}
                  alt={platform.name}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Main hero ── */}
        <div className="grid lg:grid-cols-[1fr_460px] gap-8 lg:gap-12 items-center py-8 lg:py-12">

          {/* Left: Content */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">

            {/* Personal intro */}
            <div>
              <p className="text-sm font-semibold text-amber-700 mb-3 tracking-wide uppercase">
                {subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-stone-900 leading-[1.1] tracking-tight">
                {title}
              </h1>
            </div>

            {/* Personal note from host */}
            <div className="relative pl-5 border-l-4 border-amber-300">
              <p className="text-lg text-stone-600 leading-relaxed">
                {description}
              </p>
              <p className="text-sm text-stone-600 mt-2 italic">
                — {safeHostBadge.name}, {safeHostBadge.title}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <SmartButton
                data={primaryButton}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-stone-900 text-white font-semibold rounded-2xl
                           transition-all duration-200 hover:bg-stone-800 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 fill-white text-white" />
                </div>
                <span>{primaryButton.text}</span>
              </SmartButton>

              {secondaryButton && (
                <SmartButton
                  data={secondaryButton}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-stone-700 font-semibold rounded-2xl
                             border-2 border-stone-200 bg-white/80 hover:bg-white hover:border-stone-300 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  <Headphones className="w-4 h-4 text-stone-500" />
                  <span>{secondaryButton.text}</span>
                </SmartButton>
              )}
            </div>

            {/* Social proof — listener quote */}
            <div className="bg-white/70 rounded-2xl border border-amber-100 p-4 flex gap-3 items-start max-w-md shadow-sm">
              <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;This show changed how I think about hiring. Jeff asks the questions I actually want answered.&rdquo;
                </p>
                <p className="text-xs text-stone-600 font-semibold mt-1.5">— Apple Podcasts listener · ★★★★★</p>
              </div>
            </div>

            {/* Platform links (mobile) */}
            <div className="sm:hidden">
              <p className="text-xs text-stone-600 mb-2.5 font-medium uppercase tracking-wider">{platformsHeading}</p>
              <div className="flex flex-wrap gap-2">
                {safePlatforms.map((platform, i) => (
                  <Link
                    key={i}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50 shadow-sm transition-all"
                  >
                    <Image
                      src={platform.logoImage ? getImageUrlClient(platform.logoImage, { width: 32, height: 32, quality: 100 }) : "/social-logos/default.png"}
                      alt={platform.name}
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    {platform.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Host portrait */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Warm blob behind photo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[380px] bg-gradient-to-br from-amber-200 to-orange-100 rounded-full opacity-60 blur-sm" />
            </div>

            {/* Portrait */}
            <div className="relative z-10 w-full max-w-[400px]">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] lg:h-[520px] relative">
                <Image
                  alt={safeHostBadge.name ?? "Host"}
                  className="object-cover w-full h-full"
                  fill
                  src={(backgroundImage ? getHeroImageUrl(backgroundImage, 900) : null) ?? heroImage}
                  sizes="(max-width: 1024px) 80vw, 460px"
                  priority
                  quality={95}
                />
                {/* Warm gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent" />
              </div>

              {/* Host name card — overlapping bottom-left */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl px-4 py-3 shadow-xl border border-stone-100">
                <p className="text-[10px] text-amber-700 uppercase tracking-widest font-bold mb-0.5">{safeHostBadge.label}</p>
                <p className="text-sm font-bold text-stone-900 leading-tight">{safeHostBadge.name}</p>
                <p className="text-xs text-stone-700">{safeHostBadge.title}</p>
              </div>

              {/* Episode count sticker — top-right */}
              <div
                className="absolute -top-3 -right-3 z-20 bg-amber-500 text-white rounded-full w-[72px] h-[72px] flex items-center justify-center text-center shadow-lg border-4 border-amber-50"
                style={{ transform: "rotate(-8deg)" }}
              >
                <span className="text-[10px] font-extrabold leading-tight px-1">
                  New ep<br />Tuesdays!
                </span>
              </div>

              {/* Floating review card — upper left */}
              <div className="absolute -left-8 top-8 z-20 bg-white rounded-2xl shadow-lg border border-stone-100 px-3.5 py-2.5 max-w-[160px] hidden lg:block">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-amber-400 rounded-sm" />
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-stone-700 leading-tight">4.9 · 612 reviews</p>
                <p className="text-[10px] text-stone-600 mt-0.5">Apple Podcasts</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: "What listeners are learning" strip ── */}
        <div className="border-t border-amber-200/60 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-600 text-center mb-5">
            Topics covered in recent episodes
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Hiring for culture", "Scaling remote teams", "Founder-led sales",
              "Retaining top talent", "Leadership transitions", "Building trust fast",
              "Performance management", "Team accountability",
            ].map((tag) => (
              <Link
                key={tag}
                href="/episodes"
                className="px-3.5 py-1.5 bg-white text-xs font-semibold text-stone-600 rounded-full border border-stone-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
    <FeaturedGuests />
    </>
  );
}
