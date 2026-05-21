"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { LinkedinIcon, TwitterIcon, Quote } from "lucide-react";
import consulting1 from "@/public/images/consulting1.webp";

interface AboutHostProps {
  section: {
    _type: "aboutHost";
    _key?: string;
    sectionId?: string;
    host?: string;
    hostImage?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
    hostBio?: string;
    heading?: string;
    subtext?: string;
    hostJourney?: string;
    socialLinks?: Array<{
      label: string;
      href: string;
      icon?: string;
    }>;
  };
}

export function AboutHost({ section }: AboutHostProps) {
  const componentId = getComponentId(section, "about-host");

  const {
    host = "Jeff Lackey",
    hostImage,
    hostBio = "Jeff is passionate about helping leaders unlock the full potential of their teams. With decades of experience in talent, leadership, and business transformation, he brings a unique perspective to every conversation.",
    heading = "Meet the Host",
    subtext = "\"I firmly believe people aren't just a company's most vital asset; they're an investment primed for growth.\"",
    hostJourney = "Jeff's leadership journey includes roles at Fortune 100 companies, startups, and everything in between. He's on a mission to help you grow your business — with people.",
    socialLinks,
  } = section;

  const safeSocialLinks = socialLinks || [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeff-lackey-gybwp/" },
    { label: "Twitter", href: "https://twitter.com/jefflackey" },
  ];

  const imageUrl = hostImage?.asset?.url || consulting1;
  const imageAlt = hostImage?.alt || "Jeff Lackey - Host";

  return (
    <section id={componentId} className="w-full py-16 md:py-24 bg-white border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Portrait card */}
          <div className="bg-amber-50 rounded-3xl border border-amber-100 p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  src={imageUrl}
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-stone-900">{host}</h3>
              <p className="text-amber-600 font-semibold text-sm">Host, Growing Your Business With People</p>
              <p className="text-stone-600 leading-relaxed text-sm mt-3 max-w-xs">
                {hostBio}
              </p>
              <div className="flex gap-2.5 justify-center mt-5">
                {safeSocialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-amber-600 hover:border-amber-300 shadow-sm transition-all"
                  >
                    {link.label === "LinkedIn" ? (
                      <LinkedinIcon className="w-4 h-4" />
                    ) : (
                      <TwitterIcon className="w-4 h-4" />
                    )}
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-7">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Leadership Authority</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
                {heading}
              </h2>
            </div>

            <div className="relative bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-400">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-200" />
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic">
                {subtext}
              </p>
            </div>

            <p className="text-stone-600 leading-relaxed text-lg">
              {hostJourney}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
