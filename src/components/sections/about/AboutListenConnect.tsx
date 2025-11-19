"use client";

import React from "react";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { MailIcon, Podcast } from "lucide-react";

interface AboutListenConnectProps {
  section: {
    _type: "aboutListenConnect";
    _key?: string;
    sectionId?: string;
    heading?: string;
    text?: string;
    platforms?: Array<{
      name: string;
      url: string;
      icon?: string;
    }>;
  };
}

export function AboutListenConnect({ section }: AboutListenConnectProps) {
  const componentId = getComponentId(section, "about-listen-connect");
  
  const {
    heading = "How to Listen & Connect",
    text = "Subscribe on your favorite platform, or contact us to get in touch.",
    platforms
  } = section;

  // Ensure platforms is always an array
  const safePlatforms = platforms || [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
    },
    {
      name: "BuzzSprout",
      url: "https://www.buzzsprout.com/2057493/share"
    },
    {
      name: "Contact",
      url: "/consulting"
    }
  ];

  return (
    <section id={componentId} className="w-full py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="card-executive p-12 text-center space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-professional">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Connect With Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-main">
              {heading}
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Subscribe on your favorite platform, or{" "}
            <Link
              href="/consulting"
              className="text-primary font-semibold hover:text-primary/80 underline decoration-2 underline-offset-4 hover:decoration-primary/50 transition-all duration-200"
            >
              contact us
            </Link>{" "}
            to get in touch.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {safePlatforms.map((platform, index) => (
              <PlatformBadge
                key={index}
                href={platform.url}
                label={platform.name}
                icon={platform.name === "Contact" ? <MailIcon className="h-5 w-5" /> : <Podcast className="h-5 w-5" />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformBadge({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="glass-card group flex flex-col items-center justify-center p-6 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-professional transition-all duration-300 hover:-translate-y-1"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="text-primary group-hover:text-primary/80 group-hover:scale-110 transition-all duration-200 mb-3">
        {icon || <Podcast className="h-5 w-5" />}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{label}</span>
    </Link>
  );
}
