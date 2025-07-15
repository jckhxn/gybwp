import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodesPageBuilder",
  title: "Episodes Page Builder",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    {
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "badgeText",
          type: "string",
          title: "Badge Text",
          initialValue: "Episode Library",
        }),
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          initialValue: "Browse Our Episodes",
        }),
        defineField({
          name: "subtitle",
          type: "string",
          title: "Subtitle",
          description: "Optional subtitle below the main title",
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          initialValue: "Explore our complete library of business insights, leadership strategies, and growth tactics",
        }),
        defineField({
          name: "showStats",
          type: "boolean",
          title: "Show Statistics",
          description: "Display episode count, season count, and expert guests stats",
          initialValue: true,
        }),
        defineField({
          name: "totalEpisodes",
          type: "number",
          title: "Total Episodes (Fallback)",
          description: "Fallback number if dynamic count fails. Leave empty to use live data.",
        }),
        defineField({
          name: "totalSeasons",
          type: "number",
          title: "Total Seasons (Fallback)",
          description: "Fallback number if dynamic count fails. Leave empty to use live data.",
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "directorySection",
      title: "Directory Section",
      type: "object",
      fields: [
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
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    select: {
      heroTitle: "heroSection.title",
      showStats: "heroSection.showStats",
      enableSearch: "directorySection.enableSearch",
      showSeasonFilter: "directorySection.showSeasonFilter",
    },
    prepare({ heroTitle, showStats, enableSearch, showSeasonFilter }) {
      const features = [];
      if (showStats) features.push("Stats");
      if (showSeasonFilter) features.push("Season Filter");
      if (enableSearch) features.push("Search");
      
      return {
        title: heroTitle || "Episodes Page Builder",
        subtitle: features.length > 0 ? `Features: ${features.join(", ")}` : "Episodes page",
      };
    },
  },
});