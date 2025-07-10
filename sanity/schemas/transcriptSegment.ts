import { defineField, defineType } from "sanity";

export default defineType({
  name: "transcriptSegment",
  title: "Transcript Segment",
  type: "object",
  fields: [
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "string",
      validation: (Rule: any) =>
        Rule.regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, {
          name: "timestamp",
          invert: false,
        }).error("Please use format MM:SS or HH:MM:SS"),
    }),
    {
      name: "speaker",
      title: "Speaker",
      type: "object",
      description: "Select who is speaking in this segment",
      fields: [
        defineField({
          name: "type",
          title: "Speaker Type",
          type: "string",
          options: {
            list: [
              { title: "Host", value: "host" },
              { title: "Guest", value: "guest" },
              { title: "Narrator", value: "narrator" },
            ],
          },
          initialValue: "host",
        }),
        {
          name: "person",
          title: "Person",
          type: "reference",
          to: [{ type: "person" }],
          hidden: ({ parent }) => parent?.type === "narrator",
        },
        defineField({
          name: "customName",
          title: "Custom Name",
          type: "string",
          description: "Use when speaker is not in the people collection",
          hidden: ({ parent }) => parent?.type !== "narrator" && parent?.person,
        }),
      ],
    },
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      description: "Internal notes about this segment",
    }),
  ],
  preview: {
    select: {
      timestamp: "timestamp",
      text: "text",
      speaker: "speaker.customName",
      person: "speaker.person.name",
      type: "speaker.type",
    },
    prepare({ timestamp, text, speaker, person, type }) {
      const speakerName = person || speaker || type || "Unknown";
      return {
        title: `${timestamp} - ${speakerName}`,
        subtitle: text ? text.slice(0, 100) + "..." : "No text",
      };
    },
  },
});
