import routes from "routes";
import * as podcast from "./episode-data";

// types
import { seasonType, episodeType } from "./episode-data";

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
  buttonText: "Subscribe to our Newsletter!",
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

export const getEpisodesBySeason = (seasonToFind: number) => {
  const foundSeason = PODCAST.filter(
    (season) => season.seasonNumber === seasonToFind
  )[0];
  return [...foundSeason.episodes].reverse();

  // try {
  //   const episodes = await getSeasonByNumber(seasonToFind);
  //   if (!episodes) throw Error("No epsiodes");
  //   return episodes;
  //   // @ts-ignore
  // } catch ({ message }) {
  //   console.log(message);
  // }
};

export const getEpisodesBySponsor = (uuid: string) => {
  const sponsoredEpisodes: episodeType[] = [];

  PODCAST.forEach((season) => {
    season.episodes.forEach((episode) => {
      episode.sponsors.forEach((id) => {
        if (id === uuid) {
          sponsoredEpisodes.push(episode);
        }
      });
    });
  });

  return sponsoredEpisodes;
};
