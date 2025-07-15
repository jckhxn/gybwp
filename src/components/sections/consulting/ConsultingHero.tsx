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
      className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-20 lg:py-32"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 px-4 py-2"
              >
                {section.badgeText || "JKL Advisors Consulting"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {section.title || (
                  <>
                    Empowering Your Business with
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Calendar CTA */}
            {section.showCalendarCTA !== false && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
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
                  <div className="text-center sm:text-left">
                    {section.calendarFeatures?.map((feature, index) => (
                      <div key={index} className="text-sm text-gray-300 font-medium">
                        ✓ {feature}
                      </div>
                    )) || (
                      <>
                        <div className="text-sm text-gray-300 font-medium">
                          ✓ Free consultation
                        </div>
                        <div className="text-sm text-gray-300 font-medium">
                          ✓ Instant booking
                        </div>
                        <div className="text-sm text-gray-300 font-medium">
                          ✓ No commitment required
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(secondaryButton || tertiaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {secondaryButton && (
                  <SmartButton
                    data={secondaryButton}
                    className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    {secondaryButton.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </SmartButton>
                )}
                {tertiaryButton && (
                  <SmartButton
                    data={tertiaryButton}
                    className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    {tertiaryButton.text}
                  </SmartButton>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {section.heroImage?.asset ? (
                <Image
                  src={urlFor(section.heroImage).width(600).height(400).url()}
                  alt={section.heroImage.alt || "Consulting Services"}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🤝</div>
                    <p>Consulting Services</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
