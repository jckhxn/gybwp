import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeGuests",
  title: "Episode Guests",
  type: "object",
  fields: [
    defineField({
      name: "showGuests",
      title: "Show Guests",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Featured Guests",
    }),
    defineField({
      name: "showBios",
      title: "Show Guest Bios",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showSocialLinks",
      title: "Show Social Links",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      showGuests: "showGuests",
    },
    prepare({ title, showGuests }) {
      return {
        title: title || "Featured Guests",
        subtitle: showGuests ? "Guests enabled" : "Guests disabled",
      };
    },
  },
});
