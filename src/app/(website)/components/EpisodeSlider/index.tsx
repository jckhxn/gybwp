"use client";

import { SVGProps, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import {
  EPISODES_BY_SEASON_QUERY,
  SEASON_EPISODES_QUERY,
} from "../../lib/queries";
import EpisodeCard from "@/src/app/(website)/components/EpisodeCard";

import SeasonDropdown from "@/src/app/(website)/components/SeasonDropdown";

export default function EpisodeSlider() {
  const [activeSeason, setActiveSeason] = useState();

  // // Get latest season episodes initially
  // const { data, error, isLoading } = useSWR(
  //   activeSeason ? SEASON_EPISODES_QUERY : null,
  //   (query) => client.fetch(query, { seasonNumber: activeSeason })
  // );

  // Get latest season episodes initially (by season name)
  const { data, error, isLoading } = useSWR(
    activeSeason ? EPISODES_BY_SEASON_QUERY : null,
    (query) => client.fetch(query, { name: activeSeason })
  );

  useEffect(() => {
    mutate(EPISODES_BY_SEASON_QUERY);
  }, [activeSeason]);

  return (
    <section className="w-full max-w-6xl mx-auto py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Episodes</h2>
        <SeasonDropdown setActiveSeason={setActiveSeason} />
        {/* This scroll doesn't work yet */}
        {/* <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div> */}
      </div>
      <div className="flex gap-4   overflow-x-auto scrollbar-hide">
        {!isLoading ? (
          <>
            {data && Array.isArray(data) && data.length > 0 ? (
              data.map((episode, idx) => (
                <div key={idx} className="flex-shrink-0 w-80">
                  <EpisodeCard key={idx} {...episode} />
                </div>
              ))
            ) : (
              <p>No episodes found for this season.</p>
            )}
          </>
        ) : (
          <p>Loading episodes...</p>
        )}
      </div>
    </section>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
