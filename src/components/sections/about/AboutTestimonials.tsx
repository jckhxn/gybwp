"use client";

import React from "react";
import { motion } from "framer-motion";
import { getComponentId } from "@/src/lib/sectionId";
import { Quote, Star } from "lucide-react";

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
    <section id={componentId} className="w-full py-20 md:py-28 bg-surface-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mx-auto">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-white/90">Listener Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {heading}
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {safeTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard name={testimonial.name} text={testimonial.text} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col h-full
                    hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
      <Quote className="w-10 h-10 text-primary/50 mb-4" />
      
      <blockquote className="text-surface-200 text-lg leading-relaxed mb-6 flex-grow">
        &ldquo;{text}&rdquo;
      </blockquote>
      
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">{name.charAt(0)}</span>
        </div>
        <span className="text-white font-medium">{name}</span>
      </div>
    </div>
  );
}
