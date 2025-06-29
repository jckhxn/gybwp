// Example transcript field configurations for your episode schema
// Choose one of these approaches:

// Option 1: Using custom transcript segment object
const transcriptField = {
  name: "transcript",
  title: "Transcript",
  type: "array",
  of: [
    {
      type: "transcriptSegment", // Use the object we created above
    },
  ],
  options: {
    sortable: true,
    layout: "list",
  },
};

// Option 2: Inline structured transcript
const transcriptSegmentsField = {
  name: "transcriptSegments",
  title: "Transcript Segments",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        {
          name: "timestamp",
          title: "Timestamp",
          type: "string",
          validation: (Rule) =>
            Rule.required().regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/),
          // components: { input: TimestampInput } // Uncomment when component is ready
        },
        {
          name: "speaker",
          title: "Speaker",
          type: "string",
          options: {
            list: ["host", "guest", "cohost", "other"],
          },
          initialValue: "host",
        },
        {
          name: "text",
          title: "Text",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "keyMoment",
          title: "Key Moment",
          type: "boolean",
          initialValue: false,
        },
      ],
      preview: {
        select: {
          timestamp: "timestamp",
          text: "text",
          speaker: "speaker",
          keyMoment: "keyMoment",
        },
        prepare({ timestamp, text, speaker, keyMoment }) {
          return {
            title: `${timestamp} ${keyMoment ? "⭐" : ""} [${speaker}]`,
            subtitle: text?.substring(0, 80) + (text?.length > 80 ? "..." : ""),
          };
        },
      },
    },
  ],
};

export { transcriptField, transcriptSegmentsField };
