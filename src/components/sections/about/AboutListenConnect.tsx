"use client";

import React from "react";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { MailIcon, Podcast, Headphones } from "lucide-react";

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

  const { heading = "How to Listen & Connect", platforms } = section;

  const safePlatforms = platforms || [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
    },
    { name: "Spotify", url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH" },
    { name: "BuzzSprout", url: "https://www.buzzsprout.com/2057493/share" },
    { name: "Contact", url: "/consulting" },
  ];

  return (
    <section id={componentId} className="w-full py-16 md:py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-10 md:p-14 text-center">
          <div className="mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
              <Headphones className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Connect With Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">{heading}</h2>
            <p className="text-lg text-stone-500 max-w-xl mx-auto">
              Subscribe on your favorite platform, or{" "}
              <Link
                href="/consulting"
                className="text-amber-600 font-semibold hover:text-amber-700 underline decoration-2 underline-offset-4 transition-colors"
              >
                contact us
              </Link>{" "}
              to get in touch.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {safePlatforms.map((platform, index) => (
              <Link
                key={index}
                href={platform.url}
                target={platform.url.startsWith("http") ? "_blank" : undefined}
                rel={platform.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-amber-50 hover:border-amber-300 transition-all"
              >
                <div className="text-stone-400 group-hover:text-amber-600 transition-colors">
                  {platform.name === "Contact" ? (
                    <MailIcon className="w-6 h-6" />
                  ) : (
                    <Podcast className="w-6 h-6" />
                  )}
                </div>
                <span className="text-sm font-semibold text-stone-600 group-hover:text-amber-700 transition-colors">
                  {platform.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
