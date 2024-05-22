"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/app/components/ui/select";
import {
  INITIAL_SEASON_EPISODES_QUERY,
  TOTAL_SEASONS_QUERY,
} from "../../lib/queries";
import { client } from "../../sanity/sanity-utils";
import useSWR from "swr";

export default function SeasonDropdown({
  setActiveSeason,
}: {
  setActiveSeason: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { data, error, isLoading } = useSWR(
    INITIAL_SEASON_EPISODES_QUERY,
    (query) => client.fetch(query)
  );

  // Immediately set active season so episodes can be fetched.
  useEffect(() => {
    // Only fire once.
    if (data) setActiveSeason(data?.latestSeasonNumber);
  }, [data, setActiveSeason]);

  return (
    <Select onValueChange={(value: any) => setActiveSeason(value)}>
      <SelectTrigger className="w-[280px] ">
        <SelectValue placeholder={data ? "Select a season" : ""} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel aria-label="Season Dropdown"> Seasons</SelectLabel>
          {/* List all seasons, set value equal to season number you're going to fetch for. */}
          {Array.from({ length: data?.latestSeasonNumber }, (_, index) => (
            // @ts-ignore
            <SelectItem
              key={index} // @ts-ignore
              value={Number(index + 1)}
            >
              Season {index + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
