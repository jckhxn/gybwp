import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines (50-60 characters). Leave empty to use default title.",
      validation: (Rule) => 
        Rule.max(60).warning("Title should be under 60 characters for optimal display in search results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "Description for search engines (150-160 characters)",
      validation: (Rule) => 
        Rule.max(160).warning("Description should be under 160 characters for optimal display in search results"),
    }),
    {
      name: "keywords",
      title: "Keywords", 
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for SEO (optional, use sparingly)",
      options: {
        layout: "tags",
      },
    },
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent this page from being indexed by search engines",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean", 
      description: "Prevent search engines from following links on this page",
      initialValue: false,
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      description: "Canonical URL for this page (optional, leave empty to use current page URL)",
    }),
    {
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      description: "Settings for social media sharing",
      fields: [
        {
          name: "title",
          title: "OG Title",
          type: "string",
          description: "Title for social media (leave empty to use meta title or page title)",
        },
        {
          name: "description",
          title: "OG Description", 
          type: "text",
          description: "Description for social media (leave empty to use meta description)",
        },
        {
          name: "image",
          title: "OG Image",
          type: "image",
          description: "Image for social media sharing (1200x630px recommended)",
          options: {
            hotspot: true,
          },
        },
        {
          name: "type",
          title: "OG Type",
          type: "string",
          options: {
            list: [
              { title: "Website", value: "website" },
              { title: "Article", value: "article" },
              { title: "Video", value: "video.episode" },
              { title: "Audio", value: "music.song" },
              { title: "Profile", value: "profile" },
            ],
          },
          initialValue: "website",
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "twitter",
      title: "Twitter Card",
      type: "object",
      description: "Settings for Twitter sharing",
      fields: [
        {
          name: "cardType",
          title: "Card Type",
          type: "string",
          options: {
            list: [
              { title: "Summary", value: "summary" },
              { title: "Summary Large Image", value: "summary_large_image" },
              { title: "Player", value: "player" },
            ],
          },
          initialValue: "summary_large_image",
        },
        {
          name: "site",
          title: "Twitter Site",
          type: "string",
          description: "Twitter handle for the site (e.g., @gybwp_podcast)",
        },
        {
          name: "creator",
          title: "Twitter Creator",
          type: "string", 
          description: "Twitter handle for the content creator",
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
});