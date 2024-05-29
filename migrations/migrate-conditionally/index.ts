// @ts-nocheck
import { defineMigration, at, setIfMissing, set, unset } from "sanity/migrate";

// Mapping of season numbers to reference IDs
const seasonReferences = {
  1: "f7a155b5-c314-4bde-a0a8-902c7d325951",
  2: "05ea714c-cf7a-430a-be6e-7dc354061e46",
  3: "51612aab-87d8-4801-92c2-5a35e9b444ce",
  4: "49d9ba2d-4d50-44f0-afc4-04a546777ab3",
  5: "9f3258de-5c46-42ff-a814-065afa9c67fb",
  6: "3859765f-b646-4ff9-87c3-78102ae74fd7",
  // Add more season numbers and reference IDs as needed
};

export default defineMigration({
  title: "Add season field based on youtube.seasonNumber",
  documentTypes: ["episode"],
  migrate: {
    document(doc, context) {
      const updates = [];

      // Get the season number from youtube object
      const seasonNumber = doc.youtube?.seasonNumber;

      if (seasonNumber && seasonReferences[seasonNumber]) {
        const seasonRefId = seasonReferences[seasonNumber];
        updates.push(
          at("season", setIfMissing({ _type: "reference", _ref: seasonRefId }))
        );
      }

      return updates; // Return the accumulated updates array
    },
  },
});
