import { defineField, defineType } from "sanity";

export default defineType({
  name: "season",
  title: "Seasons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Season Title",
      type: "string",
      description: "The title of the season e.g Season One",
    }),
    {
      name: "sponsors",
      title: "List of Sponsors for the Season",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    },
  ],
});
