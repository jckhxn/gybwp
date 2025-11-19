"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getComponentId } from "@/src/lib/sectionId";
import { LinkedinIcon, TwitterIcon } from "lucide-react";
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
    hostJourney = "Jeff's leadership journey includes roles at Fortune 100 companies, startups, and everything in between. He's on a mission to help you grow your business—with people.",
    socialLinks
  } = section;

  // Ensure socialLinks is always an array
  const safeSocialLinks = socialLinks || [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jeff-lackey-gybwp/"
    },
    {
      label: "Twitter",
      href: "https://twitter.com/jefflackey"
    }
  ];

  const imageUrl = hostImage?.asset?.url || consulting1;
  const imageAlt = hostImage?.alt || "Jeff Lackey - Host";

  return (
    <section id={componentId} className="w-full py-20 md:py-24 bg-gradient-to-br from-off-white via-white to-gray-50/30">
      <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <div className="card-executive flex flex-col items-center text-center p-10">
          <div className="relative mb-6">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-30"></div>
            <Image
              alt={imageAlt}
              className="relative rounded-full aspect-square border-4 border-white shadow-xl object-cover"
              src={imageUrl}
              width={200}
              height={200}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-900">{host}</h3>
            <p className="text-primary font-medium">Host, GYBWP</p>
            <p className="text-gray-600 leading-relaxed text-base mt-2">
              {hostBio}
            </p>
            <div className="flex gap-3 justify-center mt-3">
              {safeSocialLinks.map((link, index) => (
                <SocialLink
                  key={index}
                  href={link.href}
                  label={link.label}
                  icon={link.label === "LinkedIn" ? <LinkedinIcon className="h-5 w-5" /> : <TwitterIcon className="h-5 w-5" />}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 shadow-professional">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Leadership Authority</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-main to-main-light bg-clip-text text-transparent">
              {heading}
            </h2>
          </div>
          <blockquote className="card-executive p-8 border-l-4 border-primary bg-gradient-to-br from-primary/5 to-transparent">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">
              {subtext}
            </p>
          </blockquote>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="leading-relaxed">{hostJourney}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="glass-card hover:shadow-professional inline-flex items-center justify-center w-12 h-12 text-primary hover:text-white hover:bg-primary/90 rounded-full border border-primary/20 transition-all duration-300 hover:scale-105"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon} <span className="sr-only">{label}</span>
    </Link>
  );
}
