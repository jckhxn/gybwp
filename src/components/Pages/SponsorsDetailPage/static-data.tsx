import routes from "routes";

import { SPONSORS } from "../SponsorsPage/static-data";

export const getSponsor = (id: string) =>
  SPONSORS.filter(({ uuid }) => uuid === id)[0];

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const SPONSORS_DETAILS_INFO = {
  buttonText: "Back",
  buttonUrl: routes.internal.sponsors,
  collectionHeader: "Sponsored Podcasts",
};
