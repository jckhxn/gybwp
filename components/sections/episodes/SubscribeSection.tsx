// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";

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
    <div className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5-5-5h5v-5a7.07 7.07 0 01-3-6C7 6.477 7.477 6 8 6s1 .477 1 1c0 .591.273 1.139.7 1.5L12 6l2.3 2.5c.427-.361.7-.909.7-1.5 0-.523.477-1 1-1s1 .477 1 1a7.07 7.07 0 01-3 6v5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {data.title || "Subscribe & Listen"}
          </h3>
          <p className="text-gray-600 text-sm">
            {data.subtitle || "Never miss an episode"}
          </p>
        </div>

        <div className="space-y-8">
          {data.showPodcastPlatforms && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Listen on Your Favorite Platform
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {podcastPlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 relative mb-2">
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={48}
                        height={48}
                        className="object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                      {platform.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {data.showNewsletter && (
            <div className="pt-6 border-t border-gray-200">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  Get Episode Updates
                </h4>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  Subscribe to our newsletter for episode notifications and exclusive content
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
