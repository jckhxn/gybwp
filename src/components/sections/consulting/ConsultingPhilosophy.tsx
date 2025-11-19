import React from "react";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Target, Award, Lightbulb } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";
import { urlFor } from "@/src/lib/utils";

interface ConsultingPhilosophyProps {
  section: {
    _type: string;
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    description?: string;
    content?: string;
    keyBenefits?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
    philosophyImage?: {
      asset?: {
        _ref: string;
      };
      alt?: string;
    };
  };
}

const ICON_MAP = {
  target: Target,
  award: Award,
  lightbulb: Lightbulb,
} as const;

const FALLBACK_BENEFITS = [
  {
    icon: "target",
    title: "Maximizing Organizational Performance",
    description: "Strategic talent alignment with business objectives",
  },
  {
    icon: "award",
    title: "Leadership and Talent Development",
    description: "Building capability and succession planning",
  },
  {
    icon: "lightbulb",
    title: "Creating High-Performance Cultures",
    description: "Fostering innovation and sustainable growth",
  },
];

export function ConsultingPhilosophy({ section }: ConsultingPhilosophyProps) {
  const componentId = getComponentId(section, "consulting-philosophy");
  const keyBenefits = section.keyBenefits || FALLBACK_BENEFITS;

  return (
    <section id={componentId} className="py-24 lg:py-32 bg-gray-50">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <div className="card-executive p-12 grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 rounded-full border border-secondary/20 shadow-professional">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-secondary">
                  {section.badgeText || "Our Philosophy"}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-main leading-tight">
                {section.title || "People Are Your Greatest Investment"}
              </h2>
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  {section.description ||
                    "Within the Consulting practice of JKL Advisors, we help CEOs and business leaders grow their business with the biggest and most important investment - People!"}
                </p>
                <blockquote className="border-l-4 border-secondary pl-6 py-4 bg-secondary/5">
                  <p className="text-lg text-gray-600 leading-relaxed italic">
                    {section.content || "Unlike financial accounting that treats people as expenses, we believe people are a special asset type that anticipates growth. We need to treat our people like an investment to lead our companies to exponential and sustainable growth."}
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="space-y-8">
              {keyBenefits.map((benefit, index) => {
                const IconComponent =
                  benefit.icon &&
                  ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                    ? ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                    : Target;

                return (
                  <div key={index} className="flex gap-5 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-executive border border-white/20">
              {section.philosophyImage?.asset ? (
                <Image
                  src={urlFor(section.philosophyImage)
                    .width(600)
                    .height(400)
                    .url()}
                  alt={
                    section.philosophyImage.alt ||
                    "Business transformation through people"
                  }
                  width={600}
                  height={400}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-96 bg-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/15"></div>
                  <div className="relative text-center z-10">
                    <div className="text-8xl mb-6 opacity-80">💡</div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">People Investment</p>
                    <p className="text-lg text-gray-600">Your Greatest Asset</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
