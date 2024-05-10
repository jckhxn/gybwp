// If youtube object doesn't exist
//  Create object and add existing fields.
// Mapped like this
// "episodeName":coalesce(youtube.title,episodeName),
// "episodeNumber":coalesce(youtube.episodeNumber,episodeNumber),
// "image":coalesce(youtube.thumbnail,image),
// "seasonNumber":coalesce(youtube.seasonNumber,seasonNumber),
// "url":coalesce("https://www.youtube.com/"+youtube.id,url),
// "uuid":coalesce(youtube.uuid,uuid)

const fieldsToMigrate = [
  { from: "blurb", to: "youtube.blurb" },

  // Add more field mappings as needed
];
import { defineMigration, at, setIfMissing, unset } from "sanity/migrate";

export default defineMigration({
  title: "Migrate episode fields to youtube object (loop, fixed)",
  documentTypes: ["episode"],
  migrate: {
    document(doc, context) {
      const updates = fieldsToMigrate.map(
        ({ from, to, transform = (v) => v }) => {
          // Set field value directly
          // Extract id from url (if applicable)
          //@ts-ignore
          const value = transform(doc[from]) || null; // Handle potential errors
          return at(to, setIfMissing(value));
        }
      );
      return updates; // Return the accumulated updates array
    },
  },
});
