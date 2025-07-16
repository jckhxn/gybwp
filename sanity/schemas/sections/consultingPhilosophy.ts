import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingPhilosophy",
  title: "Consulting Philosophy",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Our Philosophy",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "People Are Your Greatest Investment",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue:
        "Within the Consulting practice of JKL Advisors, we help CEOs and business leaders grow their business with the biggest and most important investment - People!",
    }),
    defineField({
      name: "content",
      title: "Additional Content",
      type: "text",
      description: "Optional additional paragraph content",
    }),
    defineField({
      name: "philosophyImage",
      title: "Philosophy Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      media: "philosophyImage",
    },
    prepare({ title, badgeText, media }) {
      return {
        title: title || "Consulting Philosophy",
        subtitle: badgeText || "Our Philosophy",
        media,
      };
    },
  },
});
