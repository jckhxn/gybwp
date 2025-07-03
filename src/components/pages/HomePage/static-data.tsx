// @ts-nocheck
import routes from "@/src/app/(website)/routes";
import * as podcast from "./episode-data";

// types
import { seasonType, episodeType } from "./episode-data";

// SWR
// import useSWR from "swr";
import { client } from "@/src/lib/sanity-utils";
import { SEASON_EPISODES_QUERY } from "@/src/lib/queries";

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

// export const useGetEpisodesBySeason = (seasonToFind?: number) => {
//   const { data, error, isLoading } = useSWR(
//     // Prevent it from firing unwanted network calls on intial paint.
//     seasonToFind ? SEASON_EPISODES_QUERY : null,
//     (query) => client.fetch(query, { seasonNumber: seasonToFind })
//   );

//   if (data) return data;
// };
