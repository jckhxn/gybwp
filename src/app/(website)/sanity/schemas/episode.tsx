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
                media: e,
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
