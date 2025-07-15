export default {
  name: "aboutTestimonials",
  type: "object",
  title: "About Testimonials",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    {
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "text", type: "text", title: "Text" },
          ],
        },
      ],
    },
  ],
};
