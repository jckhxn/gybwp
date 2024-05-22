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
      name: "number",
      title: "Season Number",
      type: "number",
      description: "The number of the Season",
    },
  ],
  initialValue: ({ document }) => ({
    // Custom function to set the season number automatically
    number: getSeasonNumber(document),
  }),
};


function getSeasonNumber(document) {
  console.log(document);
}

export default season;
