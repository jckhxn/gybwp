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
      placeholder: "consulting-services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Services",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Service Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
            }),
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      servicesCount: "services.length",
    },
    prepare({ title, servicesCount }) {
      return {
        title: title || "Consulting Services",
        servicesCount,
      };
    },
  },
});
