import { defineField, defineType } from "sanity";

export default defineType({
  name: "episodeTemplate",
  title: "Episode Details Template",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Template Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Template Description",
      type: "text",
      description: "Describe what this template is used for",
    }),
    defineField({
      name: "isDefault",
      title: "Default Template",
      type: "boolean",
      description: "Is this the default template for all episodes?",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value === true) {
            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-01-01" });
            
            // Check if there's already a default template
            const existingDefault = await client.fetch(
              `*[_type == "episodeTemplate" && isDefault == true && _id != $id][0]`,
              { id: document?._id }
            );
            
            if (existingDefault) {
              return "Only one template can be set as default. Please uncheck the current default template first.";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "sectionsBody",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "episodeHero" },
        { type: "episodePlayer" },
        { type: "episodeOverview" },
        { type: "episodeTranscript" },
        { type: "episodeGuests" },
        { type: "episodeSponsors" },
        { type: "relatedEpisodes" },
        { type: "subscribeSection" },
        { type: "newsletter" },
        { type: "consultingCTA" },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      isDefault: "isDefault",
      sectionCount: "sectionsBody.length",
    },
    prepare({ title, isDefault, sectionCount }) {
      return {
        title,
        subtitle: `${isDefault ? "Default Template • " : ""}${sectionCount || 0} sections`,
        media: isDefault ? "🏠" : "📄",
      };
    },
  },
});
