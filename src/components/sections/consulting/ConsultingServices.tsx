import React from "react";
import { CheckCircle, Users, TrendingUp, Target, Award, Globe, Building, Lightbulb, Sparkles } from "lucide-react";
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

const ICON_COLORS = [
  "from-primary to-primary-dark",
  "from-secondary to-secondary-dark",
  "from-accent to-accent-light",
  "from-primary to-secondary",
];

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
    <section id={componentId} className="py-24 lg:py-32 bg-surface-50">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {section.badgeText || "Our Services"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight">
            {section.title || "Comprehensive Talent Solutions"}
          </h2>
          <p className="text-xl text-surface-500 max-w-3xl mx-auto leading-relaxed">
            {section.description || 
              "From strategic planning to execution, we provide end-to-end consulting services that drive sustainable business growth through people."
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = service.icon && ICON_MAP[service.icon as keyof typeof ICON_MAP] 
              ? ICON_MAP[service.icon as keyof typeof ICON_MAP]
              : Users;
            const gradientColor = ICON_COLORS[index % ICON_COLORS.length];
            
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-surface-200 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 relative overflow-hidden"
              >
                {/* Decorative gradient corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 group-hover:shadow-medium transition-all duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-surface-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-surface-500 text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-surface-600 group-hover:text-surface-700 transition-colors duration-200"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
