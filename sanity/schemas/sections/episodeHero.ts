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
    } as any),
    defineField({
      name: "episode",
      title: "Episode",
      type: "reference",
      to: [{ type: "episode" }],
    } as any),
    defineField({
      name: "showPlayButton",
      title: "Show Play Button",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    } as any),
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
