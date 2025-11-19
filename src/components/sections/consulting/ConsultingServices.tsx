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
    <section id={componentId} className="py-24 lg:py-32 bg-gradient-to-br from-off-white via-white to-gray-50/30">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 shadow-professional">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary">
              {section.badgeText || "Our Services"}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-main to-main-light bg-clip-text text-transparent leading-tight">
            {section.title || "Comprehensive Talent Solutions"}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
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
                className="card-executive p-8 group hover:shadow-executive transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-professional group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  {service.features && (
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-200"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
