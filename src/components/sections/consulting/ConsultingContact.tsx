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
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 mb-4"
          >
            {section.badgeText || "Get Started"}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {section.title || "Ready to Transform Your Business?"}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {section.description || 
              "Let's discuss how we can help you achieve your talent and growth objectives. Choose your preferred way to connect with Jeff."
            }
          </p>

          {/* Calendar CTA */}
          {section.showCalendarCTA !== false && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-lg border border-slate-600 hover:border-slate-500"
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
          )}

          {section.showContactForm !== false && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-4 text-gray-400">
                  <div className="h-px bg-gray-600 flex-1 max-w-24"></div>
                  <span className="text-sm font-medium">OR SEND A MESSAGE</span>
                  <div className="h-px bg-gray-600 flex-1 max-w-24"></div>
                </div>
              </div>
              <ConsultingContactForm />
            </>
          )}
        </div>
      </div>
    </section>
  );
}