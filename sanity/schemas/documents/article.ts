import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Articles",
  type: "document",
  fields: [
    defineField({
      // Name of the Article
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      // Title of the Article
      name: "title",
      title: "Title from Article",
      type: "string",
    }),
    defineField({
      // Link to the Article
      name: "link",
      title: "Link to Article",
      type: "string",
    }),
    defineField({
      // Date of the Article
      name: "date",
      title: "Date of Article",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description:
        "Mark this article as featured to include it in the Featured Articles section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "company",
    },
  },
});
