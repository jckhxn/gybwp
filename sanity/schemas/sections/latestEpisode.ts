import { defineField, defineType } from "sanity";

export default defineType({
  name: "latestEpisode",
  title: "Latest Episode",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      initialValue: "Latest Episode",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Section Description",
    }),
    defineField({
      name: "showAutomatic",
      type: "boolean",
      title: "Show Latest Episode Automatically",
      description:
        "If enabled, shows the most recent episode. If disabled, choose a specific episode.",
      initialValue: true,
    }),
    {
      name: "specificEpisode",
      type: "reference",
      title: "Specific Episode",
      to: [{ type: "episode" }],
      hidden: ({ parent }) => parent?.showAutomatic,
    },
    {
      name: "primaryButton",
      type: "object",
      title: "Primary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "Listen Now",
        }),
        defineField({
          name: "componentLink",
          type: "componentLink",
          title: "Component Link",
          description: "Advanced linking options for the primary button",
        }),
      ],
    },
    {
      name: "secondaryButton",
      type: "object",
      title: "Secondary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "Show Notes",
        }),
        defineField({
          name: "componentLink",
          type: "componentLink",
          title: "Component Link",
          description: "Advanced linking options for the secondary button",
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      showAutomatic: "showAutomatic",
    },
    prepare({ title, showAutomatic }) {
      return {
        title: title || "Latest Episode",
        subtitle: showAutomatic ? "Automatic" : "Manual selection",
      };
    },
  },
});
