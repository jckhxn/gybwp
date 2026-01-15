// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Headphones, Mail, ArrowRight } from "lucide-react";

interface SubscribeSectionProps {
  data: {
    showSubscribe?: boolean;
    title?: string;
    subtitle?: string;
    showPodcastPlatforms?: boolean;
    showNewsletter?: boolean;
  };
}

const podcastPlatforms = [
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/podcast/growing-your-business-with-people/id1234567890",
    icon: "/social-logos/apple.png",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/1234567890",
    icon: "/social-logos/spotify.png",
  },
  {
    name: "Google Podcasts",
    url: "https://podcasts.google.com/feed/1234567890",
    icon: "/social-logos/google.png",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/podcasts/1234567890",
    icon: "/social-logos/amazon.png",
  },
];

export default function SubscribeSection({ data }: SubscribeSectionProps) {
  if (!data?.showSubscribe) return null;

  return (
    <div className="relative bg-white rounded-2xl border border-surface-100 shadow-medium overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-light to-primary"></div>
      
      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-5">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-surface-900 mb-3">
            {data.title || "Subscribe & Listen"}
          </h3>
          <p className="text-surface-500 text-base max-w-md mx-auto">
            {data.subtitle || "Never miss an episode of valuable leadership insights"}
          </p>
        </div>

        <div className="space-y-10">
          {/* Podcast Platforms */}
          {data.showPodcastPlatforms && (
            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-5 text-center uppercase tracking-wider">
                Listen on Your Favorite Platform
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {podcastPlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-5 bg-surface-50 rounded-xl border border-surface-100
                               transition-all duration-300 hover:bg-white hover:shadow-medium hover:border-primary/20 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 relative mb-3">
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={48}
                        height={48}
                        className="object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-sm font-medium text-surface-600 text-center group-hover:text-primary transition-colors">
                      {platform.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          {data.showNewsletter && (
            <div className="pt-8 border-t border-surface-100">
              <div className="bg-surface-50 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-surface-900">
                    Get Episode Updates
                  </h4>
                </div>
                <p className="text-surface-500 text-sm mb-5 text-center max-w-sm mx-auto">
                  Subscribe to our newsletter for new episode notifications and exclusive content
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white border border-surface-200 rounded-xl 
                               text-surface-900 placeholder:text-surface-400
                               transition-all duration-200
                               focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl
                               shadow-soft transition-all duration-300 hover:bg-primary-dark hover:shadow-glow hover:-translate-y-0.5
                               whitespace-nowrap"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
