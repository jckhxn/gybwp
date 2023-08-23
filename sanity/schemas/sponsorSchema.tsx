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
      title: "UUID (Sponsor Name again)",
      type: "string",
    },
    {
      // Image URL of the Sponsor
      name: "image",
      title: "Image URL",
      type: "url",
    },
    {
      // Description of the Sponsor
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      // Social Media Links of the Sponsor
      name: "socials",
      title: "Social Media Links",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
export default sponsor;
