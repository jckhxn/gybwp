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
        subtitle: `S${seasonNumber} E${episodeNumber}`,
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
      // Season Name
      name: "seasonName",
      title: "Season Name",
      type: "string",
      options: {
        list: [
          { title: "Season One", value: "Season One" },
          { title: "Season Two", value: "Season Two" },
          { title: "Season Three", value: "Season Three" },
          { title: "Season Four", value: "Season Four" },
          { title: "Season Five", value: "Season Five" },
          { title: "Season Six", value: "Season Six" },
          { title: "Season Seven", value: "Season Seven" },
          { title: "Season Eight", value: "Season Eight" },
          { title: "Season Nine", value: "Season Nine" },
          { title: "Season Ten", value: "Season Ten" },
        ],
      },
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          if (!value.includes("Season")) {
            // The freakin' thing must say Season.
            return 'Season name must start with  "Season", e.g "Season Four"';
          }
          return true;
        }),
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
      ],
    },
  ],
};
export default episode;
