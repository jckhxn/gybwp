import { socialsType } from "../SponsorsPage/static-data";
import facebook from "public/social-logos/facebook.png";
import { PODCAST } from "../HomePage/static-data";

export const getEpisode = (season: string, episode: string) =>
  PODCAST.filter(
    ({ seasonNumber }) => seasonNumber === parseInt(season)
  )[0]?.episodes.filter(({ uuid }) => uuid === episode)[0];

export const getNextEpisode = (episode: string) => {
  let episodeFound = false;
  let nextEpisodeUUID;

  PODCAST.forEach((season) => {
    season.episodes.forEach((e) => {
      if (episodeFound) {
        nextEpisodeUUID = e.uuid;
        episodeFound = false;
      }

      if (e.uuid === episode) {
        episodeFound = true;
      }
    });
  });

  if (nextEpisodeUUID) {
    return `/episode/${nextEpisodeUUID}`;
  }

  return null;
};

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const SOCIALS: socialsType[] = [
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
  {
    name: "facebook",
    link: "http://www.facebook.com/abcd-typed",
    icon: facebook.src,
  },
];
