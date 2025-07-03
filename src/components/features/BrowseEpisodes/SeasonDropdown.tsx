"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/src/lib/sanity-utils";
import { ALL_SEASONS_QUERY } from "@/src/lib/queries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export const SeasonDropdown = ({
  setActiveSeason,
}: {
  setActiveSeason: React.Dispatch<React.SetStateAction<any>>;
}) => {
  // Define Season type for proper typing
  interface Season {
    title: string;
    number: number;
    _id: string;
  }

  const [data, setData] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    client
      .fetch(ALL_SEASONS_QUERY)
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Immediately set active season so episodes can be fetched
  useEffect(() => {
    // Only fire once when data is loaded
    if (data.length > 0) {
      setActiveSeason(data[0].title);
    }
  }, [data, setActiveSeason]);

  if (isLoading) return <div className="text-gray-500">Loading seasons...</div>;
  if (error) return <div className="text-red-500">Error loading seasons</div>;
  if (data.length === 0) return null;

  return (
    <Select
      onValueChange={(value: string) => setActiveSeason(value)}
      defaultValue={data[0].title}
    >
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue placeholder="Select Season" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Seasons</SelectLabel>
          {data.map((season, idx: number) => (
            <SelectItem key={idx} value={season.title}>
              {season.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
