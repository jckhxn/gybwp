import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeTranscript",
  title: "Episode Transcript",
  type: "object",
  fields: [
    defineField({
      name: "showTranscript",
      title: "Show Transcript",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTimestamps",
      title: "Show Timestamps",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "allowDownload",
      title: "Allow Download",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      showTranscript: "showTranscript",
      showTimestamps: "showTimestamps",
    },
    prepare({ showTranscript, showTimestamps }) {
      const features = [];
      if (showTranscript) features.push("Transcript");
      if (showTimestamps) features.push("Timestamps");

      return {
        title: "Episode Transcript",
        subtitle:
          features.length > 0
            ? `Shows: ${features.join(", ")}`
            : "Basic transcript",
      };
    },
  },
});
