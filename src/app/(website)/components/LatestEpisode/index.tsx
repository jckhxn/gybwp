"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollToSection } from "../shared/ScrollToSection";
import { client } from "../../sanity/sanity-utils";
import { LATEST_EPISODE, PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { formatDate } from "../../lib/utils";

export const LatestEpisode = () => {
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        // Fetch the latest episode directly using the new LATEST_EPISODE query
        const latestEpisodeData = await client.fetch(LATEST_EPISODE);

        if (latestEpisodeData && latestEpisodeData.youtube?.uuid) {
          setLatestEpisode(latestEpisodeData.youtube);
        }
        if (latestEpisodeData && latestEpisodeData.uuid) {
          // Fetch detailed information for this episode
          const episodeDetails = await client.fetch(PODCAST_DETAILS_QUERY, {
            uuid: latestEpisodeData.youtube?.uuid,
          });

          if (episodeDetails && episodeDetails.length > 0) {
            setLatestEpisode(episodeDetails[0]);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching latest episode:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center">
          <p>Loading latest episode...</p>
        </div>
      </section>
    );
  }

  if (error || !latestEpisode) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center">
          <p>Unable to load the latest episode. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center gap-4 md:gap-8 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Latest Episode
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              Listen to our most recent conversation with industry leaders.
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl">
            <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-8">
              <div className="relative group aspect-video overflow-hidden rounded-l-xl">
                {/* react-youtube here */}
                <Image
                  src={
                    latestEpisode.thumbnail ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  width={600}
                  height={400}
                  alt={`${latestEpisode.episodeName || "Latest Episode"} Cover`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-primary/90 p-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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
                      className="text-primary-foreground h-8 w-8"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    {latestEpisode.title ||
                      `Episode ${latestEpisode.episodeNumber || ""}`}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Released{" "}
                    {latestEpisode.publishedAt
                      ? formatDate(latestEpisode.publishedAt)
                      : "Recently"}
                  </p>
                </div>
                <p className="text-muted-foreground">
                  {latestEpisode.blurb ||
                    "Tune in to our latest episode where we discuss important topics and insights with industry experts."}
                </p>
                <div className="pt-4">
                  <Link
                    href={`/episode/${latestEpisode.uuid}`}
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                  >
                    View Episode Details
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
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full pt-6">
            <ScrollToSection
              targetId="episodes"
              className="inline-flex items-center text-primary hover:underline"
            >
              Browse all episodes
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
                className="ml-1 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </ScrollToSection>
          </div>
        </div>
      </div>
    </section>
  );
};
