export default {
  name: "aboutMission",
  type: "object",
  title: "About Mission",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    { name: "text", type: "text", title: "Text" },
    {
      name: "bullets",
      type: "array",
      title: "Bullets",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
  ],
};
