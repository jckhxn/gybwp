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
    } as any),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    } as any),
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
              validation: (Rule: any) => Rule.required(),
            } as any),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            } as any),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
            } as any),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            } as any),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
          },
        },
      ],
    } as any),
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
