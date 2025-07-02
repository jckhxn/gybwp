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
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Hero Subtitle",
      initialValue: "Where Leadership Meets Excellence",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Hero Description",
    }),
    defineField({
      name: "ctaText",
      type: "string",
      title: "CTA Button Text",
      initialValue: "Listen Now",
    }),
    defineField({
      name: "ctaLink",
      type: "string",
      title: "CTA Button Link",
      initialValue: "/episode",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: "Home Hero",
        subtitle: title || "Hero Section",
      };
    },
  },
});
