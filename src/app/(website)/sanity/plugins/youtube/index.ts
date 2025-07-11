import { definePlugin } from "sanity";
import { createScopedInputComponent } from "@/sanity/plugins/youtube/components/InputComponent";

export { type YoutubeVideoData } from "./utils";

export const youtubeInput = definePlugin<{ apiKey: string }>((config) => {
  return {
    name: "sanity-plugin-youtube-input",
    schema: {
      types: [
        {
          name: "youtubeVideo",
          type: "object",
          components: {
            input: createScopedInputComponent(config.apiKey),
          },
          fields: [
            {
              name: "id",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "title", type: "string" },
            { name: "episodeNumber", type: "number" },
            { name: "seasonNumber", type: "number" },
            { name: "description", type: "string" },
            { name: "publishedAt", type: "string" },
            {
              name: "thumbnail",
              type: "string",
            },
          ],
        },
      ],
    },
  };
});
