import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingContact",
  title: "Consulting Contact",
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
      title: "Badge Text",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Ready to Transform Your Business?",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: "Let's discuss how we can help you achieve your talent and growth objectives. Choose your preferred way to connect with Jeff.",
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
      name: "showContactForm",
      title: "Show Contact Form",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      showCalendarCTA: "showCalendarCTA",
      showContactForm: "showContactForm",
    },
    prepare({ title, badgeText, showCalendarCTA, showContactForm }) {
      const features = [];
      if (showCalendarCTA) features.push("Calendar");
      if (showContactForm) features.push("Form");
      
      return {
        title: title || "Consulting Contact",
        subtitle: `${badgeText || "Get Started"} (${features.join(" + ") || "None"})`,
      };
    },
  },
});