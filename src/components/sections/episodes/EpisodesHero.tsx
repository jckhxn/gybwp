"use client";

import React from "react";
import { Play } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";

interface EpisodesHeroProps {
  section: {
    _type: "episodesHero";
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    showStats?: boolean;
    totalEpisodes?: number;
    totalSeasons?: number;
  };
  actualTotalEpisodes?: number;
  actualTotalSeasons?: number;
}

export function EpisodesHero({
  section,
  actualTotalEpisodes = 0,
  actualTotalSeasons = 0,
}: EpisodesHeroProps) {
  const componentId = getComponentId(section, "episodes-hero");

  const {
    title = "Every Conversation, One Place",
    description = "Real talk with operators, founders, and leaders. New episode every Tuesday.",
    showStats = true,
    totalEpisodes,
    totalSeasons,
  } = section;

  const displayTotalEpisodes = actualTotalEpisodes || totalEpisodes || 0;
  const displayTotalSeasons = actualTotalSeasons || totalSeasons || 0;

  return (
    <section id={componentId} className="bg-stone-900 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left: headline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Episode Library</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {title}
            </h1>
            <p className="text-stone-400 mt-2 text-base max-w-xl">
              {description}
            </p>
          </div>

          {/* Right: stats */}
          {showStats && (
            <div className="flex items-center gap-6 flex-shrink-0">
              {displayTotalEpisodes > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{displayTotalEpisodes}</p>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">Episodes</p>
                </div>
              )}
              {displayTotalSeasons > 0 && (
                <>
                  <div className="w-px h-10 bg-stone-700" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{displayTotalSeasons}</p>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">Seasons</p>
                  </div>
                </>
              )}
              <div className="w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">Tue</p>
                <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mt-0.5">New Episodes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
