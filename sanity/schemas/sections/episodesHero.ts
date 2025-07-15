import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodesHero",
  title: "Episodes Hero",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "badgeText",
      type: "string",
      title: "Badge Text",
      initialValue: "Episode Library",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Browse Our Episodes",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Optional subtitle below the main title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      initialValue: "Explore our complete library of business insights, leadership strategies, and growth tactics",
    }),
    defineField({
      name: "showStats",
      type: "boolean",
      title: "Show Statistics",
      description: "Display episode count, season count, and expert guests stats",
      initialValue: true,
    }),
    defineField({
      name: "totalEpisodes",
      type: "number",
      title: "Total Episodes (Fallback)",
      description: "Fallback number if dynamic count fails. Leave empty to use live data.",
    }),
    defineField({
      name: "totalSeasons",
      type: "number",
      title: "Total Seasons (Fallback)",
      description: "Fallback number if dynamic count fails. Leave empty to use live data.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      showStats: "showStats",
    },
    prepare({ title, badgeText, showStats }) {
      return {
        title: title || "Episodes Hero",
        subtitle: `${badgeText || "Episode Library"}${showStats ? " (with stats)" : ""}`,
      };
    },
  },
});