import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeTranscriptField",
  title: "Episode Transcript",
  type: "array",
  of: [
    {
      type: "transcriptSegment",
    },
  ],
  options: {
    sortable: true,
    layout: "list",
  },
});
