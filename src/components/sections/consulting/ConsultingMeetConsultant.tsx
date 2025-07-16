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
    <section id={componentId} className="bg-gray-900 py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              {section.profileImage?.asset ? (
                <Image
                  src={urlFor(section.profileImage)
                    .width(600)
                    .height(600)
                    .url()}
                  alt={section.profileImage.alt || "Jeffrey Lackey, Sr."}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">👤</div>
                    <p>Professional Photo</p>
                  </div>
                </div>
              )}
            </div>

            {testimonial && (
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl max-w-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">{testimonial.author}</span>
                  {testimonial.position && (
                    <span>, {testimonial.position}</span>
                  )}
                  {testimonial.company && (
                    <span> at {testimonial.company}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 px-4 py-2"
              >
                {section.badgeText || "Meet Your Consultant"}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {section.name || "Jeffrey Lackey, Sr."}
              </h2>
              <p className="text-xl text-blue-400 font-medium">
                {section.title || "Global Strategic Talent Leader"}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                {section.bio ||
                  "With over 28 years of experience in strategic talent acquisition, Jeffrey stays ahead of technology and innovation trends to provide cutting-edge solutions for businesses worldwide. His thought leadership and deep industry expertise have helped organizations across 70+ countries build world-class teams."}
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                {section.companyDescription ||
                  "JKL Advisors specializes in connecting exceptional talent with forward-thinking companies, leveraging innovative recruitment strategies and a deep understanding of global markets to drive sustainable growth through people."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
