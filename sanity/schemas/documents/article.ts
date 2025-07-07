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
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description:
        "Mark this article as featured to include it in the Featured Articles section.",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Article Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Featured image for this article",
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
    defineField({
      // Short Description of the Article
      name: "description",
      title: "Short Description from Article",
      type: "text",
      description: "Brief description of the article content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "company",
      media: "image",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: subtitle,
        media,
      };
    },
  },
});
