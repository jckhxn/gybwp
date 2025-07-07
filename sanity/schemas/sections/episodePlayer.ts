import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodePlayer",
  title: "Episode Player",
  type: "object",
  fields: [
    defineField({
      name: "showTranscript",
      title: "Show Transcript",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "showGuests",
      title: "Show Guests",
      type: "boolean",
      initialValue: true,
    } as any),
    defineField({
      name: "showSponsors",
      title: "Show Sponsors",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay",
      type: "boolean",
      initialValue: false,
    } as any),
  ],
  preview: {
    select: {
      showTranscript: "showTranscript",
      showGuests: "showGuests",
    },
    prepare({ showTranscript, showGuests }) {
      const features = [];
      if (showTranscript) features.push("Transcript");
      if (showGuests) features.push("Guests");

      return {
        title: "Episode Player",
        subtitle:
          features.length > 0
            ? `Shows: ${features.join(", ")}`
            : "Basic player",
      };
    },
  },
});
