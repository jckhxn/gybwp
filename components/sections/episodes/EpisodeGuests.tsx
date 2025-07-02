// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/app/(website)/components/ui/avatar";
import { Card, CardContent } from "@/src/app/(website)/components/ui/card";
import { urlForImage } from "@/src/app/(website)/lib/sanity-image";

interface EpisodeGuestsProps {
  data: {
    showGuests?: boolean;
    title?: string;
    showBios?: boolean;
    showSocialLinks?: boolean;
  };
  episode: {
    guests?: Array<{
      _id: string;
      name: string;
      title?: string;
      bio?: string;
      image?: any;
      socialLinks?: Array<{
        platform: string;
        url: string;
      }>;
      slug?: {
        current: string;
      };
    }>;
  };
}

export default function EpisodeGuests({ data, episode }: EpisodeGuestsProps) {
  if (!data?.showGuests) return null;

  const guests = episode?.guests || [];
  if (guests.length === 0) return null;

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {data.title || "Featured Guests"}
          </h3>
          <p className="text-gray-600 text-sm">
            Meet the guests on this episode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <Card key={guest._id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage
                      src={
                        guest.image
                          ? urlForImage(guest.image)?.width(128).height(128).url()
                          : undefined
                      }
                      alt={guest.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 font-semibold">
                      {guest.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h4 className="font-semibold text-gray-900 mb-1">{guest.name}</h4>
                  
                  {guest.title && (
                    <p className="text-sm text-gray-600 mb-3">{guest.title}</p>
                  )}

                  {data.showBios && guest.bio && (
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {guest.bio}
                    </p>
                  )}

                  {data.showSocialLinks && guest.socialLinks && guest.socialLinks.length > 0 && (
                    <div className="flex gap-2">
                      {guest.socialLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <span className="sr-only">{link.platform}</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a5.987 5.987 0 01.332-2.973z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  )}

                  {guest.slug?.current && (
                    <Link
                      href={`/person/${guest.slug.current}`}
                      className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View Profile →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
