import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutListenConnect",
  title: "About Listen & Connect",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "How to Listen & Connect",
    }),
    defineField({
      name: "text",
      type: "text",
      title: "Text",
      initialValue: "Subscribe on your favorite platform, or contact us to get in touch.",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      platforms: "platforms",
    },
    prepare({ title, platforms }) {
      const count = platforms ? platforms.length : 0;
      return {
        title: title || "About Listen & Connect",
        subtitle: `${count} platform${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
