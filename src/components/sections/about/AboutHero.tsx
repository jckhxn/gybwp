"use client";

import React from "react";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { MailIcon, Podcast } from "lucide-react";

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
    subtitle = "Actionable insights for leaders who believe people are their greatest investment. Join us for fireside chats with Fortune 100 CEOs, startup founders, bestselling authors, and industry pioneers.",
    platforms
  } = section;

  // Ensure platforms is always an array
  const safePlatforms = platforms || [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
    },
    {
      name: "BuzzSprout",
      url: "https://www.buzzsprout.com/2057493/share"
    },
    {
      name: "Contact",
      url: "/consulting"
    }
  ];

  return (
    <section id={componentId} className="w-full py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center text-center gap-10">
        <div className="authority-badge inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold shadow-professional">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
              <line x1="8" x2="16" y1="22" y2="22" />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <span className="tracking-wide">{badgeText}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-main leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {safePlatforms.map((platform, index) => (
            <PlatformBadge
              key={index}
              href={platform.url}
              label={platform.name}
              icon={platform.name === "Contact" ? <MailIcon className="h-5 w-5" /> : <Podcast className="h-5 w-5" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformBadge({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group glass-card inline-flex items-center gap-3 px-6 py-3 hover:bg-white/90 text-main hover:text-primary rounded-xl shadow-professional hover:shadow-professional-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon || <Podcast className="h-5 w-5" />}
      </div>
      <span className="tracking-wide">{label}</span>
    </Link>
  );
}
