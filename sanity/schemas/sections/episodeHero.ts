import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeHero",
  title: "Episode Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    {
      name: "episode",
      title: "Episode",
      type: "reference",
      to: [{ type: "episode" }],
    },
    defineField({
      name: "showPlayButton",
      title: "Show Play Button",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      episode: "episode.title",
    },
    prepare({ title, episode }) {
      return {
        title: title || "Episode Hero",
        subtitle: episode ? `Episode: ${episode}` : "No episode selected",
      };
    },
  },
});
