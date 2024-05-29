// @ts-nocheck
const fieldsToMigrate = [
  { from: "image", to: "youtube.thumbnail" },
  { from: "uuid", to: "youtube.uuid" },
  { from: "seasonNumber", to: "youtube.seasonNumber" },
  { from: "episodeNumber", to: "youtube.episodeNumber" },
];

import { defineMigration, at, setIfMissing, set, unset } from "sanity/migrate";

export default defineMigration({
  title: "Migrate episode fields to youtube object (loop, fixed)",
  documentTypes: ["episode"],
  migrate: {
    document(doc, context) {
      const updates = fieldsToMigrate.flatMap(
        ({ from, to, transform = (v) => v }) => {
          // Extract value and apply transformation
          const value = transform(doc[from]) || null; // Handle potential errors

          return [
            at(to, setIfMissing(value)), // Set the 'to' field if missing
            at(from, unset()),
          ];
        }
      );
      return updates; // Return the accumulated updates array
    },
  },
});
