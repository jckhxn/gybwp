"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getComponentId } from "@/src/lib/sectionId";
import { MailIcon, Podcast, Sparkles } from "lucide-react";

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
    <section id={componentId} className="relative w-full py-24 lg:py-32 bg-surface-900 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl flex flex-col items-center text-center gap-8">
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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {word === "People" ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-surface-300 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mt-4"
        >
          {safePlatforms.map((platform, index) => (
            <PlatformBadge
              key={index}
              href={platform.url}
              label={platform.name}
              icon={platform.name === "Contact" ? <MailIcon className="h-5 w-5" /> : <Podcast className="h-5 w-5" />}
            />
          ))}
        </motion.div>
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
      className="group inline-flex items-center gap-3 px-5 py-3 bg-white/10 hover:bg-white/20 
                 border border-white/20 hover:border-white/30 rounded-xl
                 transition-all duration-300 hover:-translate-y-1"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
        {icon || <Podcast className="h-5 w-5" />}
      </div>
      <span className="text-sm font-medium text-white">{label}</span>
    </Link>
  );
}
