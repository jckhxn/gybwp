import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingHero",
  title: "Consulting Hero",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "badgeText",
      type: "string",
      title: "Badge Text",
      initialValue: "JKL Advisors Consulting",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Empowering Your Business with People",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      initialValue: "Transform your organization through strategic talent solutions. With 28+ years of experience and over 1 million successful hires, we help businesses grow through their most important investment: people.",
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Statistics",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", type: "string", title: "Number" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
        },
      ],
      initialValue: [
        { number: "28+", label: "Years of Experience" },
        { number: "1M+", label: "Professionals Hired" },
        { number: "70+", label: "Countries Served" },
        { number: "200k+", label: "Annual Hires Supported" },
      ],
    }),
    defineField({
      name: "showCalendarCTA",
      title: "Show Calendar CTA",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "calendarUrl",
      title: "Calendar URL",
      type: "url",
      initialValue: "https://cal.com/jeffrey-lackey-sr/30min",
      hidden: ({ parent }) => !parent?.showCalendarCTA,
    }),
    defineField({
      name: "calendarButtonText",
      title: "Calendar Button Text",
      type: "string",
      initialValue: "Schedule Your 30-Minute Strategy Call",
      hidden: ({ parent }) => !parent?.showCalendarCTA,
    }),
    defineField({
      name: "calendarFeatures",
      title: "Calendar Features",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Free consultation",
        "Instant booking",
        "No commitment required",
      ],
      hidden: ({ parent }) => !parent?.showCalendarCTA,
    }),
    {
      name: "secondaryButton",
      type: "object",
      title: "Secondary Button",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "Send Message",
        }),
        defineField({
          name: "link",
          type: "string",
          title: "Button Link",
          initialValue: "#contact",
        }),
        defineField({
          name: "componentLink",
          type: "componentLink",
          title: "Component Link",
          description:
            "Advanced linking options - use this instead of the simple link field for more control",
        }),
      ],
    },
    {
      name: "tertiaryButton",
      type: "object",
      title: "Tertiary Button (Optional)",
      fields: [
        defineField({
          name: "text",
          type: "string",
          title: "Button Text",
          initialValue: "Explore Services",
        }),
        defineField({
          name: "link",
          type: "string",
          title: "Button Link",
          initialValue: "#services",
        }),
        defineField({
          name: "componentLink",
          type: "componentLink",
          title: "Component Link",
          description:
            "Advanced linking options - use this instead of the simple link field for more control",
        }),
      ],
    },
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          initialValue: "Consulting Services",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      media: "heroImage",
      showCalendarCTA: "showCalendarCTA",
    },
    prepare({ title, badgeText, media, showCalendarCTA }) {
      const features = [];
      if (showCalendarCTA) features.push("Calendar CTA");
      
      return {
        title: title || "Consulting Hero",
        subtitle: `${badgeText || "JKL Advisors Consulting"}${features.length ? ` (${features.join(", ")})` : ""}`,
        media,
      };
    },
  },
});