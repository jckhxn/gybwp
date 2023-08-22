const episode = {
  name: "episode",
  title: "Episodes",
  type: "document",
  fields: [
    {
      // Name of the Episode
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      // Number of the Episode
      name: "number",
      title: "Number",
      type: "number",
    },
    {
      // UUID of the Episode
      name: "uuid",
      title: "UUID",
      type: "string",
    },
    {
      // Episode Links of the Episode
      name: "episodeLinks",
      title: "Episode Links",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "link", type: "string", title: "Link" },
      ],
    },
    {
      // Sponsors of the Episode
      name: "sponsors",
      title: "Sponsors",
      type: "array",
    },
    {
      // URL (YouTube Link) of the Episode
      name: "url",
      title: "URL",
      type: "string",
    },
    {
      // Image (YouTube Link) of the Episode
      name: "image",
      title: "Image",
      type: "string",
    },
    {
      // Blurb about the Episode
      name: "blurb",
      title: "Blurb",
      type: "string",
    },
  ],
};
