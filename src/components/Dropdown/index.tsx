// @ts-nocheck
import React, { useEffect, useState } from "react";

// components
import { Section } from "components/shared";
import Button from "components/Button";

// copy
import { PODCAST } from "components/Pages/HomePage/static-data";

// SWR
import useSWR from "swr";
import { groq, createClient } from "next-sanity";
import { seasonType } from "components/Pages/HomePage/episode-data";
const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: true,
});

// Sort through the Sanity Season duplicates
// Make them in order lol
function getUniqueValuesWithSet(object: seasonType) {
  const uniqueValues = new Set();

  for (const [key, value] of Object.entries(object)) {
    uniqueValues.add(value);
  }

  return uniqueValues;
}

const Dropdown = ({
  setActiveSeason,
}: {
  setActiveSeason: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // This groq query returns all seasons, in order, that have episodes in them
  // *[_type == "seasons" && count(episodes) > 0]  | order(seasonNumber asc)
  const { data, error, isLoading } = useSWR(
    groq`{"seasonName":array::unique(*[_type == "episode"].seasonName),"seasonNumber":array::unique(*[_type == "episode" ].seasonNumber)}`,
    (query) => client.fetch(query)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [podcast, setPodcast] = useState();

  const handleClick = (seasonNumber?: number) => {
    if (seasonNumber) {
      setActiveSeason(seasonNumber);  
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isLoading) {
      // PODCAST is an array of seasons, seasons are objects with seasonName,seasonNumber.

      // Take SeasonNames, make it a Set (to only have unique values)
      // Transform into an Array.
      // Take both Season Name & Number and make it an Object
      // Put Object in podcasts
      // Iterate in Dropdown Render.
      const podcasts = [];

      const uniqueSeasonsSet = getUniqueValuesWithSet(data.seasonName);

      const uniqueSeasonsArray = Array.from(uniqueSeasonsSet);
      // Sort the season names in the desired order (e.g., "Season One" before "Season Two")

      for (let i = 0; i < uniqueSeasonsArray.length; i++) {
        const podcast = {};

        podcast.seasonName = uniqueSeasonsArray[i];
        podcast.seasonNumber = data.seasonNumber[i];
        podcasts.push(podcast);
      }

      setPodcast(podcasts);
    }
  }, [data, isLoading]);

  return (
    <Section relative>
      <Button
        color="white"
        className="inline-flex border-b border-black rounded-none px-2 py-1"
        onClick={() => handleClick()}
      >
        More
        <span
          className={
            isOpen ? "-rotate-180 pr-2 self-center" : "pl-2 self-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </Button>

      {isOpen && (
        <div className="z-50 absolute end-0 top-auto mt-2">
          <div className="w-40 min-w-fit rounded border border-gray-200 bg-white">
            <ul className="space-y-1 border-t border-gray-200 p-4">
              {podcast.map(({ seasonName, seasonNumber }: seasonType) => (
                <li
                  key={seasonName}
                  className="hover:text-gray-700/75 cursor-pointer"
                  onClick={() => handleClick(seasonNumber)}
                >
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    Season {seasonNumber}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Dropdown;
