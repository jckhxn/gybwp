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
} from "@/src/components/ui/select";
import { ALL_SEASONS_QUERY } from "@/src/lib/queries";
import { client } from "@/src/lib/sanity-utils";
import useSWR from "swr";
import { 
  Season, 
  getSeasonIdentifier, 
  getSeasonForUrl, 
  getSeasonDisplayName 
} from "@/src/lib/utils";

interface SeasonDropdownProps {
  setActiveSeason: React.Dispatch<React.SetStateAction<any>>;
  seasons?: Season[]; // Optional prop for custom seasons
  activeSeason?: string | null; // Optional prop for current active season
  defaultSeason?: Season | null; // Optional prop for default season
}

export default function SeasonDropdown({
  setActiveSeason,
  seasons,
  activeSeason,
  defaultSeason,
}: SeasonDropdownProps) {
  // Only fetch seasons from API if not provided as prop
  const {
    data: fetchedSeasons,
    error,
    isLoading,
  } = useSWR(seasons ? null : ALL_SEASONS_QUERY, (query) =>
    client.fetch(query)
  );

  // Use provided seasons or fetched seasons
  const seasonsData = seasons || fetchedSeasons;

  // Immediately set active season so episodes can be fetched.
  useEffect(() => {
    // Only fire once and if no active season is already set
    if (seasonsData && seasonsData.length > 0 && !activeSeason) {
      // Use default season if provided, otherwise use first season
      const initialSeason = defaultSeason || seasonsData[0];
      setActiveSeason(getSeasonForUrl(initialSeason));
    }
  }, [seasonsData, setActiveSeason, activeSeason, defaultSeason]);

  // Get display value for the current active season
  const getDisplayValue = () => {
    if (!activeSeason || !seasonsData) return "";
    const season = getSeasonIdentifier(seasonsData, activeSeason);
    return season ? getSeasonDisplayName(season) : activeSeason;
  };

  return (
    <Select
      onValueChange={(value: any) => setActiveSeason(value)}
      aria-label="Season Dropdown"
      value={activeSeason || undefined}
    >
      <SelectTrigger
        aria-label="Season Dropdown"
        className="w-[280px] !border-gray-300 !bg-white !text-gray-900 focus:!ring-primary/20 focus:!border-primary hover:!border-gray-400 transition-colors !shadow-sm"
      >
        <SelectValue
          placeholder={seasonsData ? "Select a season" : ""}
          className="!text-gray-900 placeholder:!text-gray-500"
        />
      </SelectTrigger>
      <SelectContent className="!border-gray-200 !bg-white !shadow-lg !text-gray-900 z-50">
        <SelectGroup>
          <SelectLabel className="!text-gray-700 !font-medium">
            {" "}
            Seasons
          </SelectLabel>

          {seasonsData?.map((season: Season, idx: number) => (
            <SelectItem
              aria-label={getSeasonDisplayName(season)}
              key={idx}
              value={getSeasonForUrl(season)}
              className="!text-gray-900 focus:!bg-gray-100 hover:!bg-gray-50 !cursor-pointer data-[highlighted]:!bg-gray-100 data-[highlighted]:!text-gray-900"
            >
              {getSeasonDisplayName(season)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
