const sponsor = {
  name: "sponsor",
  title: "Sponsors",
  type: "document",
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
    {
      // Seasons of Podcast Sponsored
      name: "seasonsSponsored",
      title: "Seasons Sponsored",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
export default sponsor;
