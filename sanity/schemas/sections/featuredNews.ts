import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredNews",
  title: "Featured News",
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
      initialValue: "Latest News",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "maxItems",
      title: "Max Items to Show",
      type: "number",
      initialValue: 3,
      validation: (Rule: any) => Rule.min(1).max(10),
    }),
    defineField({
      name: "showReadMore",
      title: 'Show "Read More" Button',
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "readMoreText",
      title: "Read More Button Text",
      type: "string",
      initialValue: "View All News",
      hidden: ({ parent }: { parent: any }) => !parent?.showReadMore,
    }),
    defineField({
      name: "readMoreLink",
      title: "Read More Link",
      type: "string",
      initialValue: "/news",
      hidden: ({ parent }: { parent: any }) => !parent?.showReadMore,
    }),
  ],
  preview: {
    select: {
      title: "title",
      maxItems: "maxItems",
    },
    prepare({ title, maxItems }) {
      return {
        title: title || "Featured News",
        subtitle: `Shows ${maxItems || 3} latest news items`,
      };
    },
  },
});
