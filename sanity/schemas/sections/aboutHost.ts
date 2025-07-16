import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutHost",
  title: "About Host",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "host",
      type: "string",
      title: "Host Name",
      initialValue: "Jeff Lackey",
    }),
    defineField({
      name: "hostImage",
      type: "image",
      title: "Host Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "hostBio",
      type: "text",
      title: "Host Bio",
      initialValue: "Jeff is passionate about helping leaders unlock the full potential of their teams. With decades of experience in talent, leadership, and business transformation, he brings a unique perspective to every conversation.",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "Meet the Host",
    }),
    defineField({
      name: "subtext",
      type: "text",
      title: "Subtext",
      initialValue: "\"I firmly believe people aren't just a company's most vital asset; they're an investment primed for growth.\"",
    }),
    defineField({
      name: "hostJourney",
      type: "text",
      title: "Host Journey",
      initialValue: "Jeff's leadership journey includes roles at Fortune 100 companies, startups, and everything in between. He's on a mission to help you grow your business—with people.",
    }),
  ],
  preview: {
    select: {
      title: "host",
      subtitle: "heading",
      media: "hostImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "About Host",
        subtitle: subtitle || "Host section",
        media,
      };
    },
  },
});
