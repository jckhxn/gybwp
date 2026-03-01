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
        "When enabled, all website pages will display the maintenance page instead of the normal site. Edit the maintenance page content in the Maintenance Page document.",
      initialValue: false,
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
