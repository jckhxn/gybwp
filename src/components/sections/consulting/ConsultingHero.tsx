import React from "react";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getComponentId } from "@/src/lib/sectionId";
import { SmartButton } from "@/src/components/ui/SmartButton";
import { urlFor } from "@/src/lib/utils";

interface ConsultingHeroProps {
  section: {
    _type: string;
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    description?: string;
    stats?: Array<{
      number: string;
      label: string;
    }>;
    showCalendarCTA?: boolean;
    calendarUrl?: string;
    calendarButtonText?: string;
    calendarFeatures?: string[];
    secondaryButton?: {
      text?: string;
      link?: string;
      componentLink?: any;
    };
    tertiaryButton?: {
      text?: string;
      link?: string;
      componentLink?: any;
    };
    heroImage?: {
      asset?: {
        _ref: string;
      };
      alt?: string;
    };
  };
}

const FALLBACK_STATS = [
  { number: "28+", label: "Years of Experience" },
  { number: "1M+", label: "Professionals Hired" },
  { number: "70+", label: "Countries Served" },
  { number: "200k+", label: "Annual Hires Supported" },
];

export function ConsultingHero({ section }: ConsultingHeroProps) {
  const componentId = getComponentId(section, "consulting-hero");
  const stats = section.stats || FALLBACK_STATS;

  // Default buttons
  const defaultSecondaryButton = { text: "Send Message", link: "#contact" };
  const defaultTertiaryButton = { text: "Explore Services", link: "#services" };

  const secondaryButton = section.secondaryButton || defaultSecondaryButton;
  const tertiaryButton = section.tertiaryButton || defaultTertiaryButton;

  return (
    <section
      id={componentId}
      className="relative bg-main py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] opacity-30"></div>
      <div className="container relative px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full border border-white/30 shadow-professional">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-primary">
                  {section.badgeText || "JKL Advisors Consulting"}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
                {section.title || (
                  <>
                    Empowering Your Business with
                    <span className="text-secondary">
                      {" "}
                      People
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                {section.description ||
                  "Transform your organization through strategic talent solutions. With 28+ years of experience and over 1 million successful hires, we help businesses grow through their most important investment: people."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center group hover:shadow-executive transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-200 font-medium mt-2 group-hover:text-white transition-colors duration-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Calendar CTA */}
            {section.showCalendarCTA !== false && (
              <div className="card-executive p-8 border border-white/20">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <a
                    href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-executive group relative overflow-hidden px-10 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    <svg
                      className="mr-3 w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {section.calendarButtonText || "Schedule Your 30-Minute Strategy Call"}
                  </a>
                  <div className="text-center sm:text-left space-y-2">
                    {section.calendarFeatures?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        {feature}
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                          Free consultation
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                          Instant booking
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                          No commitment required
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(secondaryButton || tertiaryButton) && (
              <div className="flex flex-col sm:flex-row gap-6">
                {secondaryButton && (
                  <SmartButton
                    data={secondaryButton}
                    className="glass-card inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/20 hover:shadow-professional px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {secondaryButton.text}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </SmartButton>
                )}
                {tertiaryButton && (
                  <SmartButton
                    data={tertiaryButton}
                    className="inline-flex items-center justify-center border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {tertiaryButton.text}
                  </SmartButton>
                )}
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative card-executive rounded-2xl overflow-hidden shadow-executive border border-white/20">
              {section.heroImage?.asset ? (
                <Image
                  src={urlFor(section.heroImage).width(600).height(400).url()}
                  alt={section.heroImage.alt || "Consulting Services"}
                  width={600}
                  height={400}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-96 bg-primary/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4 opacity-80">🤝</div>
                    <p className="text-xl font-semibold">Consulting Services</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
