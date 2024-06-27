"use client";
import { useEffect, useState } from "react";
import SeasonDropdown from "@/src/app/(website)/components/SeasonDropdown";

import useSWR, { mutate } from "swr";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import {
  EPISODES_BY_SEASON_QUERY,
  INITIAL_SEASON_EPISODES_QUERY,
  SEASON_EPISODES_QUERY,
} from "../../lib/queries";
import EpisodeCard from "../EpisodeCard";

export function EpisodesPage() {
  const [activeSeason, setActiveSeason] = useState();

  const { data, error, isLoading } = useSWR(
    activeSeason ? EPISODES_BY_SEASON_QUERY : null,
    (query) => client.fetch(query, { name: activeSeason })
  );

  useEffect(() => {
    mutate(EPISODES_BY_SEASON_QUERY);
  }, [activeSeason]);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Growing Your Business With People Podcast!
                </h1>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  Catch up on the latest episodes.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <SeasonDropdown setActiveSeason={setActiveSeason} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-8">
        <div className="container grid grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-8">
          {!isLoading && (
            <>
              {isLoading || !data ? (
                <p>Loading episodes...</p>
              ) : data && Array.isArray(data) && data.length > 0 ? (
                data.map((episode, idx) => (
                  <EpisodeCard key={idx} {...episode} />
                ))
              ) : (
                <p>No episodes found for this season.</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
