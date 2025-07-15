export default {
  name: "aboutHost",
  type: "object",
  title: "About Host",
  fields: [
    { name: "host", type: "string", title: "Host Name" },
    {
      name: "hostImage",
      type: "image",
      title: "Host Image",
      options: { hotspot: true },
    },
    { name: "hostBio", type: "text", title: "Host Bio" },
    { name: "heading", type: "string", title: "Heading" },
    { name: "subtext", type: "text", title: "Subtext" },
    { name: "hostJourney", type: "text", title: "Host Journey (third line)" },
    {
      name: "socialLinks",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "url", title: "URL" },
            { name: "icon", type: "string", title: "Icon (optional)" },
          ],
        },
      ],
    },
  ],
};
