import { defineField, defineType } from "sanity";

// Example schema showing how to support both legacy and new button formats
export default defineType({
  name: "exampleSection",
  title: "Example Section",
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
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
    }),

    // Option 1: Simple legacy button fields (still supported)
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Simple button text (legacy approach)",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "url",
      description: "Simple button link (legacy approach)",
    }),

    // Option 2: New componentLink approach (recommended)
    defineField({
      name: "ctaLink",
      title: "Call to Action Link",
      type: "componentLink",
      description:
        "Advanced button with component linking capabilities (recommended)",
    }),

    // Option 3: Combined approach - object with both legacy and new options
    defineField({
      name: "smartButton",
      title: "Smart Button",
      type: "object",
      description:
        "Button that supports both legacy and component linking formats",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          description: "Text to display on the button",
        }),
        defineField({
          name: "link",
          title: "Simple Link",
          type: "url",
          description: "Simple URL (legacy approach)",
        }),
        defineField({
          name: "componentLink",
          title: "Component Link",
          type: "componentLink",
          description:
            "Advanced component linking (takes priority over simple link)",
        }),
      ],
      preview: {
        select: {
          text: "text",
          hasComponentLink: "componentLink.linkType",
          simpleLink: "link",
        },
        prepare({ text, hasComponentLink, simpleLink }) {
          const linkType = hasComponentLink
            ? "Component Link"
            : simpleLink
              ? "Simple Link"
              : "No Link";
          return {
            title: text || "Button",
            subtitle: linkType,
          };
        },
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      buttonText: "buttonText",
      ctaText: "ctaLink.linkText",
      smartButtonText: "smartButton.text",
    },
    prepare({ title, buttonText, ctaText, smartButtonText }) {
      const button = ctaText || smartButtonText || buttonText;
      return {
        title: title || "Example Section",
        subtitle: button ? `Button: ${button}` : "No button",
      };
    },
  },
});
