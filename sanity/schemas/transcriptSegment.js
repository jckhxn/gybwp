// sanity/schemas/transcriptSegment.js
import { TimestampInput } from "../components/TimestampInput";

const transcriptSegment = {
  name: "transcriptSegment",
  title: "Transcript Segment",
  type: "object",
  fields: [
    {
      name: "timestamp",
      title: "Timestamp",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, {
          name: "timestamp",
          invert: false,
        }).error("Please use format MM:SS or HH:MM:SS"),
      components: {
        input: TimestampInput, // Use our custom component
      },
    },
    {
      name: "speaker",
      title: "Speaker",
      type: "object",
      description: "Select who is speaking in this segment",
      fields: [
        {
          name: "type",
          title: "Speaker Type",
          type: "string",
          options: {
            list: [
              { title: "Host", value: "host" },
              { title: "Guest", value: "guest" },
              { title: "Other/Manual", value: "other" },
            ],
          },
          initialValue: "host",
        },
        {
          name: "hostRef",
          title: "Host",
          type: "reference",
          to: [{ type: "host" }],
          hidden: ({ parent }) => parent?.type !== "host",
        },
        {
          name: "guestRef",
          title: "Guest",
          type: "reference",
          to: [{ type: "guest" }],
          hidden: ({ parent }) => parent?.type !== "guest",
        },
        {
          name: "otherName",
          title: "Speaker Name",
          type: "string",
          placeholder: "e.g., Co-host, Moderator, etc.",
          hidden: ({ parent }) => parent?.type !== "other",
        },
      ],
    },
    {
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    },
    {
      name: "keyMoment",
      title: "Key Moment",
      type: "boolean",
      description: "Mark this as an important moment in the episode",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
  preview: {
    select: {
      timestamp: "timestamp",
      text: "text",
      speakerType: "speaker.type",
      hostName: "speaker.hostRef.name",
      guestName: "speaker.guestRef.name",
      otherName: "speaker.otherName",
      keyMoment: "keyMoment",
    },
    prepare({
      timestamp,
      text,
      speakerType,
      hostName,
      guestName,
      otherName,
      keyMoment,
    }) {
      const truncatedText =
        text?.length > 60 ? `${text.substring(0, 60)}...` : text;
      const keyMomentIndicator = keyMoment ? "★ " : "";

      let speakerDisplay = "Unknown";
      switch (speakerType) {
        case "host":
          speakerDisplay = hostName || "Host";
          break;
        case "guest":
          speakerDisplay = guestName || "Guest";
          break;
        case "other":
          speakerDisplay = otherName || "Other";
          break;
      }

      return {
        title: `${timestamp} ${keyMomentIndicator}[${speakerDisplay}]`,
        subtitle: truncatedText,
        // Remove problematic media property
      };
    },
  },
};

export default transcriptSegment;
