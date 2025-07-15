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
    <section id={componentId} className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-white">
      <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-gray-200/70 shadow-lg">
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
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {subtext}
          </p>
          <p className="text-base text-gray-500">{hostJourney}</p>
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
      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-primary/10 text-primary rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon} <span className="sr-only">{label}</span>
    </Link>
  );
}
