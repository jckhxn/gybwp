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
      className="relative overflow-hidden bg-surface-900 py-20 md:py-28 lg:py-32"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/30">
              <Play className="h-4 w-4" />
              {badgeText}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl md:text-2xl text-surface-300 mb-4 font-medium"
            >
              {subtitle}
            </motion.h2>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-surface-400 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-surface-200 text-sm font-medium">{displayTotalEpisodes} Episodes</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                <LayoutGrid className="h-4 w-4 text-secondary" />
                <span className="text-surface-200 text-sm font-medium">{displayTotalSeasons} Seasons</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-surface-200 text-sm font-medium">Expert Guests</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}