import React from "react";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Star } from "lucide-react";
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
    <section id={componentId} className="bg-gradient-to-br from-main/95 via-gray-900 to-primary/90 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)] opacity-20"></div>
      <div className="container px-6 md:px-8 max-w-7xl mx-auto relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-white/20 via-secondary/20 to-white/20 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative card-executive rounded-2xl overflow-hidden shadow-executive border border-white/20">
              {section.profileImage?.asset ? (
                <Image
                  src={urlFor(section.profileImage)
                    .width(600)
                    .height(600)
                    .url()}
                  alt={section.profileImage.alt || "Jeffrey Lackey, Sr."}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4 opacity-80">👤</div>
                    <p className="text-xl font-semibold">Professional Photo</p>
                  </div>
                </div>
              )}
            </div>

            {testimonial && (
              <div className="absolute -bottom-8 -right-8 card-executive p-6 shadow-executive max-w-sm border border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-sm mb-4 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="text-xs text-gray-600">
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                  {testimonial.position && testimonial.company && (
                    <div>{testimonial.position} at {testimonial.company}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full border border-white/30 shadow-professional">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-primary">
                  {section.badgeText || "Meet Your Consultant"}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                {section.name || "Jeffrey Lackey, Sr."}
              </h2>
              <p className="text-2xl bg-gradient-to-r from-secondary via-white to-off-white bg-clip-text text-transparent font-semibold">
                {section.title || "Global Strategic Talent Leader"}
              </p>
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg text-gray-200 max-w-none">
                <p className="text-xl leading-relaxed">
                  {section.bio ||
                    "With over 28 years of experience in strategic talent acquisition, Jeffrey stays ahead of technology and innovation trends to provide cutting-edge solutions for businesses worldwide. His thought leadership and deep industry expertise have helped organizations across 70+ countries build world-class teams."}
                </p>
              </div>

              <blockquote className="border-l-4 border-secondary pl-6 py-4 bg-gradient-to-r from-white/5 to-transparent">
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  {section.companyDescription ||
                    "JKL Advisors specializes in connecting exceptional talent with forward-thinking companies, leveraging innovative recruitment strategies and a deep understanding of global markets to drive sustainable growth through people."}
                </p>
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-8 text-center group hover:shadow-executive transition-all duration-300 hover:-translate-y-1 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-200">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors duration-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
