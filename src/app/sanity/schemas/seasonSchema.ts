import { Rule } from "@sanity/types";
// Example query to get season name, number from episode
// *[_type == "episode" && uuid == "411-3"]
// {
//   seasons -> {
//     seasonNumber,
//     seasonName,
//   }
// }

// Fetch all episodes that include the season._ref which is equal to the season _id field
// Display them in a component?
// This doesn't exactly solve issues with query changes down the road.
export const season = {
  name: "seasons",
  title: "Seasons",
  type: "document",
  fields: [
    {
      // Season Name
      name: "seasonName",
      title: "Season Name",
      type: "string",

      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          if (!value.includes("Season")) {
            // The freakin' thing must say Season.
            return 'Season name must start with  "Season", e.g "Season Four"';
          }
          return true;
        }),
    },
    {
      // Season Number
      name: "seasonNumber",
      title: "Season Number",
      type: "number",
    },

    {
      name: "episodes",
      title: "Episodes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "episode" }] }],
    },
  ],
};
