"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getComponentId } from "@/src/lib/sectionId";
import { LinkedinIcon, TwitterIcon, Quote, User } from "lucide-react";
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

  const safeSocialLinks = socialLinks || [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jeff-lackey-gybwp/" },
    { label: "Twitter", href: "https://twitter.com/jefflackey" }
  ];

  const imageUrl = hostImage?.asset?.url || consulting1;
  const imageAlt = hostImage?.alt || "Jeff Lackey - Host";

  return (
    <section id={componentId} className="w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Host Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-50 rounded-3xl p-8 flex flex-col items-center text-center border border-surface-100"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-full blur-lg opacity-50"></div>
              <Image
                alt={imageAlt}
                className="relative rounded-full aspect-square border-4 border-white shadow-elevated object-cover"
                src={imageUrl}
                width={200}
                height={200}
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-surface-900">{host}</h3>
              <p className="text-primary font-semibold">Host, GYBWP</p>
              <p className="text-surface-600 leading-relaxed text-sm mt-2 max-w-xs">
                {hostBio}
              </p>
              <div className="flex gap-3 justify-center mt-4">
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
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Leadership Authority</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900">
                {heading}
              </h2>
            </div>
            
            <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border-l-4 border-primary">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              <p className="text-lg md:text-xl text-surface-700 leading-relaxed italic">
                {subtext}
              </p>
            </div>
            
            <p className="text-surface-600 leading-relaxed text-lg">
              {hostJourney}
            </p>
          </motion.div>
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
      className="inline-flex items-center justify-center w-11 h-11 text-primary hover:text-white 
                 bg-white hover:bg-primary rounded-xl border border-surface-200 hover:border-primary
                 shadow-soft hover:shadow-glow transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon} <span className="sr-only">{label}</span>
    </Link>
  );
}
