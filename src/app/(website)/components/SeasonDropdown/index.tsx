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
      <SelectTrigger
        aria-label="Season Dropdown"
        className="w-[280px] !border-gray-300 !bg-white !text-gray-900 focus:!ring-primary/20 focus:!border-primary hover:!border-gray-400 transition-colors !shadow-sm"
      >
        <SelectValue
          placeholder={data ? "Select a season" : ""}
          className="!text-gray-900 placeholder:!text-gray-500"
        />
      </SelectTrigger>
      <SelectContent className="!border-gray-200 !bg-white !shadow-lg !text-gray-900 z-50">
        <SelectGroup>
          <SelectLabel className="!text-gray-700 !font-medium">
            {" "}
            Seasons
          </SelectLabel>

          {data?.map(({ title }: { title: string }, idx: number) => (
            <SelectItem
              aria-label={title}
              key={idx}
              value={title}
              className="!text-gray-900 focus:!bg-gray-100 hover:!bg-gray-50 !cursor-pointer data-[highlighted]:!bg-gray-100 data-[highlighted]:!text-gray-900"
            >
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
