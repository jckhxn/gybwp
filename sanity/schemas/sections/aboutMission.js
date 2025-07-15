import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutMission",
  title: "About Mission",
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
      initialValue: "Why This Podcast?",
    }),
    defineField({
      name: "text",
      type: "text",
      title: "Text",
      initialValue: "We believe that people are not just a company's most important asset—they're an investment primed for growth. Our mission is to help leaders maximize their Return on People through practical, real-world conversations.",
    }),
    defineField({
      name: "bullets",
      type: "array",
      title: "Key Points",
      of: [{ type: "string" }],
      initialValue: [
        "Interviews with top CEOs, founders, and thought leaders",
        "Actionable strategies for leadership, talent, and growth",
        "Stories that inspire and challenge conventional thinking"
      ],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for accessibility and SEO.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "About Mission",
        subtitle: "Mission section",
        media,
      };
    },
  },
});
