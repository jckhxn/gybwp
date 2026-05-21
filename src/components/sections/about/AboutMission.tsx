"use client";

import React from "react";
import Image from "next/image";
import { getComponentId } from "@/src/lib/sectionId";
import { CheckCircle2 } from "lucide-react";
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
    text = "We believe that people are not just a company's most important asset — they're an investment primed for growth. Our mission is to help leaders maximize their Return on People through practical, real-world conversations.",
    bullets,
    image,
  } = section;

  const safeBullets = bullets || [
    "Conversations with operators, founders, and thought leaders",
    "Actionable strategies for leadership, talent, and growth",
    "Stories that challenge conventional thinking — every Tuesday",
  ];

  const imageUrl = image?.asset?.url || heroImage;
  const imageAlt = image?.alt || "Podcast Blueprint";

  return (
    <section id={componentId} className="w-full py-16 md:py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8 md:p-12 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text side */}
          <div className="space-y-7">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
                {heading}
              </h2>
            </div>
            <p className="text-lg text-stone-600 leading-relaxed">
              {text}
            </p>
            <div className="space-y-3.5">
              {safeBullets.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-stone-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/40 via-orange-100/20 to-amber-200/40 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-100">
              <Image
                src={imageUrl}
                alt={imageAlt}
                className="w-full object-cover"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
