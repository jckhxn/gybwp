import { defineType, defineField } from "sanity";
import { ComponentIdInput } from "../../components/ComponentIdInput";
import { ComponentLinkInput } from "../../components/ComponentLinkInput";

export default defineType({
  name: "componentLink",
  title: "Component Link",
  type: "object",
  description: "Link to another component on the same page or a different page",
  components: {
    input: ComponentLinkInput,
  },
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Same Page Component", value: "samePage" },
          { title: "Different Page Component", value: "differentPage" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "samePage",
    }),

    // For same page links
    defineField({
      name: "targetComponentId",
      title: "Target Component ID",
      type: "string",
      description: "Select or enter the component ID to scroll to on this page",
      hidden: ({ parent }) => parent?.linkType !== "samePage",
      components: {
        input: ComponentIdInput,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const linkType = (context.parent as any)?.linkType;
          if (linkType === "samePage" && !value) {
            return "Component ID is required for same page links";
          }
          return true;
        }),
    }),

    // For different page links
    defineField({
      name: "targetPage",
      title: "Target Page",
      type: "reference",
      to: [{ type: "page" }, { type: "episode" }, { type: "person" }],
      description: "Select the page to link to",
      hidden: ({ parent }) => parent?.linkType !== "differentPage",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const linkType = (context.parent as any)?.linkType;
          if (linkType === "differentPage" && !value) {
            return "Target page is required for different page links";
          }
          return true;
        }),
    }),

    defineField({
      name: "targetPageComponentId",
      title: "Target Page Component ID",
      type: "string",
      description:
        "Optional: ID of specific component on the target page to scroll to",
      hidden: ({ parent }) => parent?.linkType !== "differentPage",
      components: {
        input: ComponentIdInput,
      },
    }),

    // For external URLs
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "External URL to link to",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const linkType = (context.parent as any)?.linkType;
          if (linkType === "external" && !value) {
            return "External URL is required for external links";
          }
          return true;
        }),
    }),

    // Common fields
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description: "Text to display for the link",
    }),

    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      description: "Open link in a new tab/window",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === "samePage",
    }),

    defineField({
      name: "scrollBehavior",
      title: "Scroll Behavior",
      type: "string",
      options: {
        list: [
          { title: "Smooth", value: "smooth" },
          { title: "Auto", value: "auto" },
          { title: "Instant", value: "instant" },
        ],
      },
      initialValue: "smooth",
      hidden: ({ parent }) => parent?.linkType === "external",
    }),

    defineField({
      name: "scrollOffset",
      title: "Scroll Offset (px)",
      type: "number",
      description:
        "Offset from top when scrolling to component (useful for fixed headers)",
      initialValue: 80,
      hidden: ({ parent }) => parent?.linkType === "external",
    }),
  ],

  preview: {
    select: {
      linkType: "linkType",
      linkText: "linkText",
      targetComponentId: "targetComponentId",
      targetPage: "targetPage.title",
      targetPageComponentId: "targetPageComponentId",
      externalUrl: "externalUrl",
    },
    prepare(selection) {
      const {
        linkType,
        linkText,
        targetComponentId,
        targetPage,
        targetPageComponentId,
        externalUrl,
      } = selection;

      let subtitle = "";
      let title = linkText || "Component Link";

      switch (linkType) {
        case "samePage":
          subtitle = `→ #${targetComponentId}`;
          break;
        case "differentPage":
          subtitle = targetPageComponentId
            ? `→ ${targetPage}#${targetPageComponentId}`
            : `→ ${targetPage}`;
          break;
        case "external":
          subtitle = `→ ${externalUrl}`;
          break;
        default:
          subtitle = "Component Link";
      }

      return {
        title,
        subtitle,
      };
    },
  },
});
