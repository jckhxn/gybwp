import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeOverview",
  title: "Episode Overview",
  type: "object",
  fields: [
    defineField({
      name: "showDescription",
      title: "Show Description",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "customDescription",
      title: "Custom Description",
      type: "text",
      description: "Override the episode description if needed",
    } as any),
  ],
  preview: {
    prepare() {
      return {
        title: "Episode Overview",
        subtitle: "Shows the episode description and metadata",
      };
    },
  },
});
