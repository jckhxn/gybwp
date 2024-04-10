import { defineType } from "sanity";
export const youtube = defineType({
  name: "youtubeEmbed",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "video", type: "youtubeVideo" },
  ],
});
