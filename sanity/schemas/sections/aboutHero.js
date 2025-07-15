export default {
  name: "aboutHero",
  type: "object",
  title: "About Hero",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "subtitle", type: "string", title: "Subtitle" },
    {
      name: "badges",
      type: "array",
      title: "Badges",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "url", title: "Link" },
            { name: "icon", type: "string", title: "Icon (optional)" },
          ],
        },
      ],
    },
  ],
};
