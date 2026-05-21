"use client";

import React from "react";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { MailIcon, Podcast, Headphones } from "lucide-react";

interface AboutHeroProps {
  section: {
    _type: "aboutHero";
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    subtitle?: string;
    platforms?: Array<{
      name: string;
      url: string;
      icon?: string;
    }>;
  };
}

export function AboutHero({ section }: AboutHeroProps) {
  const componentId = getComponentId(section, "about-hero");

  const {
    badgeText = "About the Podcast",
    title = "Growing Your Business With People",
    subtitle = "Actionable insights for leaders who believe people are their greatest investment. Real conversations with operators, founders, and executives who've built the teams you wish you had.",
    platforms,
  } = section;

  const safePlatforms = platforms || [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
    },
    {
      name: "BuzzSprout",
      url: "https://www.buzzsprout.com/2057493/share",
    },
    {
      name: "Contact",
      url: "/consulting",
    },
  ];

  return (
    <section id={componentId} className="relative w-full bg-amber-50 border-b border-stone-200 overflow-hidden">
      {/* Warm background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-orange-100/30 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full shadow-sm">
          <Headphones className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-700 uppercase tracking-widest">
            {badgeText}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1]">
          {title.split(" ").map((word, i) =>
            word === "People" ? (
              <span key={i} className="text-amber-600">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        <p className="text-lg md:text-xl text-stone-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {safePlatforms.map((platform, index) => (
            <Link
              key={index}
              href={platform.url}
              target={platform.url.startsWith("http") ? "_blank" : undefined}
              rel={platform.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 shadow-sm hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all"
            >
              {platform.name === "Contact" ? (
                <MailIcon className="w-4 h-4" />
              ) : (
                <Podcast className="w-4 h-4" />
              )}
              {platform.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
