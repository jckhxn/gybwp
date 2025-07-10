import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeHero",
  title: "Episode Hero",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
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
