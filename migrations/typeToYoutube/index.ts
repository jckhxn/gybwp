// If youtube object doesn't exist
//  Create object and add existing fields.
// Mapped like this
// "episodeName":coalesce(youtube.title,episodeName),
// "episodeNumber":coalesce(youtube.episodeNumber,episodeNumber),
// "image":coalesce(youtube.thumbnail,image),
// "seasonNumber":coalesce(youtube.seasonNumber,seasonNumber),
// "url":coalesce("https://www.youtube.com/"+youtube.id,url),
// "uuid":coalesce(youtube.uuid,uuid),
import { defineMigration, at, setIfMissing, unset } from "sanity/migrate";

export default defineMigration({
  title: "Change the movie object field to film",
  documentTypes: ["screening"],
  migrate: {
    document(doc, context) {
      return [at("film", setIfMissing(doc[from])), at("movie", unset())];
    },
  },
});
