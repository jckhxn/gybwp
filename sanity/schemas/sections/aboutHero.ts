import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutHero",
  title: "About Hero",
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
      type: "string",
      title: "Badge Text",
      initialValue: "About the Podcast",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Growing Your Business With People",
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
      initialValue:
        "Actionable insights for leaders who believe people are their greatest investment. Join us for fireside chats with Fortune 100 CEOs, startup founders, bestselling authors, and industry pioneers.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
    },
    prepare({ title, badgeText }) {
      return {
        title: title || "About Hero",
        subtitle: badgeText || "About the Podcast",
      };
    },
  },
});
