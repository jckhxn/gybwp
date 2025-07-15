import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingPhilosophy",
  title: "Consulting Philosophy",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Our Philosophy",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "People Are Your Greatest Investment",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue:
        "Within the Consulting practice of JKL Advisors, we help CEOs and business leaders grow their business with the biggest and most important investment - People!",
    }),
    defineField({
      name: "content",
      title: "Additional Content",
      type: "text",
      description: "Optional additional paragraph content",
    }),
    defineField({
      name: "keyBenefits",
      title: "Key Benefits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Benefit Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon identifier (target, award, lightbulb)",
              options: {
                list: [
                  { title: "Target", value: "target" },
                  { title: "Award", value: "award" },
                  { title: "Lightbulb", value: "lightbulb" },
                ],
              },
              initialValue: "target",
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              icon: "icon",
            },
            // INSERT_YOUR_REWRITE_HERE
            prepare({ title, description, icon }) {
              return {
                title: title || "Benefit",
                subtitle: description || "Benefit description",
                media: icon ? ` ${icon}` : "",
              };
            },
          },
        },
      ],
      initialValue: [
        {
          icon: "target",
          title: "Maximizing Organizational Performance",
          description: "Strategic talent alignment with business objectives",
        },
        {
          icon: "award",
          title: "Leadership and Talent Development",
          description: "Building capability and succession planning",
        },
        {
          icon: "lightbulb",
          title: "Creating High-Performance Cultures",
          description: "Fostering innovation and sustainable growth",
        },
      ],
    }),
    defineField({
      name: "philosophyImage",
      title: "Philosophy Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          initialValue: "Business transformation through people",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      media: "philosophyImage",
    },
    prepare({ title, badgeText, media }) {
      return {
        title: title || "Consulting Philosophy",
        subtitle: badgeText || "Our Philosophy",
        media,
      };
    },
  },
});
