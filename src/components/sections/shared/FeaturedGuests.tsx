"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/src/lib/sanity-utils";
import { groq } from "next-sanity";
import { urlFor } from "@/src/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const RECENT_GUESTS_QUERY = groq`*[_type == "person" && role == "guest" && defined(guestProfile.profileImage)] | order(_createdAt desc) [0...12] {
  _id,
  name,
  slug,
  guestProfile {
    title,
    company,
    profileImage,
    bio
  }
}`;

interface Guest {
  _id: string;
  name: string;
  slug?: { current?: string };
  guestProfile?: {
    title?: string;
    company?: string;
    profileImage?: any;
    bio?: string;
  };
}

interface FeaturedGuestsProps {
  section?: {
    heading?: string;
    subheading?: string;
  };
}

export function FeaturedGuests({ section }: FeaturedGuestsProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const heading = section?.heading || "Recent Guests";
  const subheading = section?.subheading || "The operators, leaders, and builders behind the conversations.";

  useEffect(() => {
    client
      .fetch(RECENT_GUESTS_QUERY)
      .then((data) => setGuests(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-stone-900 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <div className="h-4 w-24 bg-stone-700 rounded-full mb-3 animate-pulse" />
            <div className="h-8 w-56 bg-stone-700 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-stone-700" />
                <div className="h-3 w-20 bg-stone-700 rounded" />
                <div className="h-2.5 w-16 bg-stone-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!guests.length) return null;

  return (
    <section className="bg-stone-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Past Guests
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">{heading}</h2>
            <p className="text-stone-400 mt-1.5 text-sm">{subheading}</p>
          </div>
          <Link
            href="/episodes"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            All episodes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Guest grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {guests.map((guest) => {
            const img = guest.guestProfile?.profileImage;
            const initials = guest.name
              ? guest.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
              : "GU";
            const href = guest.slug?.current
              ? `/guest/${encodeURIComponent(guest.slug.current)}`
              : "/episodes";

            return (
              <Link
                key={guest._id}
                href={href}
                className="group flex flex-col items-center text-center gap-2.5 p-3 rounded-2xl hover:bg-stone-800 transition-colors"
              >
                <Avatar className="h-20 w-20 border-2 border-stone-700 group-hover:border-amber-500 transition-colors shadow-lg">
                  {img ? (
                    <AvatarImage
                      src={urlFor(img).width(160).height(160).url()}
                      alt={guest.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-stone-700 text-amber-400 font-semibold text-sm">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 w-full">
                  <p className="text-xs font-semibold text-white leading-tight truncate group-hover:text-amber-300 transition-colors">
                    {guest.name}
                  </p>
                  {(guest.guestProfile?.title || guest.guestProfile?.company) && (
                    <p className="text-[10px] text-stone-500 mt-0.5 leading-tight line-clamp-2">
                      {guest.guestProfile?.title || guest.guestProfile?.company}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Browse all episodes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
