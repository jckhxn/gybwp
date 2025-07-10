import { defineField, defineType } from "sanity";

/**
 * Episode Details Template - Singleton Document
 *
 * This template defines the structure for all episode detail pages.
 * It works with the existing EpisodeSectionRenderer component to render
 * episode-specific sections that receive episode data as props.
 *
 * Usage in frontend:
 * 1. Query this template to get the sectionsBody
 * 2. Query the specific episode data
 * 3. Use EpisodeSectionRenderer to render each section with episode data
 *
 * Example:
 * ```tsx
 * import { EpisodeSectionRenderer } from "@/src/components/sections/episodes/EpisodeSectionRenderer";
 *
 * function EpisodePage({ template, episode }) {
 *   return (
 *     <div>
 *       {template.sectionsBody?.map((section) => (
 *         <EpisodeSectionRenderer
 *           key={section._key}
 *           section={section}
 *           episode={episode}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */

export default defineType({
  name: "episodeTemplate",
  title: "Episode Details Template",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Template Title",
      type: "string",
      initialValue: "Episode Details Template",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Template Description",
      type: "text",
      description:
        "Template for all episode detail pages with predefined sections that receive data from individual episodes",
      initialValue:
        "This template defines the layout and sections for all episode detail pages. Each section will automatically receive its props from the episode document being viewed.",
    }),
    {
      name: "sectionsBody",
      title: "Episode Page Sections",
      type: "array",
      description:
        "Predefined sections for episode detail pages. Each section will receive episode data automatically.",
      initialValue: [
        { _type: "episodeHero", _key: "episodeHero" },
        { _type: "episodePlayer", _key: "episodePlayer" },
        { _type: "episodeOverview", _key: "episodeOverview" },
        { _type: "episodeTranscript", _key: "episodeTranscript" },
        { _type: "episodeGuests", _key: "episodeGuests" },
        { _type: "episodeSponsors", _key: "episodeSponsors" },
        { _type: "relatedEpisodes", _key: "relatedEpisodes" },
        { _type: "subscribeSection", _key: "subscribeSection" },
      ],
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
      validation: (Rule: any) => Rule.required().min(1),
    },
    defineField({
      name: "usage",
      title: "Usage Instructions",
      type: "text",
      description: "How to use this template in your application",
      initialValue:
        "This template should be used as a singleton. There should only be one instance of this document. When rendering episode pages, query this template and combine its sectionsBody with the individual episode data to render the complete episode page.",
      readOnly: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Episode Details Template",
        subtitle: "Template for all episode pages",
      };
    },
  },
});
