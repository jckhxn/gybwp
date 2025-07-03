import { defineField, defineType } from "sanity";
import { definePathname } from "@tinloof/sanity-studio";
import { generateEpisodePathname } from "../../utils/slugify";
import React from "react";

export default defineType({
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    definePathname({
      name: "pathname",
      description:
        "After adding YouTube video, manually click the generate button or enter the pathname",
      options: {
        folder: {
          canUnlock: true,
        },
      },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          const youtubeTitle = context.document?.youtube?.title;
          if (
            youtubeTitle &&
            (!value?.current || value.current === "/episode/")
          ) {
            const suggestedPath = generateEpisodePathname(youtubeTitle);
            return {
              message: `Suggested pathname: ${suggestedPath}`,
              level: "info",
            };
          }
          return true;
        }),
      hidden: ({ document }: any) => !document?.youtube?.title,
    }),
    defineField({
      name: "youtube",
      title: "YouTube Video",
      type: "youtubeVideo",
      description: "Add the YouTube video for this episode",
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "reference",
      to: [{ type: "season" }],
    } as any),
    defineField({
      name: "guests",
      title: "Guests",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
          options: {
            filter: 'role == "guest"',
          },
        },
      ],
    } as any),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
        },
      ],
    } as any),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "episodeTranscriptField",
    }),
    defineField({
      name: "customLayout",
      title: "Custom Layout",
      type: "boolean",
      description: "Enable custom page builder layout for this episode",
      initialValue: false,
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
      description:
        "Custom sections for this episode (only used if Custom Layout is enabled)",
      hidden: ({ document }: { document: any }) => !document?.customLayout,
    } as any),
    defineField({
      name: "featured",
      title: "Featured Episode",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Business", value: "business" },
          { title: "Leadership", value: "leadership" },
          { title: "Technology", value: "technology" },
          { title: "HR", value: "hr" },
          { title: "Strategy", value: "strategy" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "youtube.title",
      subtitle: "pathname.current",
      thumbnail: "youtube.thumbnail",
    },
    prepare({
      title,
      subtitle,
      thumbnail,
    }: {
      title?: string;
      subtitle?: string;
      thumbnail?: string;
    }) {
      return {
        title,
        subtitle,
        media: thumbnail
          ? () =>
              React.createElement("img", {
                src: thumbnail,
                alt: title || "thumbnail",
                style: { objectFit: "cover", width: "100%", height: "100%" },
              })
          : undefined,
      };
    },
  },
});
