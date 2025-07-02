import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredNews",
  title: "Featured News",
  type: "object",
  fields: [
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
      rows: 2,
    }),
    defineField({
      name: "maxItems",
      title: "Max Items to Show",
      type: "number",
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(10),
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
      hidden: ({ parent }) => !parent?.showReadMore,
    }),
    defineField({
      name: "readMoreLink",
      title: "Read More Link",
      type: "string",
      initialValue: "/news",
      hidden: ({ parent }) => !parent?.showReadMore,
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
