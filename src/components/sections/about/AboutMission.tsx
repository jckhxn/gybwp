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
    <section id={componentId} className="w-full py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="card-executive p-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-professional">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-main">
                {heading}
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              {text}
            </p>
            <div className="space-y-4">
              {safeBullets.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-3 group-hover:scale-125 transition-transform duration-200"></div>
                  <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-colors duration-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative">
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="card-executive rounded-2xl shadow-professional border-0 w-full max-w-md group-hover:shadow-executive transition-all duration-300"
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
