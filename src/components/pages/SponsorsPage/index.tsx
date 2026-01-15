// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/src/components/shared";
import { SponsorsList } from "@/src/components/features/sponsors";
import ContactModal from "@/src/components/features/ContactModal";
import { Heart, Star, Trophy, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// copy
// import { SPONSORS, PARTNERS, SPONSORS_INFO } from "./static-data";

// sanity
import { client } from "@/src/lib/sanity-utils";
import { ALL_SPONSORS_QUERY } from "@/src/lib/queries";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const SponsorsPageComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(ALL_SPONSORS_QUERY)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-surface-400">
              Loading our amazing sponsors...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-surface-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <p className="text-red-400">
              Unable to load sponsors. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-surface-900 py-20 md:py-28 lg:py-32">
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

          <div className="relative container mx-auto px-6 z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/30">
                  <Heart className="h-4 w-4" />
                  Our Partners
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Our Amazing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Sponsors
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-surface-400 mb-10 leading-relaxed"
              >
                We&apos;re grateful to work with incredible organizations that
                make our podcast possible. These partners share our vision and
                support our mission.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-surface-200 text-sm font-medium">Premium Partners</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                  <Star className="h-4 w-4 text-secondary" />
                  <span className="text-surface-200 text-sm font-medium">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-surface-200 text-sm font-medium">Trusted Brands</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="bg-surface-50 py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                  Meet Our Sponsors
                </h2>
                <p className="text-lg text-surface-600 max-w-2xl mx-auto">
                  Click on any sponsor to learn more about their story and what
                  they offer
                </p>
              </motion.div>

              {/* Sponsors Grid */}
              <div className="mb-20">
                <SponsorsList
                  sponsors={data}
                  layout="grid"
                  size="large"
                  title=""
                  noContainer={true}
                />
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-surface-900 rounded-3xl p-8 md:p-12 text-center"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 gradient-mesh opacity-20" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/30 mb-6">
                    <Sparkles className="h-4 w-4" />
                    Partner With Us
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Interested in Sponsoring?
                  </h3>
                  <p className="text-surface-400 mb-8 max-w-2xl mx-auto text-lg">
                    Join our family of amazing sponsors and reach our engaged
                    audience. We&apos;d love to explore partnership opportunities
                    with your brand.
                  </p>
                  <ContactModal
                    trigger={
                      <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-glow hover:shadow-glow-lg">
                        <Heart className="h-5 w-5" />
                        Get in Touch
                      </button>
                    }
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SponsorsPageComponent;
