import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingServices",
  title: "Consulting Services",
  type: "object",
  fields: [
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
      rows: 2,
    }),
    defineField({
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      servicesCount: "services.length",
    },
    prepare({ title, servicesCount }) {
      return {
        title: title || "Consulting Services",
        subtitle: `${servicesCount || 0} services`,
      };
    },
  },
});
