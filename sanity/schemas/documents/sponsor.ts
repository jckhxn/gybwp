import { defineField, defineType } from "sanity";

export default defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathname",
      title: "Pathname",
      type: "slug",
      options: {
        source: "name",
        slugify: (input: string) =>
          `/sponsor/${input.toLowerCase().replace(/\s+/g, "-").slice(0, 96)}`,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionsBody",
      title: "Sections",
      type: "array",
      of: [
        { type: "homeHero" },
        { type: "featuredNews" },
        { type: "newsletter" },
        // Add more sponsor-specific sections as needed
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sponsorshipLevel",
      title: "Sponsorship Level",
      type: "string",
      options: {
        list: [
          { title: "Title Sponsor", value: "title" },
          { title: "Major Sponsor", value: "major" },
          { title: "Supporting Sponsor", value: "supporting" },
        ],
      },
    }),
    defineField({
      name: "active",
      title: "Active Sponsor",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      level: "sponsorshipLevel",
      active: "active",
      media: "logo",
    },
    prepare({ title, level, active, media }) {
      return {
        title: title || "Untitled Sponsor",
        subtitle: `${level || "Supporting"} • ${active ? "Active" : "Inactive"}`,
        media,
      };
    },
  },
});
