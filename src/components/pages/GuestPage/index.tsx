import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import React from "react";

import { Button } from "@/src/components/ui/Button";
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

  return {
    title: `${guestData.name} - Guest | Growing Your Business With People`,
    description:
      guestData.guestProfile?.bio || `Guest profile for ${guestData.name}`,
    openGraph: {
      images: [guestData.guestProfile?.profileImage || "/placeholder.svg"],
    },
  };
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

  // For now, let's just display the basic guest info without episodes
  console.log("Successfully found guest:", guestData);
  console.log("Episodes:", guestData.episodes);

  // Extract latest episode (first item) and all episodes for the sidebar
  const latestEpisode = guestData.episodes?.[0];
  const allEpisodesForSidebar = guestData.episodes?.slice(0, 4); // Show up to 4 episodes total

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container max-w-7xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left Column - Video Player and Episode Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Latest Episode Player */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {latestEpisode ? (
                <div className="space-y-6 p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        Latest Episode
                      </Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {latestEpisode.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {latestEpisode.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {latestEpisode.date &&
                          format(new Date(latestEpisode.date), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="rounded-xl overflow-hidden aspect-video shadow-md">
                    {latestEpisode.youtube?.id ? (
                      <PodcastPlayer videoId={latestEpisode.youtube.id} />
                    ) : (
                      <div className="bg-gray-200 h-full flex items-center justify-center">
                        <span className="text-gray-500">
                          Video not available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Episode Description */}
                  {latestEpisode.description && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {latestEpisode.description}
                      </p>
                    </div>
                  )}

                  {/* Episode Link */}
                  {latestEpisode.uuid && (
                    <div className="flex justify-center pt-2">
                      <Link
                        href={`/episode/${encodeURIComponent(latestEpisode.uuid)}`}
                        className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2"
                      >
                        View Full Episode Details
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-200 h-60 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No episodes found</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Guest Profile */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-20 h-20 border-4 border-primary/20 shadow-lg">
                    <AvatarImage
                      src={
                        urlFor(guestData.guestProfile?.profileImage).url() ||
                        "/placeholder.svg"
                      }
                      alt={guestData.name}
                    />
                    <AvatarFallback className="text-xl font-bold">
                      {guestData.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {guestData.name}
                    </h2>
                    {guestData.guestProfile?.title && (
                      <p className="text-lg text-primary font-medium">
                        {guestData.guestProfile.title}
                      </p>
                    )}
                    {guestData.guestProfile?.company && (
                      <p className="text-gray-600">
                        {guestData.guestProfile.company}
                      </p>
                    )}
                  </div>
                </div>

                {guestData.guestProfile?.bio && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      About
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {guestData.guestProfile.bio}
                    </p>
                  </div>
                )}

                {guestData.guestProfile?.website && (
                  <div className="pt-4 border-t border-gray-100">
                    <a
                      href={guestData.guestProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-primary hover:text-white h-10 px-6 py-2"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Episodes featuring {guestData.name}
            </h3>
            {allEpisodesForSidebar && allEpisodesForSidebar.length > 0 ? (
              <div className="space-y-4">
                {allEpisodesForSidebar.map(
                  (episode: EpisodeType, index: number) => (
                    <Link
                      key={episode.uuid || index}
                      href={`/episode/${encodeURIComponent(episode.uuid)}`}
                      className="block"
                    >
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/30 group">
                        <div className="flex gap-4">
                          {episode.image && (
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                              <Image
                                src={episode.image}
                                alt={episode.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                {episode.title}
                              </h4>
                              {episode.number && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-2 flex-shrink-0 font-medium">
                                  #{episode.number}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {episode.duration}
                              </div>
                              {episode.date && (
                                <div className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3" />
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
              <div className="flex items-center justify-center h-40 text-gray-500 bg-white rounded-xl border border-gray-200">
                <p>No episodes found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
