import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { getComponentId } from "@/src/lib/sectionId";
import ConsultingContactForm from "@/src/components/features/ConsultingContactForm";

interface ConsultingContactProps {
  section: {
    _type: string;
    _key?: string;
    sectionId?: string;
    badgeText?: string;
    title?: string;
    description?: string;
    showCalendarCTA?: boolean;
    calendarUrl?: string;
    calendarButtonText?: string;
    calendarFeatures?: string[];
    showContactForm?: boolean;
  };
}

export function ConsultingContact({ section }: ConsultingContactProps) {
  const componentId = getComponentId(section, "consulting-contact");
  
  return (
    <section
      id={componentId}
      className="py-24 lg:py-32 bg-gradient-to-br from-main/95 via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)] opacity-20"></div>
      <div className="container px-6 md:px-8 max-w-6xl mx-auto relative">
        <div className="text-center mb-20 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full border border-white/30 shadow-professional">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary">
                {section.badgeText || "Get Started"}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {section.title || "Ready to Transform Your Business?"}
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
              {section.description || 
                "Let's discuss how we can help you achieve your talent and growth objectives. Choose your preferred way to connect with Jeff."
              }
            </p>
          </div>

          {/* Calendar CTA */}
          {section.showCalendarCTA !== false && (
            <div className="card-executive p-8 border border-white/20 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                <a
                  href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-executive group relative overflow-hidden px-12 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  <svg
                    className="mr-4 w-7 h-7 group-hover:rotate-12 transition-transform duration-300"
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
                <div className="text-center sm:text-left space-y-3">
                  {section.calendarFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      {feature}
                    </div>
                  )) || (
                    <>
                      <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        Free consultation
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        Instant booking
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        No commitment required
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {section.showContactForm !== false && (
            <>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-6 text-gray-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1 max-w-32"></div>
                  <span className="text-sm font-semibold tracking-wider">OR SEND A MESSAGE</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1 max-w-32"></div>
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <ConsultingContactForm />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}