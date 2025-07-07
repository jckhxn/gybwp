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
    } as any),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    } as any),
    defineField({
      name: "maxItems",
      title: "Max Items to Show",
      type: "number",
      initialValue: 3,
      validation: (Rule: any) => Rule.min(1).max(10),
    } as any),
    defineField({
      name: "showReadMore",
      title: 'Show "Read More" Button',
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "readMoreText",
      title: "Read More Button Text",
      type: "string",
      initialValue: "View All News",
      hidden: ({ parent }) => !parent?.showReadMore,
    } as any),
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
