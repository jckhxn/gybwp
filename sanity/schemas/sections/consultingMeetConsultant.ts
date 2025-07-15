import { defineField, defineType } from "sanity";

export default defineType({
  name: "consultingMeetConsultant",
  title: "Meet Your Consultant",
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
      initialValue: "Meet Your Consultant",
    }),
    defineField({
      name: "name",
      title: "Consultant Name",
      type: "string",
      initialValue: "Jeffrey Lackey, Sr.",
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      initialValue: "Global Strategic Talent Leader",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      initialValue: "With over 28 years of experience in strategic talent acquisition, Jeffrey stays ahead of technology and innovation trends to provide cutting-edge solutions for businesses worldwide. His thought leadership and deep industry expertise have helped organizations across 70+ countries build world-class teams.",
    }),
    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      initialValue: "JKL Advisors specializes in connecting exceptional talent with forward-thinking companies, leveraging innovative recruitment strategies and a deep understanding of global markets to drive sustainable growth through people.",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
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
        { number: "1M+", label: "Professionals Hired" },
        { number: "28+", label: "Years Experience" },
      ],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          initialValue: "Jeffrey Lackey, Sr.",
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Testimonial Text",
          type: "text",
          initialValue: "Jeffrey's strategic approach to talent acquisition has transformed our organization. His deep understanding of global markets and innovative recruitment strategies have been invaluable.",
        }),
        defineField({
          name: "author",
          title: "Author Name",
          type: "string",
          initialValue: "Sarah Chen",
        }),
        defineField({
          name: "position",
          title: "Author Position",
          type: "string",
          initialValue: "CEO",
        }),
        defineField({
          name: "company",
          title: "Company",
          type: "string",
          initialValue: "TechVision Global",
        }),
        defineField({
          name: "rating",
          title: "Star Rating",
          type: "number",
          initialValue: 5,
          validation: (Rule) => Rule.min(1).max(5),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      media: "profileImage",
    },
    prepare({ name, title, media }) {
      return {
        title: name || "Jeffrey Lackey, Sr.",
        subtitle: title || "Global Strategic Talent Leader",
        media,
      };
    },
  },
});