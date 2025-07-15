import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingServices",
  title: "Consulting Services",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from title if not provided.",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Comprehensive Talent Solutions",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: "From strategic planning to execution, we provide end-to-end consulting services that drive sustainable business growth through people.",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Service Title",
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
              description: "Icon identifier (users, globe, trendingUp, building, target, award, lightbulb)",
              options: {
                list: [
                  { title: "Users", value: "users" },
                  { title: "Globe", value: "globe" },
                  { title: "Trending Up", value: "trendingUp" },
                  { title: "Building", value: "building" },
                  { title: "Target", value: "target" },
                  { title: "Award", value: "award" },
                  { title: "Lightbulb", value: "lightbulb" },
                ],
              },
              initialValue: "users",
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              icon: "icon",
            },
            prepare({ title, description, icon }) {
              return {
                title: title || "Service",
                subtitle: description || "Service description",
                media: icon ? `📋 ${icon}` : "📋",
              };
            },
          },
        },
      ],
      initialValue: [
        {
          icon: "users",
          title: "Talent Acquisition & Management",
          description: "End-to-end talent solutions from attraction to retention",
          features: [
            "Strategic talent planning",
            "Executive search & coaching",
            "Vendor assessment & selection",
            "Performance optimization",
          ],
        },
        {
          icon: "globe",
          title: "Global Experience",
          description: "Proven expertise across 70+ countries and diverse industries",
          features: [
            "Healthcare & pharmaceuticals",
            "Insurance & financial services",
            "Aerospace & defense",
            "Retail & communications",
          ],
        },
        {
          icon: "trendingUp",
          title: "Functional Excellence",
          description: "28+ years of proven results in talent transformation",
          features: [
            "High-volume recruitment (200k+ hires)",
            "AI/ML & predictive analytics",
            "Diversity, equity & inclusion",
            "Performance management",
          ],
        },
        {
          icon: "building",
          title: "Business Support & Planning",
          description: "Strategic assessment and operational excellence",
          features: [
            "Performance management",
            "Strategic assessment",
            "Recruitment marketing",
            "Interim leadership roles",
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      badgeText: "badgeText",
      servicesCount: "services.length",
    },
    prepare({ title, badgeText, servicesCount }) {
      return {
        title: title || "Consulting Services",
        subtitle: `${badgeText || "Our Services"} (${servicesCount || 0} services)`,
      };
    },
  },
});
