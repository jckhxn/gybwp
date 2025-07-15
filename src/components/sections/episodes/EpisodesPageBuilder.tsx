"use client";

import React, { useState } from "react";
import { EpisodesHero } from "./EpisodesHero";
import { EpisodesDirectory } from "./EpisodesDirectory";
import { getComponentId } from "@/src/lib/sectionId";

interface EpisodesPageBuilderProps {
  section: {
    _type: "episodesPageBuilder";
    _key?: string;
    sectionId?: string;
    heroSection?: {
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
    directorySection?: {
      _type: "episodesDirectory";
      _key?: string;
      sectionId?: string;
      enableSearch?: boolean;
      enableFilters?: boolean;
      enableViewModes?: boolean;
      defaultSort?: "newest" | "oldest" | "episode";
      itemsPerPageGrid?: number;
      itemsPerPageList?: number;
      showSeasonFilter?: boolean;
    };
  };
}

export function EpisodesPageBuilder({ section }: EpisodesPageBuilderProps) {
  const componentId = getComponentId(section, "episodes-page-builder");
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [totalSeasons, setTotalSeasons] = useState(0);

  const {
    heroSection = {
      _type: "episodesHero",
      badgeText: "Episode Library",
      title: "Browse Our Episodes",
      description: "Explore our complete library of business insights, leadership strategies, and growth tactics",
      showStats: true,
    },
    directorySection = {
      _type: "episodesDirectory",
      enableSearch: true,
      enableFilters: true,
      enableViewModes: true,
      defaultSort: "newest" as const,
      itemsPerPageGrid: 12,
      itemsPerPageList: 8,
      showSeasonFilter: true,
    },
  } = section;

  const handleStatsUpdate = (episodes: number, seasons: number) => {
    setTotalEpisodes(episodes);
    setTotalSeasons(seasons);
  };

  return (
    <div id={componentId} className="min-h-screen bg-gradient-to-b from-gray-50/70 to-white">
      <EpisodesHero 
        section={heroSection}
        actualTotalEpisodes={totalEpisodes}
        actualTotalSeasons={totalSeasons}
      />
      <EpisodesDirectory 
        section={directorySection}
        onStatsUpdate={handleStatsUpdate}
      />
    </div>
  );
}