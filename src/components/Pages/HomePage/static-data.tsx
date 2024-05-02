// @ts-nocheck
import routes from "routes";
import * as podcast from "./episode-data";

// types
import { seasonType, episodeType } from "./episode-data";

// SWR
import useSWR from "swr";
import { createClient } from "next-sanity";
import { SEASON_EPISODES_QUERY } from "../../../app/lib/queries";

const client = createClient({
  projectId: "hxymd1na",
  dataset: "production",
  apiVersion: "2023-08-22",

  useCdn: true,
});

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const HERO = {
  header: "Welcome to Growing your business with People!",
  body: "Our podcast, “Growing your business with People!” is dedicated to CEOs and Business Leaders who understand that the key to growth is found in their biggest and most important investment - people!",
  buttonText: "Watch Now",
  buttonUrl: routes.external.subscribe,
  secondButtonText: "Listen Now",
  secondButtonUrl: routes.external.listen,
};

export const CTA = {
  header: "Growing your business with People!",
  body: "Growing your business with your biggest and most important investment - People!",
  buttonText: "Subscribe on LinkedIn",
  buttonUrl: routes.external.newsletter,
};

export const PODCAST: seasonType[] = [
  podcast.SEASON_ONE,
  podcast.SEASON_TWO,
  podcast.SEASON_THREE,
];

//
//
//
//
//
//
//
//
//
//
//
//
// DO NOT TOUCH ANYTHING BELOW THIS LINE

export const useGetEpisodesBySeason = (seasonToFind: number) => {
  const { data, error, isLoading } = useSWR(SEASON_EPISODES_QUERY, (query) =>
    client.fetch(query, { seasonNumber: seasonToFind })
  );
  if (data) return data;
};
