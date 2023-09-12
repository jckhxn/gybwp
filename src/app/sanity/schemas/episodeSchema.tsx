const episode = {
  name: "episode",  
  title: "Episodes",
  type: "document",
  fields: [
    {
      // Name of the Episode
      name: "episodeName",
      title: "Episode Name",
      type: "string",
    },
    {
      // Number of the Episode
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
    },
    {
      // Season Name
      name: "seasonName",
      title: "Season Name",
      type: "string",
    },
    {
      // Season Number
      name: "seasonNumber",
      title: "Season Number",
      type: "number",
    },

    {
      // UUID of the Episode
      name: "uuid",
      title: "UUID",
      type: "string",
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
      title: "List of Sponsors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      // URL (YouTube Link) of the Episode
      name: "url",
      title: "Video Podcast URL",
      type: "url",
    },
    {
      // Image  of the Episode
      name: "image",
      title: "YouTube URL Image",
      type: "url",
    },
    {
      // Blurb about the Episode
      name: "blurb",
      title: "Episode Blurb",
      type: "string",
    },

    // {
    //   // Additional Content
    //  I haven't implented this yet lol
    //   name: "content",
    //   title: "Episode Content",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "files",
    //       title: "Files",
    //       type: "array",
    //       of: [
    //         {
    //           type: "object",
    //           fields: [
    //             { name: "name", title: "File Name", type: "string" },
    //             { name: "file", title: "Upload File", type: "file" },
    //             {
    //               name: "type",
    //               title: "Type of File",
    //               type: "string",
    //               options: {
    //                 list: [
    //                   { title: "pdf", value: "pdf" },
    //                   { title: "image", value: "image" },
    //                 ],
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
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
        },
        {
          name: "hashtags",
          title: "Episode Hashtags",
          type: "array",
          of: [{ type: "string" }],
        },

        {
          // Array of objects with text and linkUrl
          name: "links",
          title: "Episode Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", title: "Description of Link", type: "string" },
                { name: "linkUrl", title: "Link", type: "url" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export default episode;
