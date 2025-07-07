import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeHero",
  title: "Home Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Hero Title",
      initialValue: "Growing Your Business With People",
    } as any),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Hero Subtitle",
      initialValue: "Where Leadership Meets Excellence",
    } as any),
    defineField({
      name: "description",
      type: "text",
      title: "Hero Description",
      initialValue:
        "Join CEO & Leadership Coach Jeff Lackey as he explores how the best leaders grow their companies by investing in their most valuable asset: their people.",
    }),
    defineField({
      name: "badgeText",
      type: "string",
      title: "Top Badge Text",
      initialValue: "Business Leadership Podcast",
    } as any),
    defineField({
      name: "primaryButton",
      type: "object",
      title: "Primary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "Listen Now",
        } as any),
        defineField({
          name: "link",
          type: "string",
          title: "Button Link",
          initialValue: "/episodes",
        }),
      ],
    } as any),
    defineField({
      name: "secondaryButton",
      type: "object",
      title: "Secondary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "About Jeff",
        } as any),
        defineField({
          name: "link",
          type: "string",
          title: "Button Link",
          initialValue: "/about",
        }),
      ],
    }),
    defineField({
      name: "platformsHeading",
      type: "string",
      title: "Platforms Heading",
      initialValue: "Available on:",
    } as any),
    defineField({
      name: "platforms",
      type: "array",
      title: "Podcast Platforms",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Platform Name",
            } as any),
            defineField({
              name: "url",
              type: "url",
              title: "Platform URL",
            } as any),
            defineField({
              name: "logoImage",
              type: "image",
              title: "Platform Logo",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logoImage",
            },
          },
        },
      ],
      initialValue: [
        {
          name: "Apple Podcasts",
          url: "https://podcasts.apple.com/us/podcast/growing-your-business-with-people/id1659743511",
        },
        {
          name: "Spotify",
          url: "https://open.spotify.com/show/4RgF6I69FdiDzBgTLzZlWH",
        },
        {
          name: "Buzzsprout",
          url: "https://www.buzzsprout.com/2057493",
        },
      ],
    } as any),
    defineField({
      name: "hostBadge",
      type: "object",
      title: "Host Badge",
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Badge Label",
          initialValue: "Host",
        } as any),
        defineField({
          name: "name",
          type: "string",
          title: "Host Name",
          initialValue: "Jeff Lackey",
        } as any),
        defineField({
          name: "title",
          type: "string",
          title: "Host Title",
          initialValue: "CEO & Leadership Coach",
        } as any),
      ],
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Hero Background Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showLatestEpisode",
      type: "boolean",
      title: "Show Latest Episode",
      initialValue: false,
    } as any),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Home Hero",
        subtitle: subtitle || "Hero section",
      };
    },
  },
});
