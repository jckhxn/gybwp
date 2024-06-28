"use client";

import { useState } from "react";
import useSWR from "swr";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { EPISODES_BY_SEASON_QUERY } from "../../lib/queries";
import SeasonDropdown from "@/src/app/(website)/components/SeasonDropdown";
import EpisodeCard from "../EpisodeCard";

export function EpisodesPage() {
  const [activeSeason, setActiveSeason] = useState(null);

  const { data, error, isLoading } = useSWR(
    activeSeason ? [EPISODES_BY_SEASON_QUERY, activeSeason] : null,
    ([query, season]) => client.fetch(query, { name: season })
  );

  return (
    <div className="bg-light">
      <main className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Growing Your Business With People Podcast!
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-400 md:text-xl">
            Catch up on the latest episodes.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
          <SeasonDropdown setActiveSeason={setActiveSeason} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="col-span-full text-center">Loading episodes...</p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">
              Error loading episodes. Please try again.
            </p>
          ) : data && data.length > 0 ? (
            // @ts-ignore
            data.map((episode, idx) => (
              <EpisodeCard key={episode._id || idx} {...episode} />
            ))
          ) : (
            <p className="col-span-full text-center">
              No episodes found for this season.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
