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
    <section id={componentId} className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center text-center gap-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {heading}
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Subscribe on your favorite platform, or{" "}
          <Link
            href="/consulting"
            className="text-primary underline hover:text-primary/80"
          >
            contact us
          </Link>{" "}
          to get in touch.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {safePlatforms.map((platform, index) => (
            <PlatformBadge
              key={index}
              href={platform.url}
              label={platform.name}
              icon={platform.name === "Contact" ? <MailIcon className="h-4 w-4" /> : <Podcast className="h-4 w-4" />}
            />
          ))}
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
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-primary hover:text-primary/80 rounded-lg border border-primary/20 hover:border-primary/30 transition-all duration-200"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {icon || <Podcast className="h-4 w-4" />} {label}
    </Link>
  );
}
