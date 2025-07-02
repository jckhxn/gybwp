// @ts-nocheck
import { Rule } from "@sanity/types";
import { definePathname } from "@tinloof/sanity-studio";

const episode = {
  // Documents preview based on youtube.title param
  preview: {
    select: {
      title: "youtube.title",
      seasonNumber: "youtube.seasonNumber",
      episodeNumber: "youtube.episodeNumber",
    },
    prepare(selection: { title: any; seasonNumber: any; episodeNumber: any }) {
      const { title, seasonNumber, episodeNumber } = selection;
      return {
        title: title,
        // Change this to Season and Episode Number based on new schema
        subtitle: `S${seasonNumber} E${episodeNumber} `,
      };
    },
  },
  name: "episode",
  title: "Episodes",
  type: "document",
  fields: [
    definePathname({
      name: "pathname",
      initialValue: { current: "/episodes/" },
      description: "Enter the UUID here to use Live Preview editing",
      options: {
        source: "youtube.title",
        slugify: (input: string) => generateEpisodePathname(input),
        folder: {
          canUnlock: true,
        },
      },

      hidden: ({ document }) => !document?.youtube?.uuid,
    }),
    {
      name: "youtube",
      title: "Youtube Embed",
      type: "youtubeVideo",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      // Guests
      name: "guests",
      title: "Guests",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "guest" }],
        },
      ],
    },

    {
      name: "season",
      title: "Season",
      type: "reference",
      to: [{ type: "season" }],
    },
    {
      name: "relatedEpisodes",
      title: "Related Episodes",
      description: "Select episodes that are related to this one",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "episode" }],
          options: {
            filter: ({ document }) => {
              // Don't allow referencing the current episode
              return {
                filter: "_id != $id",
                params: {
                  id: document._id,
                },
              };
            },
          },
          preview: {
            select: {
              title: "youtube.title",
              subtitle: "youtube.description",
              media: "youtube.thumbnail",
              seasonNumber: "youtube.seasonNumber",
              episodeNumber: "youtube.episodeNumber",
            },
            prepare(selection) {
              const { title, subtitle, media, seasonNumber, episodeNumber } =
                selection;
              return {
                title: title || "Untitled Episode",
                subtitle: `Season ${seasonNumber || "?"} Episode ${episodeNumber || "?"}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(3).warning("Limit related episodes to 3 for optimal display"),
      options: {
        // Limit the number of items that can be selected
        limit: 3,
        // Allow manual ordering of the episodes
        sortable: true,
      },
    },
    {
      // Audio/Podcast Links of the Episode
      name: "podcastLinks",
      title: "Podcast Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Podcast Platform",
            },
            { name: "link", type: "string", title: "Link" },
          ],
        },
      ],
    },
    {
      // Sponsors of the Episode
      name: "sponsors",
      title: "Episode Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
    },
    {
      // Legacy sponsors field for backward compatibility
      name: "legacySponsors",
      title: "Legacy Sponsors (Deprecated)",
      type: "array",
      of: [{ type: "string" }],
      description: "Old sponsor field - use Episode Sponsors instead",
      hidden: true,
    },
    {
      // Details
      name: "details",
      title: "Episode Details",
      type: "object",
      fields: [
        {
          name: "keyTakeaways",
          type: "array",
          title: "Key Takeaways",
          description:
            "Main points from the episode, displayed as bullet points",
          of: [{ type: "string" }],
        },
        {
          name: "discussionTopics",
          title: "Discussion Topics",
          description: "Main topics covered in the episode",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Brief title for this discussion topic",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  description: "Detailed explanation of this topic",
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                },
              },
            },
          ],
        },
        {
          name: "highlights",
          title: "Episode Highlights",
          description: "Notable moments in the episode with timestamps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "Brief title for this highlight moment",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "timestamp",
                  title: "Timestamp",
                  type: "string",
                  description: "Format: MM:SS or HH:MM:SS",
                  validation: (Rule) =>
                    Rule.regex(/^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$/).error(
                      "Please use a valid timestamp format (MM:SS or HH:MM:SS)"
                    ),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "timestamp",
                },
              },
            },
          ],
        },
        // Primary: Enhanced transcript with portable text (paste & annotate)
        {
          name: "transcript",
          title: "📝 Transcript (Paste & Annotate)",
          type: "array",
          description:
            "✅ RECOMMENDED: Paste your transcript and easily add timestamps and speaker labels. Perfect copy-paste workflow!",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "Speaker", value: "h4" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [
                  {
                    name: "timestamp",
                    title: "Timestamp",
                    type: "object",
                    fields: [
                      {
                        name: "time",
                        title: "Time",
                        type: "string",
                        description:
                          "Format: MM:SS or HH:MM:SS (e.g., 1:23 or 1:23:45)",
                        validation: (Rule) =>
                          Rule.regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/).error(
                            "Use format MM:SS or HH:MM:SS"
                          ),
                        placeholder: "e.g., 1:23 or 1:23:45",
                      },
                      {
                        name: "keyMoment",
                        title: "Key Moment",
                        type: "boolean",
                        description: "Mark this timestamp as a key moment",
                        initialValue: false,
                      },
                    ],
                    icon: () => "🕐",
                    component: ({ children, value }) => (
                      <span
                        style={{
                          backgroundColor: "#e6f3ff",
                          padding: "2px 4px",
                          borderRadius: "3px",
                          border: "1px solid #b3d9ff",
                          fontSize: "0.85em",
                          fontWeight: "bold",
                          color: "#0066cc",
                        }}
                      >
                        {value?.keyMoment && (
                          <span style={{ marginRight: "2px" }}>★</span>
                        )}
                        [{value?.time || "??:??"}]{children}
                      </span>
                    ),
                  },
                  {
                    name: "speaker",
                    title: "Speaker Reference",
                    type: "object",
                    description: "Link text to a specific speaker",
                    fields: [
                      {
                        name: "type",
                        title: "Speaker Type",
                        type: "string",
                        options: {
                          list: [
                            { title: "Host", value: "host" },
                            { title: "Guest", value: "guest" },
                            { title: "Other", value: "other" },
                          ],
                        },
                        initialValue: "guest",
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
                    icon: () => "👤",
                    component: ({ children, value }) => (
                      <span
                        style={{
                          backgroundColor: "#f0f8e6",
                          padding: "2px 4px",
                          borderRadius: "3px",
                          border: "1px solid #c8e6c8",
                          fontSize: "0.85em",
                          fontWeight: "bold",
                          color: "#2d5016",
                        }}
                      >
                        @ {children}
                      </span>
                    ),
                  },
                ],
              },
            },
          ],
        },

        // Alternative: Structured transcript segments (for advanced use cases)
        {
          name: "transcriptSegments",
          title: "⚙️ Transcript Segments (Advanced)",
          type: "array",
          description:
            "⚠️ Advanced: Individual segments with separate fields. Use the main transcript field above for easier editing.",
          hidden: ({ document }) => !!document?.transcript?.length, // Hide if rich text is being used
          of: [
            {
              type: "object",
              title: "Transcript Segment",
              fields: [
                {
                  name: "timestamp",
                  title: "Timestamp",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/)
                      .error("Use format MM:SS or HH:MM:SS"),
                  placeholder: "e.g., 1:23 or 1:23:45",
                  description:
                    "When this segment starts (MM:SS or HH:MM:SS format)",
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
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "hostRef",
                      title: "Host",
                      type: "reference",
                      to: [{ type: "host" }],
                      hidden: ({ parent }) => parent?.type !== "host",
                      validation: (Rule) =>
                        Rule.custom((hostRef, context) => {
                          const type = context.parent?.type;
                          if (type === "host" && !hostRef) {
                            return "Please select the host";
                          }
                          return true;
                        }),
                    },
                    {
                      name: "guestRef",
                      title: "Guest",
                      type: "reference",
                      to: [{ type: "guest" }],
                      hidden: ({ parent }) => parent?.type !== "guest",
                      validation: (Rule) =>
                        Rule.custom((guestRef, context) => {
                          const type = context.parent?.type;
                          if (type === "guest" && !guestRef) {
                            return "Please select a guest";
                          }
                          return true;
                        }),
                    },
                    {
                      name: "otherName",
                      title: "Speaker Name",
                      type: "string",
                      placeholder: "e.g., Co-host, Moderator, etc.",
                      hidden: ({ parent }) => parent?.type !== "other",
                      validation: (Rule) =>
                        Rule.custom((otherName, context) => {
                          const type = context.parent?.type;
                          if (type === "other" && !otherName) {
                            return "Please enter the speaker's name";
                          }
                          return true;
                        }),
                    },
                  ],
                  preview: {
                    select: {
                      type: "type",
                      hostName: "hostRef.name",
                      guestName: "guestRef.name",
                      otherName: "otherName",
                    },
                    prepare({ type, hostName, guestName, otherName }) {
                      switch (type) {
                        case "host":
                          return {
                            title: hostName || "Host",
                            subtitle: "Podcast Host",
                          };
                        case "guest":
                          return {
                            title: guestName || "Guest",
                            subtitle: "Episode Guest",
                          };
                        case "other":
                          return {
                            title: otherName || "Other Speaker",
                            subtitle: "Other Speaker",
                          };
                        default:
                          return {
                            title: "Unknown Speaker",
                            subtitle: "Please configure speaker",
                          };
                      }
                    },
                  },
                },
                {
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                  description: "What the speaker says during this segment",
                },
                {
                  name: "keyMoment",
                  title: "Key Moment",
                  type: "boolean",
                  description:
                    "Mark this as an important moment in the episode",
                  initialValue: false,
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
                  const keyMomentIndicator = keyMoment ? "⭐ " : "";

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
                  };
                },
              },
            },
          ],
          options: {
            sortable: true,
            layout: "list",
          },
        },
        // Legacy: Keep the old structured segments as backup (hidden)
        {
          name: "legacyTranscriptSegments",
          title: "Legacy Transcript Segments",
          type: "array",
          description: "Backup structured transcript field",
          hidden: true,
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "timestamp",
                  title: "Timestamp",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required()
                      .regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/)
                      .error("Use format MM:SS or HH:MM:SS"),
                  placeholder: "e.g., 1:23 or 1:23:45",
                },
                {
                  name: "speaker",
                  title: "Speaker",
                  type: "string",
                  options: {
                    list: [
                      { title: "Host", value: "host" },
                      { title: "Guest", value: "guest" },
                      { title: "Co-host", value: "cohost" },
                      { title: "Other", value: "other" },
                    ],
                  },
                  initialValue: "host",
                },
                {
                  name: "text",
                  title: "Text",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "keyMoment",
                  title: "Key Moment",
                  type: "boolean",
                  description: "Mark this as an important moment",
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
                  const truncatedText =
                    text?.length > 60 ? `${text.substring(0, 60)}...` : text;
                  const keyMomentIndicator = keyMoment ? "⭐ " : "";
                  return {
                    title: `${timestamp} ${keyMomentIndicator}[${speaker || "Unknown"}]`,
                    subtitle: truncatedText,
                  };
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
export default episode;
