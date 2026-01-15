import React from "react";
import Image from "next/image";
import { Target, Award, Lightbulb, Sparkles, Quote } from "lucide-react";
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

const ICON_COLORS = ["bg-primary", "bg-secondary", "bg-accent"];

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
    <section id={componentId} className="py-24 lg:py-32 bg-white">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <div className="bg-surface-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-surface-200">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold text-secondary">
                    {section.badgeText || "Our Philosophy"}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 leading-tight">
                  {section.title || "People Are Your Greatest Investment"}
                </h2>
                
                {/* Description */}
                <p className="text-lg text-surface-600 leading-relaxed">
                  {section.description ||
                    "Within the Consulting practice of JKL Advisors, we help CEOs and business leaders grow their business with the biggest and most important investment - People!"}
                </p>
                
                {/* Quote Block */}
                <div className="relative bg-white rounded-2xl p-6 border border-surface-200 shadow-soft">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-secondary bg-white p-1 rounded-full" />
                  <p className="text-surface-600 leading-relaxed italic pl-4">
                    {section.content || "Unlike financial accounting that treats people as expenses, we believe people are a special asset type that anticipates growth. We need to treat our people like an investment to lead our companies to exponential and sustainable growth."}
                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-5">
                {keyBenefits.map((benefit, index) => {
                  const IconComponent =
                    benefit.icon &&
                    ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                      ? ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                      : Target;
                  const iconColor = ICON_COLORS[index % ICON_COLORS.length];

                  return (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary transition-colors duration-200 mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-surface-500 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-surface-200">
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
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
                    <div className="relative text-center z-10">
                      <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lightbulb className="w-10 h-10 text-secondary" />
                      </div>
                      <p className="text-xl font-bold text-surface-800 mb-1">People Investment</p>
                      <p className="text-surface-500">Your Greatest Asset</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
