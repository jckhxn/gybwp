import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import Button from "@/src/app/(website)/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/(website)/components/ui/avatar";
import { Separator } from "@/src/app/(website)/components/ui/separator";
import { Badge } from "@/src/app/(website)/components/ui/badge";
import PodcastPlayer from "@/src/app/(website)/episode/[uuid]/podcast-player";
import SocialShare from "./social-share";
import RelatedEpisodes from "./related-episodes";
import GuestBio from "./guest-bio";
import ListenOnPlatforms from "./listen-on-platforms";
import routes from "@/src/app/(website)/routes";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { GUEST_DETAIL_QUERY } from "@/src/app/(website)/lib/queries";
import { urlFor } from "../../lib/utils";

// Get guest data from Sanity
async function getGuestData(slug: string) {
  const guestData = await client.fetch(GUEST_DETAIL_QUERY, { slug });

  if (!guestData) {
    throw new Error(`Guest with slug "${slug}" not found`);
  }

  // Format the episode date if available
  if (guestData.latestEpisode?.date) {
    guestData.latestEpisode.date = format(
      new Date(guestData.latestEpisode.date),
      "MMMM d, yyyy"
    );
  }

  // Format dates for previous episodes
  if (guestData.previousEpisodes) {
    guestData.previousEpisodes = guestData.previousEpisodes.map(
      (episode: any) => ({
        ...episode,
        date: episode.date
          ? format(new Date(episode.date), "MMMM d, yyyy")
          : "",
      })
    );
  }

  return guestData;
}

export async function generateMetadata({
  params,
}: {
  params: { guest: string | string[] };
}): Promise<Metadata> {
  const slug = Array.isArray(params.guest) ? params.guest[0] : params.guest;
  const guestData = await getGuestData(slug);

  return {
    title: `${guestData.name} - ${guestData.latestEpisode?.title || "Guest"} | Growing Your Business With People`,
    description: guestData.latestEpisode?.description || guestData.bio,
    openGraph: {
      images: [guestData.image || "/placeholder.svg"],
    },
  };
}

export default async function GuestPage({
  guest,
}: {
  guest: string | string[];
}) {
  const slug = Array.isArray(guest) ? guest[0] : guest;
  const guestData = await getGuestData(slug);

  return (
    <div className="container max-w-6xl py-8 mx-auto">
      {/* Hero Section */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg aspect-square md:aspect-auto md:h-[350px]">
            <PodcastPlayer videoId={guestData.latestEpisode?.youtube?.id} />
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/10">
              <AvatarImage
                src={urlFor(guestData.image).url() || "/placeholder.svg"}
                alt={guestData.name}
              />
              <AvatarFallback>
                {guestData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{guestData.name}</h2>
              <p className="text-muted-foreground">{guestData.title}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>{guestData.about}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ListenOnPlatforms />
            <SocialShare />
          </div>
        </div>

        <div className="space-y-4">
          {guestData.latestEpisode ? (
            <>
              <div className="space-y-2">
                <Badge variant="outline" className="text-sm font-medium">
                  Episode {guestData.latestEpisode.number}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {guestData.latestEpisode.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>{guestData.latestEpisode.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{guestData.latestEpisode.duration}</span>
                </div>
              </div>

              <p className="text-lg">{guestData.latestEpisode.description}</p>

              {/* <PodcastPlayer
                audioUrl={guestData.latestEpisode.audioUrl}
                title={guestData.latestEpisode.title}
              /> */}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                No episodes available for this guest yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-12" />

      {/* Previous Episodes */}
      {guestData.previousEpisodes && guestData.previousEpisodes.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            Previous Episodes with {guestData.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guestData.previousEpisodes.map((episode: any, idx: number) => (
              <Link
                href={`/episode/${episode.uuid}`}
                key={episode.uuid || idx}
                className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 block"
              >
                <div className="aspect-video bg-gray-100 relative">
                  <Image
                    src={episode.image || "/placeholder.svg"}
                    alt={episode.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="mb-2">
                    Episode {episode.number}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {episode.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>{episode.date}</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-4 h-4" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="mt-4 text-primary font-medium flex items-center">
                    View Episode <span className="ml-1">&gt;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Separator className="my-12" />

      {/* Related Episodes */}
      {/* <RelatedEpisodes episodes={guestData.relatedEpisodes} /> */}

      {/* Call to Action */}
      <section className="p-8 text-center rounded-lg bg-primary/5">
        <h2 className="mb-4 text-2xl font-bold">Enjoy this episode?</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Subscribe to "Growing Your Business With People" to never miss a new
          episode and get weekly insights on business growth.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
            passHref
          >
            <Button size="lg" className="cursor-pointer">
              Subscribe on Apple Podcasts
            </Button>
          </Link>
          <Link href={routes.external.listen} passHref>
            <Button size="lg" variant="outline" className="cursor-pointer">
              Listen on BuzzSprout
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
