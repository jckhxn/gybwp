import { Rule } from "@sanity/types";
import { validation } from "sanity";
const episode = {
  name: "episode",
  title: "Episodes",
  type: "document",
  fields: [
    // Grab all metadata from youtube from rewritten plugin.
    // Episde metadata should fall under youtube
    {
      name: "youtube",
      title: "Youtube Embed",
      type: "youtubeVideo",
      validation: (Rule) => Rule.required(),
    },

    {
      // Blurb about the Episode
      name: "blurb",
      title: "Episode Blurb",
      type: "string",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
    },
    {
      // Name of the Episode
      name: "episodeName",
      title: "Episode Name",
      type: "string",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
    },
    {
      // Number of the Episode
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
    },
    // Make adding an ep to a season automatic, do other stuff lol
    // {
    //   name: "season",
    //   title: "Season",
    //   type: "reference",
    //   weak: true,
    //   to: [{ type: "seasons" }],
    // },

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
      // Season Number
      name: "seasonNumber",
      title: "Season Number",
      type: "number",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
    },

    {
      // UUID of the Episode
      name: "uuid",
      title: "UUID",
      type: "string",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
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
      // URL (YouTube Link) of the Episode
      name: "url",
      title: "Video Podcast URL",
      type: "url",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
    },

    {
      // Image  of the Episode
      name: "image",
      title: "YouTube URL Image",
      type: "url",
      deprecated: {
        reason: "Use Youtube Link instead",
      },
      readonly: true,
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
          name: "featuredGuests",
          title: "Guest Names",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Guest Name", type: "string" },
                { name: "about", title: "About Guest", type: "string" },
                { name: "title", title: "Guest Title", type: "string" },
                { name: "url", title: "Guest URL", type: "url" },
                {
                  name: "image",
                  title: "Guest Image",
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },
          ],
        },
        {
          name: "description",
          title: "Description of Episode",
          type: "text",
          deprecated: {
            reason: "Can be pulled from YouTube Video",
          },
          readonly: true,
        },
        {
          name: "hashtags",
          title: "Episode Hashtags",
          type: "array",
          of: [{ type: "string" }],
        },

        // {
        //   Old Episode Links Content stuff
        //   name: "links",
        //   title: "Episode Links",
        //   type: "array",
        //   of: [
        //     {
        //       type: "object",
        //       fields: [
        //         { name: "text", title: "Description of Link", type: "string" },
        //         { name: "linkUrl", title: "Link", type: "url" },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
  ],
};
export default episode;
