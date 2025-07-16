import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingServices",
  title: "Consulting Services",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from title if not provided.",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Comprehensive Talent Solutions",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: "From strategic planning to execution, we provide end-to-end consulting services that drive sustainable business growth through people.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
    },
    prepare({ title, badgeText }) {
      return {
        title: title || "Consulting Services",
        subtitle: badgeText || "Our Services",
      };
    },
  },
});