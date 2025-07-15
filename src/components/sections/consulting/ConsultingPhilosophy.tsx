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
    <section id={componentId} className="py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                {section.badgeText || "Our Philosophy"}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {section.title || "People Are Your Greatest Investment"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {section.description ||
                  "Within the Consulting practice of JKL Advisors, we help CEOs and business leaders grow their business with the biggest and most important investment - People!"}
              </p>
              {section.content && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              )}
              {!section.content && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  Unlike financial accounting that treats people as expenses, we
                  believe people are a special asset type that anticipates
                  growth. We need to treat our people like an investment to lead
                  our companies to exponential and sustainable growth.
                </p>
              )}
            </div>

            <div className="space-y-6">
              {keyBenefits.map((benefit, index) => {
                const IconComponent =
                  benefit.icon &&
                  ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                    ? ICON_MAP[benefit.icon as keyof typeof ICON_MAP]
                    : Target;

                return (
                  <div key={index} className="flex gap-4">
                    <div className="text-blue-600 mt-1">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
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
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-orange-600 text-center">
                    <div className="text-6xl mb-4">💡</div>
                    <p className="text-xl font-semibold">People Investment</p>
                    <p className="text-sm">Your Greatest Asset</p>
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
