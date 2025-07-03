// @ts-nocheck
import routes from "@/src/app/(website)/routes";
import { SPONSORS } from "@/src/components/pages/SponsorsPage/static-data";

export const getSponsor = (id: string, data: object) => {
  console.log(data.sponsors);
  const sponsorsArray = Object.keys(data.sponsors).map(function (property) {
    return data.sponsors[property];
  });

  return sponsorsArray.filter(({ uuid }) => uuid === id)[0];
};

//
//
//
//
// ONLY TOUCH THINGS BELOW THIS LINE

export const SPONSORS_DETAILS_INFO = {
  buttonText: "Back to Sponsors",
  buttonUrl: routes.internal.sponsors,
  collectionHeader: "Sponsored Episodes",
  heroTitle: "Supporting Quality Business Content",
  heroSubtitle:
    "Learn more about our valued sponsors and the episodes they&apos;ve supported",
};
