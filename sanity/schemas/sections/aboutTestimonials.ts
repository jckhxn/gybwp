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
