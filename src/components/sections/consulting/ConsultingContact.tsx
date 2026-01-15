import React from "react";
import { Calendar, ArrowRight, CheckCircle, Sparkles, MessageSquare } from "lucide-react";
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
      className="py-24 lg:py-32 bg-surface-900 relative overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {section.badgeText || "Get Started"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {section.title || "Ready to Transform Your Business?"}
          </h2>
          <p className="text-xl text-surface-300 max-w-3xl mx-auto leading-relaxed">
            {section.description || 
              "Let's discuss how we can help you achieve your talent and growth objectives. Choose your preferred way to connect with Jeff."
            }
          </p>
        </div>

        {/* Calendar CTA */}
        {section.showCalendarCTA !== false && (
          <div className="bg-surface-800/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-surface-700/50 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              <a
                href={section.calendarUrl || "https://cal.com/jeffrey-lackey-sr/30min"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 text-lg group"
              >
                <Calendar className="w-6 h-6" />
                <span>{section.calendarButtonText || "Schedule Your Strategy Call"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {(section.calendarFeatures || ["Free consultation", "Instant booking", "No commitment"]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-surface-300">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {section.showContactForm !== false && (
          <>
            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-surface-600 to-transparent w-32" />
              <div className="flex items-center gap-2 text-surface-400">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wider uppercase">Or Send a Message</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-surface-600 to-transparent w-32" />
            </div>
            
            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-elevated">
                <ConsultingContactForm />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}