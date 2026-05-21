"use client";

import React from "react";
import { getComponentId } from "@/src/lib/sectionId";
import { Quote } from "lucide-react";

interface AboutTestimonialsProps {
  section: {
    _type: "aboutTestimonials";
    _key?: string;
    sectionId?: string;
    heading?: string;
    testimonials?: Array<{
      name: string;
      text: string;
    }>;
  };
}

export function AboutTestimonials({ section }: AboutTestimonialsProps) {
  const componentId = getComponentId(section, "about-testimonials");

  const { heading = "What Listeners Say", testimonials } = section;

  const safeTestimonials = testimonials || [
    {
      name: "Sarah K.",
      text: "Incredible guests and actionable advice. This podcast is a must-listen for any leader!",
    },
    {
      name: "Mike D.",
      text: "Jeff's approach is authentic and insightful. I always walk away with something new.",
    },
    {
      name: "Priya S.",
      text: "The best podcast for people-first leadership. Highly recommended!",
    },
  ];

  return (
    <section id={componentId} className="w-full py-16 md:py-24 bg-stone-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Listener Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{heading}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {safeTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-stone-800 border border-stone-700 rounded-2xl p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-amber-400 rounded-sm" />
                ))}
              </div>
              <Quote className="w-7 h-7 text-amber-500/40 mb-3" />
              <blockquote className="text-stone-300 text-base leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-700">
                <div className="w-9 h-9 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <span className="text-amber-400 font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                </div>
                <span className="text-white font-semibold text-sm">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
