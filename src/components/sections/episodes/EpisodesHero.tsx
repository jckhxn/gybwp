"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Calendar, LayoutGrid, Users } from "lucide-react";
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
  // Dynamic stats from data
  actualTotalEpisodes?: number;
  actualTotalSeasons?: number;
}

export function EpisodesHero({ 
  section, 
  actualTotalEpisodes = 0, 
  actualTotalSeasons = 0 
}: EpisodesHeroProps) {
  const componentId = getComponentId(section, "episodes-hero");
  
  const {
    badgeText = "Episode Library",
    title = "Browse Our Episodes",
    subtitle,
    description = "Explore our complete library of business insights, leadership strategies, and growth tactics",
    showStats = true,
    totalEpisodes,
    totalSeasons,
  } = section;

  // Use actual data if available, otherwise fall back to configured values
  const displayTotalEpisodes = actualTotalEpisodes || totalEpisodes || 0;
  const displayTotalSeasons = actualTotalSeasons || totalSeasons || 0;

  return (
    <section 
      id={componentId} 
      className="relative overflow-hidden bg-gradient-to-b from-gray-50/70 to-white py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30">
              <Play className="h-4 w-4" />
              {badgeText}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl md:text-2xl text-gray-600 mb-4 font-medium"
            >
              {subtitle}
            </motion.h2>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{displayTotalEpisodes} Total Episodes</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>{displayTotalSeasons} Seasons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Expert Guests</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}