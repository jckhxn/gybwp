import { defineField, defineType } from "sanity";

export default defineType({
  name: "personHero",
  title: "Person Hero",
  type: "object",
  fields: [
    defineField({
      name: "person",
      type: "reference",
      title: "Person",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Custom Title (optional)",
      description: "Override the person name with a custom title",
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
    }),
  ],
  preview: {
    select: {
      title: "title",
      personName: "person.name",
    },
    prepare(selection) {
      const { title, personName } = selection;
      return {
        title: "Person Hero",
        subtitle: title || personName || "Person Hero Section",
      };
    },
  },
});
