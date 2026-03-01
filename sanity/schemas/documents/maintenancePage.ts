import { defineField, defineType } from "sanity";
import { definePathname } from "@tinloof/sanity-studio";

export default defineType({
  name: "maintenancePage",
  title: "Maintenance Page",
  type: "document",
  // Only one should exist - prevent creating duplicates via the studio
  // __experimental_actions: ["update", "publish", "unpublish"],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For internal reference only – not shown on the page.",
      initialValue: "Maintenance Page",
    }),
    definePathname({ name: "pathname" }),
    defineField({
      name: "showLogo",
      title: "Show Logo",
      type: "boolean",
      description: "Display the site logo at the top of the card.",
      initialValue: true,
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      description:
        'Small badge shown above the heading (e.g. "Scheduled Maintenance").',
      initialValue: "Scheduled Maintenance",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Main heading shown on the maintenance page.",
      initialValue: "We'll Be Right Back",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      description: "Short message shown beneath the heading.",
      initialValue:
        "We're making some improvements to bring you a better experience. Check back soon.",
    }),
  ],
  preview: {
    select: {
      title: "internalTitle",
      heading: "heading",
    },
    prepare({ title, heading }) {
      return {
        title: title || "Maintenance Page",
        subtitle: heading,
      };
    },
  },
});
