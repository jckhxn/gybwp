import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, Clock, ArrowRight, Play, User, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import React from "react";

import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import {
  PodcastPlayer,
  type PlayerHandle,
} from "@/src/components/features/episodes";
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

// Type for guest data returned by GUEST_DETAIL_QUERY
interface GuestDataType {
  _id: string;
  name: string;
  guestProfile?: {
    title?: string;
    bio?: string;
    company?: string;
    website?: string;
    profileImage?: string;
    socialLinks?: Record<string, string>;
  };
  episodes?: EpisodeType[];
}

// Type for host data returned by HOST_DETAIL_QUERY
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

// Check if slug belongs to a host document and return host data
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

  // Check if this is a host slug
  const hostData = await getHostData(slug);
  if (hostData) {
    // Return metadata for consulting page or target page
    return {
      title: "Business Consulting - Growing Your Business With People",
      description:
        "Expert business consulting and coaching services to help grow your business.",
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

  // Use our new metadata generation utility
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

  // First check if this slug belongs to a host document
  const hostData = await getHostData(slug);
  if (hostData && hostData.pageReference) {
    // Use the pageReference to redirect to the specific page and component
    const targetUrl = buildComponentLinkUrl(hostData.pageReference);
    redirect(targetUrl);
  } else if (hostData) {
    // Fallback to consulting page with profile anchor if no pageReference
    redirect("/consulting#profile");
  }

  // Now try the original query
  const guestData = await loadQuery<GuestDataType>({
    query: GUEST_DETAIL_QUERY,
    params: { slug },
  });

  if (!guestData || !guestData.name) {
    throw new Error(`Guest with slug "${slug}" not found`);
  }

  // Extract latest episode (first item) and all episodes for the sidebar
  const latestEpisode = guestData.episodes?.[0];
  const allEpisodesForSidebar = guestData.episodes?.slice(0, 4); // Show up to 4 episodes total

  // Generate structured data for SEO
  const structuredData = generatePersonStructuredData({
    name: guestData.name,
    title: guestData.guestProfile?.title,
    about: guestData.guestProfile?.bio,
    image: guestData.guestProfile?.profileImage
      ? urlFor(guestData.guestProfile.profileImage).url()
      : undefined,
    website: guestData.guestProfile?.website,
    socialLinks: guestData.guestProfile?.socialLinks,
    episodes: guestData.episodes?.map((episode) => ({
      title: episode.title,
      url: `/episode/${episode.uuid}`,
      publishedAt: episode.date,
    })),
  });

  return (
    <>
      <JSONLD data={structuredData} id="person-jsonld" />
      
      {/* Hero Section - Dark Theme */}
      <section className="relative bg-surface-900 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container max-w-7xl py-16 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Guest Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-lg opacity-50" />
                <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-white/20 shadow-glow relative">
                  <AvatarImage
                    src={
                      urlFor(guestData.guestProfile?.profileImage).url() ||
                      "/placeholder.svg"
                    }
                    alt={guestData.name}
                  />
                  <AvatarFallback className="text-3xl font-bold bg-surface-800 text-white">
                    {guestData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            {/* Guest Info */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 mb-4">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Guest</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3">
                {guestData.name}
              </h1>
              {guestData.guestProfile?.title && (
                <p className="text-xl text-primary font-medium mb-2">
                  {guestData.guestProfile.title}
                </p>
              )}
              {guestData.guestProfile?.company && (
                <p className="text-lg text-surface-300">
                  {guestData.guestProfile.company}
                </p>
              )}
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                <div className="bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50">
                  <span className="text-2xl font-bold text-white">{guestData.episodes?.length || 0}</span>
                  <span className="text-surface-400 ml-2">Episodes</span>
                </div>
                {guestData.guestProfile?.website && (
                  <a
                    href={guestData.guestProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-surface-800/50 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-surface-700/50 flex items-center gap-2 hover:bg-surface-700/50 transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-white">Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="min-h-screen bg-surface-50">
        <div className="container max-w-7xl py-12 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left Column - Video Player and Episode Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Latest Episode Player */}
              <div className="bg-white rounded-3xl shadow-soft border border-surface-200 overflow-hidden">
                {latestEpisode ? (
                  <div className="space-y-6 p-6 lg:p-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                          <Sparkles className="h-3.5 w-3.5" />
                          Latest Episode
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-surface-900">
                        {latestEpisode.title}
                      </h2>
                      <div className="flex items-center gap-6 text-sm text-surface-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-secondary" />
                          {latestEpisode.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-accent" />
                          {latestEpisode.date &&
                            format(new Date(latestEpisode.date), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>

                    {/* Video Player */}
                    <div className="rounded-2xl overflow-hidden aspect-video shadow-medium border border-surface-200">
                      {latestEpisode.youtube?.id ? (
                        <PodcastPlayer videoId={latestEpisode.youtube.id} />
                      ) : (
                        <div className="bg-surface-100 h-full flex items-center justify-center">
                          <div className="text-center">
                            <Play className="h-12 w-12 text-surface-300 mx-auto mb-2" />
                            <span className="text-surface-500">
                              Video not available
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Episode Description */}
                    {latestEpisode.description && (
                      <div className="p-5 bg-surface-50 rounded-2xl border border-surface-200">
                        <p className="text-surface-600 leading-relaxed">
                          {latestEpisode.description}
                        </p>
                      </div>
                    )}

                    {/* Episode Link */}
                    {latestEpisode.uuid && (
                      <div className="flex justify-center pt-2">
                        <Link
                          href={`/episode/${encodeURIComponent(latestEpisode.uuid)}`}
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 group"
                        >
                          View Full Episode Details
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-surface-100 h-60 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-surface-300 mx-auto mb-2" />
                      <span className="text-surface-500">No episodes found</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Guest Bio */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-soft border border-surface-200 overflow-hidden">
                <div className="p-6 lg:p-8">
                  {guestData.guestProfile?.bio && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        About
                      </h4>
                      <p className="text-surface-600 leading-relaxed">
                        {guestData.guestProfile.bio}
                      </p>
                    </div>
                  )}

                  {guestData.guestProfile?.website && (
                    <div className="pt-4 border-t border-surface-200">
                      <a
                        href={guestData.guestProfile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Episodes Section */}
          <div className="mt-12 lg:mt-16 space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-surface-900">
              Episodes featuring {guestData.name}
            </h3>
            {allEpisodesForSidebar && allEpisodesForSidebar.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {allEpisodesForSidebar.map(
                  (episode: EpisodeType, index: number) => (
                    <Link
                      key={episode.uuid || index}
                      href={`/episode/${encodeURIComponent(episode.uuid)}`}
                      className="block group"
                    >
                      <div className="p-5 bg-white border border-surface-200 rounded-2xl hover:shadow-medium transition-all duration-300 cursor-pointer hover:border-primary/30 group h-full">
                        <div className="flex gap-4">
                          {episode.image && (
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-soft border border-surface-200">
                              <Image
                                src={episode.image}
                                alt={episode.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg text-surface-900 line-clamp-2 group-hover:text-primary transition-colors">
                                {episode.title}
                              </h4>
                              {episode.number && (
                                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full ml-2 flex-shrink-0 font-medium">
                                  #{episode.number}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-surface-500 mb-3 line-clamp-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-surface-400">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-secondary" />
                                {episode.duration}
                              </div>
                              {episode.date && (
                                <div className="flex items-center gap-1">
                                  <CalendarDays className="h-3.5 w-3.5 text-accent" />
                                  {format(
                                    new Date(episode.date),
                                    "MMM d, yyyy"
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-surface-500 bg-white rounded-2xl border border-surface-200">
                <div className="text-center">
                  <Play className="h-8 w-8 text-surface-300 mx-auto mb-2" />
                  <p>No episodes found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
