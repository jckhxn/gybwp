import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "boolean",
      description:
        "When enabled, all website pages will display a maintenance message instead of the normal site.",
      initialValue: false,
    }),
    defineField({
      name: "maintenanceTitle",
      title: "Maintenance Title",
      type: "string",
      description: "Heading shown on the maintenance page.",
      initialValue: "We'll Be Right Back",
      hidden: ({ document }) => !document?.maintenanceMode,
    }),
    defineField({
      name: "maintenanceMessage",
      title: "Maintenance Message",
      type: "text",
      description: "Message shown beneath the title on the maintenance page.",
      initialValue: "We're making some improvements. Check back soon!",
      hidden: ({ document }) => !document?.maintenanceMode,
    }),
  ],
  preview: {
    select: {
      maintenanceMode: "maintenanceMode",
    },
    prepare({ maintenanceMode }) {
      return {
        title: "Site Settings",
        subtitle: maintenanceMode ? "⚠️ Maintenance mode ON" : "Live",
      };
    },
  },
});
