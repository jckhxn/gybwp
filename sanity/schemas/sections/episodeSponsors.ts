import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeSponsors",
  title: "Episode Sponsors",
  type: "object",
  fields: [
    defineField({
      name: "showSponsors",
      title: "Show Sponsors",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Episode Sponsors",
    } as any),
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
    } as any),
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
