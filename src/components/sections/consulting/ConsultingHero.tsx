import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Sparkles, CheckCircle, Play } from "lucide-react";
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
      className="relative bg-surface-900 py-24 lg:py-32 overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container relative px-6 md:px-8 max-w-7xl mx-auto z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {section.badgeText || "JKL Advisors Consulting"}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {section.title || (
                  <>
                    Empowering Your Business with
                    <span className="text-primary"> People</span>
                  </>
                )}
              </h1>
              
              {/* Description */}
              <p className="text-xl text-surface-300 leading-relaxed max-w-xl">
                {section.description ||
                  "Transform your organization through strategic talent solutions. With 28+ years of experience and over 1 million successful hires, we help businesses grow through their most important investment: people."}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-surface-800/50 backdrop-blur-sm p-5 rounded-2xl border border-surface-700/50 text-center group hover:bg-surface-800/70 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xs text-surface-400 font-medium mt-1 group-hover:text-surface-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar CTA */}
            {section.showCalendarCTA !== false && (
              <div className="bg-surface-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-surface-700/50">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <a
                    href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{section.calendarButtonText || "Schedule Your Strategy Call"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    {(section.calendarFeatures || ["Free consultation", "Instant booking", "No commitment"]).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-surface-300">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Buttons */}
            {(secondaryButton || tertiaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {secondaryButton && (
                  <SmartButton
                    data={secondaryButton}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group"
                  >
                    {secondaryButton.text}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </SmartButton>
                )}
                {tertiaryButton && (
                  <SmartButton
                    data={tertiaryButton}
                    className="inline-flex items-center justify-center border-2 border-surface-600 text-surface-300 hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    {tertiaryButton.text}
                  </SmartButton>
                )}
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative rounded-3xl overflow-hidden shadow-glow border border-surface-700/50">
              {section.heroImage?.asset ? (
                <Image
                  src={urlFor(section.heroImage).width(600).height(400).url()}
                  alt={section.heroImage.alt || "Consulting Services"}
                  width={600}
                  height={400}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                  <div className="text-white text-center relative z-10">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-xl font-semibold">Consulting Services</p>
                    <p className="text-surface-400 mt-1">Transform your business</p>
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
