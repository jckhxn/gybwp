import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutHero",
  title: "About Hero",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "badgeText",
      type: "string",
      title: "Badge Text",
      initialValue: "About the Podcast",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Growing Your Business With People",
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
      initialValue: "Actionable insights for leaders who believe people are their greatest investment. Join us for fireside chats with Fortune 100 CEOs, startup founders, bestselling authors, and industry pioneers.",
    }),
    defineField({
      name: "platforms",
      type: "array",
      title: "Platforms",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Platform Name" }),
            defineField({ name: "url", type: "url", title: "Platform URL" }),
            defineField({ name: "icon", type: "string", title: "Icon (optional)" }),
          ],
        },
      ],
      initialValue: [
        {
          name: "Apple Podcasts",
          url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511"
        },
        {
          name: "Spotify",
          url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH"
        },
        {
          name: "BuzzSprout",
          url: "https://www.buzzsprout.com/2057493/share"
        },
        {
          name: "Contact",
          url: "/consulting"
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
    },
    prepare({ title, badgeText }) {
      return {
        title: title || "About Hero",
        subtitle: badgeText || "About the Podcast",
      };
    },
  },
});
