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
} from "@/src/app/(website)/components/ui/select";
import {
  ALL_SEASONS_QUERY,
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
  const { data, error, isLoading } = useSWR(ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // Immediately set active season so episodes can be fetched.
  useEffect(() => {
    // Only fire once.
    if (data) setActiveSeason(data[0].title);
  }, [data, setActiveSeason]);

  return (
    <Select
      onValueChange={(value: any) => setActiveSeason(value)}
      aria-label="Season Dropdown"
    >
      <SelectTrigger aria-label="Season Dropdown" className="w-[280px] ">
        <SelectValue placeholder={data ? "Select a season" : ""} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> Seasons</SelectLabel>

          {data?.map(({ title }: { title: string }, idx: number) => (
            <SelectItem aria-label={title} key={idx} value={title}>
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
