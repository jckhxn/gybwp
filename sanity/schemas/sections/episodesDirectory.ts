import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodesDirectory",
  title: "Episodes Directory",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "showSeasonFilter",
      type: "boolean",
      title: "Show Season Filter",
      description: "Enable season dropdown filter",
      initialValue: true,
    }),
    defineField({
      name: "enableSearch",
      type: "boolean",
      title: "Enable Search",
      description: "Allow users to search episodes by title, description, or guests",
      initialValue: true,
    }),
    defineField({
      name: "enableFilters",
      type: "boolean",
      title: "Enable Filters",
      description: "Show filters panel with sort options",
      initialValue: true,
    }),
    defineField({
      name: "enableViewModes",
      type: "boolean",
      title: "Enable View Modes",
      description: "Allow users to switch between grid and list view",
      initialValue: true,
    }),
    defineField({
      name: "defaultSort",
      type: "string",
      title: "Default Sort Order",
      options: {
        list: [
          { title: "Newest First", value: "newest" },
          { title: "Oldest First", value: "oldest" },
          { title: "Episode Number", value: "episode" },
        ],
      },
      initialValue: "newest",
    }),
    defineField({
      name: "itemsPerPageGrid",
      type: "number",
      title: "Items Per Page (Grid View)",
      description: "Number of episodes to show per page in grid view",
      initialValue: 12,
      validation: (Rule) => Rule.min(1).max(50),
    }),
    defineField({
      name: "itemsPerPageList",
      type: "number",
      title: "Items Per Page (List View)",
      description: "Number of episodes to show per page in list view",
      initialValue: 8,
      validation: (Rule) => Rule.min(1).max(20),
    }),
  ],
  preview: {
    select: {
      enableSearch: "enableSearch",
      enableFilters: "enableFilters",
      showSeasonFilter: "showSeasonFilter",
      defaultSort: "defaultSort",
    },
    prepare({ enableSearch, enableFilters, showSeasonFilter, defaultSort }) {
      const features = [];
      if (showSeasonFilter) features.push("Season Filter");
      if (enableSearch) features.push("Search");
      if (enableFilters) features.push("Filters");
      
      return {
        title: "Episodes Directory",
        subtitle: `${features.join(", ")} | Sort: ${defaultSort || "newest"}`,
      };
    },
  },
});