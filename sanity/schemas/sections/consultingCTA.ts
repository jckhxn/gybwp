import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingCTA",
  title: "Consulting CTA",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Ready to Get Started?",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      initialValue:
        "Let's discuss how we can help grow your business with people.",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      initialValue: "/consulting#contact",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "showContactForm",
      title: "Show Contact Form Instead of Link",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Consulting CTA",
        subtitle: subtitle || "Call-to-action section",
      };
    },
  },
});
