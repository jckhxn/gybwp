"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  
  const {
    heading = "How to Listen & Connect",
    text = "Subscribe on your favorite platform, or contact us to get in touch.",
    platforms
  } = section;

  const safePlatforms = platforms || [
    { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511" },
    { name: "Spotify", url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH" },
    { name: "BuzzSprout", url: "https://www.buzzsprout.com/2057493/share" },
    { name: "Contact", url: "/consulting" }
  ];

  return (
    <section id={componentId} className="w-full py-20 md:py-28 bg-surface-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-medium border border-surface-100 p-10 md:p-14 text-center space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Headphones className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Connect With Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900">
              {heading}
            </h2>
          </div>
          
          <p className="text-lg text-surface-600 max-w-2xl mx-auto leading-relaxed">
            Subscribe on your favorite platform, or{" "}
            <Link
              href="/consulting"
              className="text-primary font-semibold hover:text-primary-dark underline decoration-2 underline-offset-4 transition-colors duration-200"
            >
              contact us
            </Link>{" "}
            to get in touch.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            {safePlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PlatformBadge
                  href={platform.url}
                  label={platform.name}
                  icon={platform.name === "Contact" ? <MailIcon className="h-6 w-6" /> : <Podcast className="h-6 w-6" />}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      className="group flex flex-col items-center justify-center p-6 rounded-2xl 
                 bg-surface-50 border border-surface-200 
                 hover:bg-primary hover:border-primary hover:shadow-glow
                 transition-all duration-300 hover:-translate-y-1"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="text-primary group-hover:text-white transition-colors duration-300 mb-3">
        {icon || <Podcast className="h-6 w-6" />}
      </div>
      <span className="text-sm font-medium text-surface-700 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </Link>
  );
}
