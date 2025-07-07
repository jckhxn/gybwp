import { defineField, defineType } from "sanity";

export default defineType({
  name: "latestEpisode",
  title: "Latest Episode",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      initialValue: "Latest Episode",
    } as any),
    defineField({
      name: "description",
      type: "text",
      title: "Section Description",
    } as any),
    defineField({
      name: "showAutomatic",
      type: "boolean",
      title: "Show Latest Episode Automatically",
      description:
        "If enabled, shows the most recent episode. If disabled, choose a specific episode.",
      initialValue: true,
    }),
    defineField({
      name: "specificEpisode",
      type: "reference",
      title: "Specific Episode",
      to: [{ type: "episode" }],
      hidden: ({ parent }) => parent?.showAutomatic,
    } as any),
  ],
  preview: {
    select: {
      title: "title",
      showAutomatic: "showAutomatic",
    },
    prepare({ title, showAutomatic }) {
      return {
        title: title || "Latest Episode",
        subtitle: showAutomatic ? "Automatic" : "Manual selection",
      };
    },
  },
});
