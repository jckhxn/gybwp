// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/src/app/(website)/lib/sanity-image";

interface EpisodeSponsorsProps {
  data: {
    showSponsors?: boolean;
    title?: string;
    showTiers?: boolean;
    allowClickthrough?: boolean;
  };
  episode: {
    sponsors?: Array<{
      _id: string;
      name: string;
      logo?: any;
      image?: string;
      website?: string;
      tier?: string;
      slug?: {
        current: string;
      };
      uuid?: string;
    }>;
    season?: {
      sponsors?: Array<{
        _id: string;
        name: string;
        logo?: any;
        image?: string;
        website?: string;
        tier?: string;
        slug?: {
          current: string;
        };
        uuid?: string;
      }>;
    };
  };
}

export default function EpisodeSponsors({
  data,
  episode,
}: EpisodeSponsorsProps) {
  if (!data?.showSponsors) return null;

  // Get sponsors from either direct sponsors or from season
  const episodeSponsors = episode?.sponsors || [];
  const seasonSponsors = episode?.season?.sponsors || [];
  const sponsors =
    episodeSponsors.length > 0 ? episodeSponsors : seasonSponsors;

  if (sponsors.length === 0) return null;

  const getSponsorLink = (sponsor: any) => {
    if (!data.allowClickthrough) return null;

    if (sponsor.website) return sponsor.website;
    if (sponsor.slug?.current) return `/sponsor/${sponsor.slug.current}`;
    if (sponsor.uuid) return `/sponsor/${sponsor.uuid}`;
    return null;
  };

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {data.title || "Episode Sponsors"}
          </h3>
          <p className="text-gray-600 text-sm">Thank you to our sponsors</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {sponsors.map((sponsor) => {
            const sponsorLink = getSponsorLink(sponsor);

            const sponsorContent = (
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-20 sm:w-36 sm:h-24 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                  <Image
                    src={
                      sponsor.logo
                        ? urlForImage(sponsor.logo)
                            ?.width(250)
                            .height(150)
                            .url()
                        : sponsor.image || "/placeholder-logo.png"
                    }
                    alt={`${sponsor.name} logo`}
                    width={120}
                    height={80}
                    className="object-contain p-3 max-w-full max-h-full"
                    sizes="(max-width: 640px) 112px, 144px"
                  />
                </div>

                <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-900 transition-colors duration-300 max-w-[112px] sm:max-w-[144px] truncate">
                  {sponsor.name}
                </h4>

                {data.showTiers && sponsor.tier && (
                  <span
                    className={`mt-1 inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium rounded-full ${
                      sponsor.tier === "platinum"
                        ? "bg-gray-800 text-white"
                        : sponsor.tier === "gold"
                          ? "bg-yellow-500 text-white"
                          : sponsor.tier === "silver"
                            ? "bg-gray-400 text-white"
                            : sponsor.tier === "bronze"
                              ? "bg-orange-600 text-white"
                              : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {sponsor.tier}
                  </span>
                )}
              </div>
            );

            return (
              <div key={sponsor._id}>
                {sponsorLink ? (
                  <Link
                    href={sponsorLink}
                    target={sponsor.website ? "_blank" : "_self"}
                    rel={sponsor.website ? "noopener noreferrer" : undefined}
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    {sponsorContent}
                  </Link>
                ) : (
                  sponsorContent
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Special thanks to our sponsors who help make this podcast possible
          </p>
          {data.allowClickthrough &&
            sponsors.some((s) => getSponsorLink(s)) && (
              <p className="text-xs text-gray-500">
                Click on sponsor logos to learn more about them
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
