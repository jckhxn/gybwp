import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutListenConnect",
  title: "About Listen & Connect",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "How to Listen & Connect",
    }),
    defineField({
      name: "text",
      type: "text",
      title: "Text",
      initialValue: "Subscribe on your favorite platform, or contact us to get in touch.",
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
      title: "heading",
      platforms: "platforms",
    },
    prepare({ title, platforms }) {
      const count = platforms ? platforms.length : 0;
      return {
        title: title || "About Listen & Connect",
        subtitle: `${count} platform${count !== 1 ? 's' : ''}`,
      };
    },
  },
}); 