import { definePathname } from "@tinloof/sanity-studio";
import { defineField, defineType } from "sanity";
import { sections } from "../sections";

export default defineType({
  type: "document",
  name: "page",
  title: "Page",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Page Title",
      validation: (Rule) => Rule.required(),
    }),
    definePathname({
      name: "pathname",
      title: "URL Path",
    }),
    defineField({
      name: "sectionsBody",
      title: "Page Sections",
      type: "array",
      of: sections.map((section) => ({
        type: section.name,
      })),
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (type) => `/sections/${type}.png`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      pathname: "pathname.current",
    },
    prepare(selection) {
      const { title, pathname } = selection;
      return {
        title: title || "Untitled",
        subtitle: pathname || "/",
      };
    },
  },
});
