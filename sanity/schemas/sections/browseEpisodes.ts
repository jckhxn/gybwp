import { defineField, defineType } from "sanity";

export default defineType({
  name: "browseEpisodes",
  title: "Browse Episodes",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Browse Episodes",
    } as any),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    } as any),
    defineField({
      name: "showFeatured",
      title: "Show Featured Episodes",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "episodesPerPage",
      title: "Episodes per Page",
      type: "number",
      initialValue: 12,
      validation: (Rule: any) => Rule.min(1).max(50),
    } as any),
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
