import Image from "next/image";
import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";

import Button from "@/src/app/(website)/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/(website)/components/ui/avatar";
import { Separator } from "@/src/app/(website)/components/ui/separator";
import { Badge } from "@/src/app/(website)/components/ui/badge";
import PodcastPlayer from "./podcast-player";
import SocialShare from "./social-share";
import RelatedEpisodes from "./related-episodes";
import GuestBio from "./guest-bio";
import ListenOnPlatforms from "./listen-on-platforms";

// This would be replaced with actual data fetching in a real implementation
async function getGuestData(slug: string) {
  // Mock data for demonstration
  return {
    name: "David Thomas",
    role: "CEO & Founder, Example Company",
    bio: "David Thomas is the CEO and Founder of Example Company, where he leads a team focused on innovative business solutions. With over 15 years of experience in the industry, David has helped numerous businesses scale their operations through effective people management strategies.",
    longBio:
      "David Thomas is the CEO and Founder of Example Company, where he leads a team focused on innovative business solutions. With over 15 years of experience in the industry, David has helped numerous businesses scale their operations through effective people management strategies.\n\nPrior to founding Example Company, David served as COO at Growth Ventures, where he oversaw a 300% increase in revenue over just 4 years. His approach to business growth centers on building strong teams and creating people-centric company cultures.\n\nDavid is also the author of 'People-First Business Growth' and a frequent speaker at industry conferences. He holds an MBA from Stanford University and serves on the board of several non-profit organizations.",
    image: "/placeholder.svg?height=400&width=400",
    episode: {
      title: "Building a People-First Company Culture",
      number: 42,
      date: "April 15, 2024",
      duration: "48 minutes",
      description:
        "In this episode, David Thomas shares his insights on creating a people-first company culture that drives business growth. He discusses practical strategies for leadership development, employee engagement, and building teams that thrive even during challenging times.",
      audioUrl: "#",
      topics: [
        "Leadership",
        "Company Culture",
        "Team Building",
        "Business Growth",
      ],
      highlights: [
        "How to identify and develop future leaders within your organization",
        "Three key elements of a people-first company culture",
        "Practical strategies for improving employee engagement and retention",
        "Measuring the ROI of investing in your people",
      ],
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
      website: "https://example.com",
    },
    relatedEpisodes: [
      {
        id: "jane-smith",
        title: "Scaling Your Team Without Losing Your Culture",
        guest: "Jane Smith",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "michael-johnson",
        title: "Leadership Strategies for Rapid Growth",
        guest: "Michael Johnson",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "sarah-williams",
        title: "Building Resilient Teams in Uncertain Times",
        guest: "Sarah Williams",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: { guest: string | string[] };
}): Promise<Metadata> {
  const slug = Array.isArray(params.guest) ? params.guest[0] : params.guest;
  const guestData = await getGuestData(slug);

  return {
    title: `${guestData.name} - ${guestData.episode.title} | Growing Your Business With People`,
    description: guestData.episode.description,
    openGraph: {
      images: [guestData.image],
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
            <Image
              src={guestData.image || "/placeholder.svg"}
              alt={guestData.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/10">
              <AvatarImage
                src={guestData.image || "/placeholder.svg"}
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
              <p className="text-muted-foreground">{guestData.role}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>{guestData.bio}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ListenOnPlatforms />
            <SocialShare />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-sm font-medium">
              Episode {guestData.episode.number}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {guestData.episode.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{guestData.episode.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{guestData.episode.duration}</span>
            </div>
          </div>

          <p className="text-lg">{guestData.episode.description}</p>

          {/* <PodcastPlayer
            audioUrl={guestData.episode.audioUrl}
            title={guestData.episode.title}
          /> */}
        </div>
      </div>

      <Separator className="my-12" />

      {/* Previous Episodes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">
          Previous Episodes with {guestData.name}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mock data - in a real app, this would come from the API */}
          {[1, 2, 3].map((episode) => (
            <div
              key={episode}
              className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-video bg-gray-100 relative">
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
                  Episode {42 - episode}
                </Badge>
                <h3 className="font-semibold text-lg mb-2">
                  {
                    [
                      "Building High-Performance Teams",
                      "Leading Through Change",
                      "Creating a Culture of Innovation",
                    ][episode - 1]
                  }
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {guestData.name} discusses strategies for{" "}
                  {
                    [
                      "developing leadership at all levels",
                      "navigating organizational transitions",
                      "fostering creativity in your organization",
                    ][episode - 1]
                  }
                  .
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {
                      [
                        "March 10, 2024",
                        "January 15, 2024",
                        "October 22, 2023",
                      ][episode - 1]
                    }
                  </span>
                  <span className="mx-1">•</span>
                  <Clock className="w-4 h-4" />
                  <span>{["42 min", "38 min", "45 min"][episode - 1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
          <Button size="lg">Subscribe on Apple Podcasts</Button>
          <Button size="lg" variant="outline">
            Subscribe on Spotify
          </Button>
        </div>
      </section>
    </div>
  );
}
