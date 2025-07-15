"use client";

import React from "react";
import Image from "next/image";
import { getComponentId } from "@/src/lib/sectionId";
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

  // Ensure bullets is always an array
  const safeBullets = bullets || [
    "Interviews with top CEOs, founders, and thought leaders",
    "Actionable strategies for leadership, talent, and growth",
    "Stories that inspire and challenge conventional thinking"
  ];

  const imageUrl = image?.asset?.url || heroImage;
  const imageAlt = image?.alt || "Podcast Blueprint";

  return (
    <section id={componentId} className="w-full py-16 md:py-20 bg-gradient-to-r from-secondary/10 via-white to-primary/10">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {text}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {safeBullets.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md"
            width={400}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
