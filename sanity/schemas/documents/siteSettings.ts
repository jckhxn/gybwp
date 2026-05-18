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
    defineField({
      name: "maintenanceModeLocalhost",
      title: "Maintenance Mode (Localhost)",
      type: "boolean",
      description:
        "When enabled, the site will display the maintenance page only when accessed from localhost (useful for testing maintenance locally).",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      maintenanceMode: "maintenanceMode",
      maintenanceModeLocalhost: "maintenanceModeLocalhost",
    },
    prepare({ maintenanceMode, maintenanceModeLocalhost }) {
      let subtitle = "Live";
      if (maintenanceMode) subtitle = "⚠️ Maintenance mode ON";
      else if (maintenanceModeLocalhost) subtitle = "Localhost maintenance";

      return {
        title: "Site Settings",
        subtitle,
      };
    },
  },
});
