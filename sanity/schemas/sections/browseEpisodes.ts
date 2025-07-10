import { defineField, defineType } from "sanity";

export default defineType({
  name: "browseEpisodes",
  title: "Browse Episodes",
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
      initialValue: "Browse Episodes",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "showFeatured",
      title: "Show Featured Episodes",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "episodesPerPage",
      title: "Episodes per Page",
      type: "number",
      initialValue: 12,
      validation: (Rule: any) => Rule.min(1).max(50),
    }),
    defineField({
      name: "showFilters",
      title: "Show Category Filters",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Browse Episodes",
        subtitle: subtitle || "Episode browsing section",
      };
    },
  },
});
