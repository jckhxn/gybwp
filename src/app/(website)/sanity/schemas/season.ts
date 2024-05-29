// seasons.js

const season = {
  name: "season",
  title: "Seasons",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Season Title",
      type: "string",
      description: "The title of the season e.g Season One",
    },
    {
      name: "sponsors",
      title: "List of Sponsors for the Seasonˆ",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    },
  ],
};

export default season;
