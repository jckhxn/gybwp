const sponsor = {
  name: "sponsor",
  title: "Sponsors",
  type: "document",
  // Make this select the image upload of the sponsor
  // preview: {
  //   select: {
  //     media: "image",
  //   },
  // },
  fields: [
    {
      // Name of the Sponsor
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      // UUID of the Sponsor
      name: "uuid",
      title: "UUID (lowercase)",
      type: "string",
    },
    {
      // Image URL of the Sponsor
      name: "image",
      title: "Image URL",
      type: "url",
    },
    {
      name: "bgColor",
      title: "Background Color for Image",
      type: "string",
    },
    {
      // Description of the Sponsor
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      // Audio/Podcast Links of the Episode
      name: "social",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name of Link",
            },
            { name: "link", type: "string", title: "Link" },
          ],
        },
      ],
    },
  ],
};
export default sponsor;
