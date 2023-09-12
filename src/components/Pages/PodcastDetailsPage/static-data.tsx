import routes from "routes";

// data
import { PODCAST } from "../HomePage/static-data";
import { getEpisodeDetails } from "../../../app/sanity/sanity-utils";

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const DATA = {
  backButtonText: "Back",
  nextEpisodeButton: "Next Episode",
  featuredGuestButtonText: "Check them out",
  aboutThisEpisodeHeader: "About This Episode",
  importantLinksHeader: "Important Links",
};

export const CTA = {
  header:
    "Subscribe today and embark on a transformative journey towards driving business success through strategic people management.",
  buttonText: "Subscribe",
  buttonURL: routes.external.subscribe,
};

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

export const getEpisode = (
  season: string,
  episode: string,
  episodes: [Object]
) => {
  return episodes;
  // console.log(episodes);
  // return PODCAST.filter(
  //   ({ seasonNumber }) => seasonNumber === parseInt(season)
  // )[0]?.episodes.filter(({ uuid }) => uuid === episode)[0];
};

export const getNextEpisode = (episode: string, episodes: [Object]) => {
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
