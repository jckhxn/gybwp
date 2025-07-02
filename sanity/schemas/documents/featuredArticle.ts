import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredArticle",
  title: "Featured Articles",
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
      // Short Description of the Article
      name: "description",
      title: "Short Description from Article",
      type: "text",
    }),
    defineField({
      // Link to the Article
      name: "link",
      title: "Link to Article",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Article Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      // Date of the Article
      name: "date",
      title: "Date of Article",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      // Publication name
      name: "publication",
      title: "Publication Name",
      type: "string",
      description: "The name of the publication (e.g. CNN, Forbes, etc.)",
    }),
    defineField({
      // Excerpt for display in cards
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short excerpt to display in the article card",
    }),
  ],
});
