import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutTestimonials",
  title: "About Testimonials",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "Optional custom ID for this section. Will auto-generate from schema name if not provided.",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "What Listeners Say",
    }),
    defineField({
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "text", type: "text", title: "Testimonial Text" }),
          ],
        },
      ],
      initialValue: [
        {
          name: "Sarah K.",
          text: "Incredible guests and actionable advice. This podcast is a must-listen for any leader!"
        },
        {
          name: "Mike D.",
          text: "Jeff's approach is authentic and insightful. I always walk away with something new."
        },
        {
          name: "Priya S.",
          text: "The best podcast for people-first leadership. Highly recommended!"
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      testimonials: "testimonials",
    },
    prepare({ title, testimonials }) {
      const count = testimonials ? testimonials.length : 0;
      return {
        title: title || "About Testimonials",
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
