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
    <section id={componentId} className="w-full py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-professional mx-auto">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Listener Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-main">
            {heading}
          </h2>
        </div>
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
    <div className="card-executive p-8 flex flex-col items-center text-center group hover:shadow-executive transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6 relative">
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-professional">
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L18.497 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z"/>
          </svg>
        </div>
      </div>
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium italic">
        &ldquo;{text}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">{name.charAt(0)}</span>
        </div>
        <span className="text-gray-600 font-semibold">{name}</span>
      </div>
    </div>
  );
}
