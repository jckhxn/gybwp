// @ts-nocheck
import routes from "routes";
import * as podcast from "./episode-data";

// types
import { seasonType, episodeType } from "./episode-data";

// SWR
import useSWR from "swr";
import { groq, createClient } from "next-sanity";

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
  const { data, error, isLoading } = useSWR(
    groq`*[_type == "episode"] | order(uuid asc)`,
    (query) => client.fetch(query)
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const episodesArray = Object.keys(data)
    .filter((key) => key !== "_persist")
    .map(function (property) {
      return data[property];
    });

  const foundSeason = episodesArray.filter(
    // @ts-ignore
    (season) => season.seasonNumber === seasonToFind
  );

  return [...foundSeason].reverse();
};

export const getEpisodesBySponsor = (uuid: string, episodesData: object) => {
  // console.log(episodesData);
  // const sponsoredEpisodes: episodeType[] = [];
  // const episodes = store.getState().episodes;
  // const episodesArray = Object.keys(episodes)
  //   .filter((key) => key !== "_persist")
  //   .map(function (property) {
  //     return episodes[property];
  //   });
  // const getValueForKey = (obj, key) => {
  //   const keys = Object.keys(obj);
  //   const value = keys.find((k) => k === key);
  //   return obj[value];
  // };
  // episodesArray.map((episode) => {
  //   // Map over every episode, if episode sponsors == uuid,
  //   // push to sponsored Episodes
  //   const value = getValueForKey(episode, "sponsors");
  //   if (value?.includes(uuid)) {
  //     sponsoredEpisodes.push(episode);
  //   }
  //   Object.keys(episode).map((episodeDetails) => {});
  // });
  // return sponsoredEpisodes;
};
