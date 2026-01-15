import React from "react";
import Image from "next/image";
import { Star, Quote, Sparkles, User } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";
import { urlFor } from "@/src/lib/utils";

interface ConsultingMeetConsultantProps {
  section: {
    _type: string;
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    name?: string;
    title?: string;
    bio?: string;
    companyDescription?: string;
    stats?: Array<{
      number: string;
      label: string;
    }>;
    profileImage?: {
      asset?: {
        _ref: string;
      };
      alt?: string;
    };
    testimonial?: {
      text?: string;
      author?: string;
      position?: string;
      company?: string;
      rating?: number;
    };
  };
}

const FALLBACK_STATS = [
  { number: "1M+", label: "Professionals Hired" },
  { number: "28+", label: "Years Experience" },
];

export function ConsultingMeetConsultant({
  section,
}: ConsultingMeetConsultantProps) {
  const componentId = getComponentId(section, "meet-consultant");
  const stats = section.stats || FALLBACK_STATS;

  const defaultTestimonial = {
    text: "Jeffrey's strategic approach to talent acquisition has transformed our organization. His deep understanding of global markets and innovative recruitment strategies have been invaluable.",
    author: "Sarah Chen",
    position: "CEO",
    company: "TechVision Global",
    rating: 5,
  };

  const testimonial = section.testimonial || defaultTestimonial;

  return (
    <section id={componentId} className="bg-surface-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative rounded-3xl overflow-hidden shadow-glow border border-surface-700/50">
              {section.profileImage?.asset ? (
                <Image
                  src={urlFor(section.profileImage)
                    .width(600)
                    .height(600)
                    .url()}
                  alt={section.profileImage.alt || "Jeffrey Lackey, Sr."}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-surface-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-surface-400" />
                    </div>
                    <p className="text-xl font-semibold text-white">Professional Photo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Testimonial Card */}
            {testimonial && (
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-white rounded-2xl p-5 shadow-elevated max-w-xs border border-surface-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="text-surface-600 text-sm mb-3 leading-relaxed line-clamp-3">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="text-xs">
                  <div className="font-semibold text-surface-900">{testimonial.author}</div>
                  {testimonial.position && testimonial.company && (
                    <div className="text-surface-500">{testimonial.position} at {testimonial.company}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {section.badgeText || "Meet Your Consultant"}
                </span>
              </div>
              
              {/* Name */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {section.name || "Jeffrey Lackey, Sr."}
              </h2>
              
              {/* Title */}
              <p className="text-xl md:text-2xl text-primary font-semibold">
                {section.title || "Global Strategic Talent Leader"}
              </p>
            </div>

            <div className="space-y-6">
              {/* Bio */}
              <p className="text-lg text-surface-300 leading-relaxed">
                {section.bio ||
                  "With over 28 years of experience in strategic talent acquisition, Jeffrey stays ahead of technology and innovation trends to provide cutting-edge solutions for businesses worldwide. His thought leadership and deep industry expertise have helped organizations across 70+ countries build world-class teams."}
              </p>

              {/* Company Quote */}
              <div className="relative bg-surface-800/50 backdrop-blur-sm rounded-2xl p-5 border border-surface-700/50">
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-secondary bg-surface-900 p-1 rounded-full" />
                <p className="text-surface-400 leading-relaxed italic pl-4">
                  {section.companyDescription ||
                    "JKL Advisors specializes in connecting exceptional talent with forward-thinking companies, leveraging innovative recruitment strategies and a deep understanding of global markets to drive sustainable growth through people."}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-surface-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:bg-surface-800/70 hover:border-primary/30 border border-surface-700/50 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors duration-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-surface-400 font-medium group-hover:text-surface-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
