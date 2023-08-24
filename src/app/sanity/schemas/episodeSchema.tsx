const episode = {
  name: "episode",
  title: "Episodes",
  type: "document",
  fields: [
    {
      // Season Name
      name: "seasonName",
      title: " Season Name",
      type: "string",
    },
    {
      // Season Number
      name: "seasonNumber",
      title: "Season Number",
      type: "number",
    },
    {
      // Name of the Episode
      name: "episodeName",
      title: "Name",
      type: "string",
    },
    {
      // Number of the Episode
      name: "episodeNumber",
      title: "Episode Number",
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
              name: "platform",
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

    {
      // Details about the Guest in the Episode
      name: "guestDetails",
      title: "Guest Details",
      type: "object",
      fields: [
        { name: "guestName", title: "Guest Name", type: "string" },
        { name: "aboutGuest", title: "About Guest", type: "string" },
        { name: "guestTitle", title: "Guest Title", type: "string" },
        { name: "guestURL", title: "Guest URL", type: "url" },
        {
          name: "guestImage",
          title: "Guest Image",
          type: "string",
        },
      ],
    },
    {
      // Details about the Episode
      name: "episodeDetails",
      title: "Episode Details",
      type: "object",
      fields: [
        { name: "description", title: "Episode Description", type: "text" },
        {
          name: "hashtags",
          title: "Episode Hashtags",
          type: "array",
          of: [{ type: "string" }],
        },

        {
          name: "links",
          title: "Episode Links",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    },
  ],
};
export default episode;
