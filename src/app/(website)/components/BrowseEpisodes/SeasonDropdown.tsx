"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { ALL_SEASONS_QUERY } from "../../lib/queries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/app/(website)/components/ui/select";

export const SeasonDropdown = ({
  setActiveSeason,
}: {
  setActiveSeason: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    if (data && data.length > 0) {
      setActiveSeason(data[0].title);
    }
  }, [data, setActiveSeason]);

  if (isLoading) return <div className="text-gray-500">Loading seasons...</div>;
  if (error) return <div className="text-red-500">Error loading seasons</div>;
  if (!data || data.length === 0) return null;

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
          {data.map(({ title }: { title: string }, idx: number) => (
            <SelectItem key={idx} value={title}>
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
