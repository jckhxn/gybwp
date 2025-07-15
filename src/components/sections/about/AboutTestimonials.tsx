"use client";

import React from "react";
import { getComponentId } from "@/src/lib/sectionId";

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
  
  const {
    heading = "What Listeners Say",
    testimonials
  } = section;

  // Ensure testimonials is always an array
  const safeTestimonials = testimonials || [
    {
      name: "Sarah K.",
      text: "Incredible guests and actionable advice. This podcast is a must-listen for any leader!"
    },
    {
      name: "Mike D.",
      text: "Jeff's approach is authentic and insightful. I always walk away with something new."
    },
    {
      name: "Priya S.",
      text: "The best podcast for people-first leadership. Highly recommended!"
    }
  ];

  return (
    <section id={componentId} className="w-full py-16 md:py-20 bg-gradient-to-r from-primary/5 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {safeTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} name={testimonial.name} text={testimonial.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-3">
        <svg
          className="h-8 w-8 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M17.657 16.657A8 8 0 1 1 12 4v4a4 4 0 1 0 4 4h4a8 8 0 0 1-2.343 4.657z" />
        </svg>
      </div>
      <p className="text-gray-700 text-base mb-2">{text}</p>
      <span className="text-sm text-gray-500 font-medium">{name}</span>
    </div>
  );
}
