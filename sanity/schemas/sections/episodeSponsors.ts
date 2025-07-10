import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeSponsors",
  title: "Episode Sponsors",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "showSponsors",
      title: "Show Sponsors",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Episode Sponsors",
    }),
    defineField({
      name: "showTiers",
      title: "Show Sponsor Tiers",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "allowClickthrough",
      title: "Allow Clickthrough to Sponsor Sites",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      showSponsors: "showSponsors",
    },
    prepare({ title, showSponsors }) {
      return {
        title: title || "Episode Sponsors",
        subtitle: showSponsors ? "Sponsors enabled" : "Sponsors disabled",
      };
    },
  },
});
