const season = {
  name: "season",
  title: "Season",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Season Title",
      type: "string",
    },
    {
      name: "description",
      title: "Season Description",
      type: "text",
    },

    {
      name: "episodes",
      title: "Episodes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "episode" }] }],
    },
  ],
};
export default season;
