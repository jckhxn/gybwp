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
      initialValue: { current: "/episode/" },
      description: "Enter the UUID here to use Live Preview editing",
      options: {
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
      title: "List of Sponsors (Lowercase, one word)",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      // Additional Content

      name: "content",
      title: "Episode Content",
      type: "object",
      fields: [
        {
          name: "files",
          title: "File",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "type",
                  title: "Select the Type of File",
                  description:
                    "Please select which type of content you are uploading",
                  type: "string",
                  options: {
                    list: [
                      { title: "link", value: "link" },
                      { title: "pdf", value: "pdf" },
                      { title: "image", value: "image" },
                    ],
                    layout: "radio",
                  },
                },

                {
                  name: "name",
                  title: "Name of Link/PDF/Image",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Upload File",
                  type: "image",
                  // Only render for image & specifies type
                  // @ts-ignore
                  hidden: ({ parent }): boolean => parent?.type !== "image",
                },
                {
                  name: "pdf",
                  title: "Upload File",
                  type: "file",
                  // Only render for PDF & specifies type
                  // @ts-ignore
                  hidden: ({ parent }) => parent?.type !== "pdf",
                },
                {
                  name: "link",
                  title: "Web Link",
                  type: "string",
                  // @ts-ignore
                  hidden: ({ parent }) => parent?.type !== "link",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      // Details
      name: "details",
      title: "Episode Details",
      type: "object",
      fields: [
        {
          name: "hashtags",
          title: "Episode Hashtags",
          type: "array",
          of: [{ type: "string" }],
        },
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
        {
          name: "transcript",
          title: "Transcript",
          type: "array",
          description: "Full transcript of the podcast episode",
          of: [
            {
              type: "block",
              // Customize the toolbar options for transcript editing
              styles: [
                { title: "Normal", value: "normal" },
                { title: "Speaker", value: "h4" },
              ],
              // Limit marks to only what's needed for transcripts
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
                        description: "Format: MM:SS or HH:MM:SS",
                        validation: (Rule) =>
                          Rule.regex(/^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$/),
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
export default episode;
