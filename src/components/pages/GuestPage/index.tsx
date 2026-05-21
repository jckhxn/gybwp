import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, Clock, ArrowRight, Play, ExternalLink, Linkedin, Globe } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { PlayerHandle } from "@/src/components/features/episodes";
import routes from "@/src/app/(website)/routes";
import { GUEST_DETAIL_QUERY, HOST_DETAIL_QUERY } from "@/src/lib/queries";
import { urlFor } from "@/src/lib/utils";
import { loadQuery } from "@/data/sanity/loadQuery";
import { ComponentLinkData } from "@/src/components/ui/ComponentLink";
import { buildComponentLinkUrl } from "@/src/lib/componentLink";
import type { EpisodeType } from "@/types";
import { generatePersonMetadata } from "@/src/lib/metadata";
import { generatePersonStructuredData } from "@/src/lib/structured-data";
import JSONLD from "@/src/components/SEO/jsonld";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

// Returns a usable URL regardless of whether the value is a string URL or Sanity image reference
function toImageUrl(img: any): string | null {
  if (!img) return null;
  if (typeof img === "string") return img;
  try { return urlFor(img).width(400).url(); } catch { return null; }
}

// Resolves a Sanity pathname (string or {current} object) to a usable href string
function toEpisodeHref(episode: any): string {
  const p = episode?.pathname;
  const resolved = typeof p === "string" ? p : p?.current;
  return resolved || (episode?.uuid ? `/episodes/${episode.uuid}` : "/episodes");
}

interface GuestDataType {
  _id: string;
  name: string;
  guestProfile?: {
    title?: string;
    bio?: string;
    company?: string;
    website?: string;
    profileImage?: any;
    socialLinks?: Record<string, string>;
  };
  episodes?: EpisodeType[];
}

interface HostDataType {
  _id: string;
  name: string;
  pageReference?: ComponentLinkData;
  consultingProfile?: {
    bio?: string;
    expertise?: string[];
    profileImage?: any;
    calendarLink?: string;
  };
}

async function getHostData(slug: string): Promise<HostDataType | null> {
  const hostData = await loadQuery<HostDataType>({
    query: HOST_DETAIL_QUERY,
    params: { slug },
  });
  return hostData;
}

export async function generateMetadata({
  params,
}: {
  params: { guest: string | string[] };
}): Promise<Metadata> {
  const slug = Array.isArray(params.guest) ? params.guest[0] : params.guest;
  const hostData = await getHostData(slug);
  if (hostData) {
    return {
      title: "Business Consulting - Growing Your Business With People",
      description: "Expert business consulting and coaching services to help grow your business.",
    };
  }
  const guestData = await loadQuery<GuestDataType>({
    query: GUEST_DETAIL_QUERY,
    params: { slug },
  });
  if (!guestData || !guestData.name) {
    return {
      title: "Guest Not Found | Growing Your Business With People",
      description: "No guest found for this slug.",
    };
  }
  return generatePersonMetadata({
    name: guestData.name,
    role: "guest",
    guestProfile: guestData.guestProfile,
    pathname: { current: `/guest/${slug}` },
  });
}

export default async function GuestPage({
  guest,
  searchParams,
}: {
  guest: string | string[];
  searchParams?: { search?: string };
}) {
  const slug = Array.isArray(guest) ? guest[0] : guest;

  const hostData = await getHostData(slug);
  if (hostData && hostData.pageReference) {
    redirect(buildComponentLinkUrl(hostData.pageReference));
  } else if (hostData) {
    redirect("/consulting#profile");
  }

  const guestData = await loadQuery<GuestDataType>({
    query: GUEST_DETAIL_QUERY,
    params: { slug },
  });

  if (!guestData || !guestData.name) {
    throw new Error(`Guest with slug "${slug}" not found`);
  }

  const allEpisodes = guestData.episodes || [];
  const latestEpisode = allEpisodes[0];

  const structuredData = generatePersonStructuredData({
    name: guestData.name,
    title: guestData.guestProfile?.title,
    about: guestData.guestProfile?.bio,
    image: guestData.guestProfile?.profileImage
      ? urlFor(guestData.guestProfile.profileImage).url()
      : undefined,
    website: guestData.guestProfile?.website,
    socialLinks: guestData.guestProfile?.socialLinks,
    episodes: allEpisodes.map((episode) => ({
      title: episode.title,
      url: `/episode/${episode.uuid}`,
      publishedAt: episode.date,
    })),
  });

  const initials = guestData.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const linkedin = guestData.guestProfile?.socialLinks?.linkedin;
  const website = guestData.guestProfile?.website || guestData.guestProfile?.socialLinks?.website;

  return (
    <>
      <JSONLD data={structuredData} id="person-jsonld" />

      {/* ── Hero ── */}
      <section className="bg-amber-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">

            {/* Portrait */}
            <div className="flex-shrink-0">
              <Avatar className="w-28 h-28 lg:w-36 lg:h-36 border-4 border-white shadow-xl">
                {guestData.guestProfile?.profileImage ? (
                  <AvatarImage
                    src={urlFor(guestData.guestProfile.profileImage).width(288).height(288).url()}
                    alt={guestData.name}
                  />
                ) : (
                  <AvatarFallback className="text-3xl font-bold bg-amber-200 text-amber-800">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                Featured Guest
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-1">
                {guestData.name}
              </h1>
              {guestData.guestProfile?.title && (
                <p className="text-lg font-medium text-amber-700 mb-0.5">{guestData.guestProfile.title}</p>
              )}
              {guestData.guestProfile?.company && (
                <p className="text-base text-stone-500 mb-4">{guestData.guestProfile.company}</p>
              )}

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-sm font-semibold text-stone-700 shadow-sm">
                  <Play className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {allEpisodes.length} Episode{allEpisodes.length !== 1 ? "s" : ""}
                </span>
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-sm font-semibold text-stone-700 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-sm font-semibold text-stone-700 shadow-sm hover:border-amber-300 hover:text-amber-700 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* Left: bio + episodes */}
            <div className="space-y-6">

              {/* Bio */}
              {guestData.guestProfile?.bio && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
                  <div className="p-7">
                    <h2 className="text-lg font-bold text-stone-900 mb-4">About {guestData.name}</h2>
                    <p className="text-stone-600 leading-relaxed">{guestData.guestProfile.bio}</p>
                  </div>
                </div>
              )}

              {/* Episodes */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-stone-700 to-stone-600" />
                <div className="p-7">
                  <h2 className="text-lg font-bold text-stone-900 mb-5">
                    Episodes featuring {guestData.name.split(" ")[0]}
                  </h2>

                  {allEpisodes.length > 0 ? (
                    <div className="space-y-3">
                      {allEpisodes.map((episode: EpisodeType, index: number) => {
                        const epTitle = formatEpisodeTitle(episode.title || "Untitled Episode");
                        const epHref = toEpisodeHref(episode);
                        return (
                          <Link
                            key={episode.uuid || index}
                            href={epHref}
                            className="group flex gap-4 items-start p-4 rounded-xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                          >
                            {toImageUrl(episode.image) && (
                              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-stone-200">
                                <Image
                                  src={toImageUrl(episode.image)!}
                                  alt={epTitle}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-stone-900 line-clamp-2 group-hover:text-amber-700 transition-colors text-sm leading-snug mb-1.5">
                                {epTitle}
                              </h3>
                              <div className="flex items-center gap-3 text-xs text-stone-400">
                                {episode.duration && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {episode.duration}
                                  </span>
                                )}
                                {episode.date && (
                                  <span className="flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" />
                                    {format(new Date(episode.date), "MMM d, yyyy")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-500 flex-shrink-0 mt-1 transition-colors" />
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-stone-400 bg-stone-50 rounded-xl border border-stone-100">
                      <div className="text-center">
                        <Play className="w-7 h-7 text-stone-300 mx-auto mb-2" />
                        <p className="text-sm">No episodes yet</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Latest episode card + subscribe */}
            <div className="space-y-4">

              {/* Latest episode highlight */}
              {latestEpisode && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">Latest Episode</p>

                    {toImageUrl(latestEpisode.image) && (
                      <Link href={toEpisodeHref(latestEpisode)} className="block rounded-xl overflow-hidden aspect-video mb-4 relative group">
                        <Image
                          src={toImageUrl(latestEpisode.image)!}
                          alt={latestEpisode.title || "Episode thumbnail"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                          </div>
                        </div>
                      </Link>
                    )}

                    <h3 className="font-bold text-stone-900 text-sm leading-snug mb-2 line-clamp-2">
                      {formatEpisodeTitle(latestEpisode.title || "Untitled Episode")}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-4">
                      {latestEpisode.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {latestEpisode.duration}
                        </span>
                      )}
                      {latestEpisode.date && (
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {format(new Date(latestEpisode.date), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>

                    {toEpisodeHref(latestEpisode) && (
                      <Link
                        href={toEpisodeHref(latestEpisode)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        Listen to Episode
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Subscribe nudge */}
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
                <p className="text-sm font-bold text-stone-900 mb-1">Enjoy this show?</p>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">
                  New conversations every Tuesday. Subscribe so you never miss an episode.
                </p>
                <a
                  href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7049506606413213696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-900 text-sm font-semibold rounded-xl transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Follow on LinkedIn
                </a>
              </div>

              {/* Back link */}
              <Link
                href="/episodes"
                className="flex items-center justify-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors py-2"
              >
                ← All episodes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
