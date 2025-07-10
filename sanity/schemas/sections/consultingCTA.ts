import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingCTA",
  title: "Consulting CTA",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
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
      name: "componentLink",
      type: "componentLink",
      title: "Component Link",
      description:
        "Advanced linking options - use this instead of the simple button link field for more control",
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
