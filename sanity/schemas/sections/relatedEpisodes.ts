import { defineField, defineType } from "sanity";

export default defineType({
  name: "relatedEpisodes",
  title: "Related Episodes",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "showRelated",
      title: "Show Related Episodes",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Related Episodes",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      initialValue: "More episodes you might enjoy",
    }),
    defineField({
      name: "maxEpisodes",
      title: "Maximum Episodes to Show",
      type: "number",
      initialValue: 3,
      validation: (Rule: any) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: "title",
      showRelated: "showRelated",
      maxEpisodes: "maxEpisodes",
    },
    prepare({ title, showRelated, maxEpisodes }) {
      return {
        title: title || "Related Episodes",
        subtitle: showRelated
          ? `Shows up to ${maxEpisodes || 3} episodes`
          : "Hidden",
      };
    },
  },
});
