import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Target, Award, Globe, Building, Lightbulb } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";

interface ConsultingServicesProps {
  section: {
    _type: string;
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    description?: string;
    services?: Array<{
      icon?: string;
      title: string;
      description: string;
      features?: string[];
    }>;
  };
}

const ICON_MAP = {
  users: Users,
  globe: Globe,
  trendingUp: TrendingUp,
  building: Building,
  target: Target,
  award: Award,
  lightbulb: Lightbulb,
} as const;

const FALLBACK_SERVICES = [
  {
    icon: "users",
    title: "Talent Acquisition & Management",
    description: "End-to-end talent solutions from attraction to retention",
    features: [
      "Strategic talent planning",
      "Executive search & coaching",
      "Vendor assessment & selection",
      "Performance optimization",
    ],
  },
  {
    icon: "globe",
    title: "Global Experience",
    description: "Proven expertise across 70+ countries and diverse industries",
    features: [
      "Healthcare & pharmaceuticals",
      "Insurance & financial services",
      "Aerospace & defense",
      "Retail & communications",
    ],
  },
  {
    icon: "trendingUp",
    title: "Functional Excellence",
    description: "28+ years of proven results in talent transformation",
    features: [
      "High-volume recruitment (200k+ hires)",
      "AI/ML & predictive analytics",
      "Diversity, equity & inclusion",
      "Performance management",
    ],
  },
  {
    icon: "building",
    title: "Business Support & Planning",
    description: "Strategic assessment and operational excellence",
    features: [
      "Performance management",
      "Strategic assessment",
      "Recruitment marketing",
      "Interim leadership roles",
    ],
  },
];

export function ConsultingServices({ section }: ConsultingServicesProps) {
  const componentId = getComponentId(section, "consulting-services");
  const services = section.services || FALLBACK_SERVICES;

  return (
    <section id={componentId} className="py-20 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {section.badgeText || "Our Services"}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {section.title || "Comprehensive Talent Solutions"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {section.description || 
              "From strategic planning to execution, we provide end-to-end consulting services that drive sustainable business growth through people."
            }
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = service.icon && ICON_MAP[service.icon as keyof typeof ICON_MAP] 
              ? ICON_MAP[service.icon as keyof typeof ICON_MAP]
              : Users;
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-blue-600 mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
