import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletter",
  title: "Newsletter Signup",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Stay Updated",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      initialValue:
        "Subscribe to our newsletter for the latest episodes and insights.",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "placeholderText",
      title: "Placeholder Text",
      type: "string",
      initialValue: "Enter your email address",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you for subscribing!",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Light Gray", value: "gray" },
          { title: "Dark", value: "dark" },
          { title: "Primary", value: "primary" },
        ],
      },
      initialValue: "gray",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Newsletter Signup",
        subtitle: subtitle || "Newsletter section",
      };
    },
  },
});
