"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getComponentId } from "@/src/lib/sectionId";
import { Target, CheckCircle2 } from "lucide-react";
import heroImage from "@/public/images/blueprint.webp";

interface AboutMissionProps {
  section: {
    _type: "aboutMission";
    _key?: string;
    sectionId?: string;
    heading?: string;
    text?: string;
    bullets?: string[];
    image?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
  };
}

export function AboutMission({ section }: AboutMissionProps) {
  const componentId = getComponentId(section, "about-mission");
  
  const {
    heading = "Why This Podcast?",
    text = "We believe that people are not just a company's most important asset—they're an investment primed for growth. Our mission is to help leaders maximize their Return on People through practical, real-world conversations.",
    bullets,
    image
  } = section;

  const safeBullets = bullets || [
    "Interviews with top CEOs, founders, and thought leaders",
    "Actionable strategies for leadership, talent, and growth",
    "Stories that inspire and challenge conventional thinking"
  ];

  const imageUrl = image?.asset?.url || heroImage;
  const imageAlt = image?.alt || "Podcast Blueprint";

  return (
    <section id={componentId} className="w-full py-20 md:py-28 bg-surface-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-medium border border-surface-100 p-8 md:p-12 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900">
                {heading}
              </h2>
            </div>
            <p className="text-lg text-surface-600 leading-relaxed">
              {text}
            </p>
            <div className="space-y-4">
              {safeBullets.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-surface-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl opacity-40"></div>
            <div className="relative">
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="rounded-2xl shadow-elevated w-full object-cover"
                width={500}
                height={400}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
