import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletter",
  title: "Newsletter Signup",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Stay Updated",
    } as any),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      initialValue:
        "Subscribe to our newsletter for the latest episodes and insights.",
    } as any),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Subscribe",
    } as any),
    defineField({
      name: "placeholderText",
      title: "Placeholder Text",
      type: "string",
      initialValue: "Enter your email address",
    } as any),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you for subscribing!",
    } as any),
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
    } as any),
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
