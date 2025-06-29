import { Rule } from "@sanity/types";

const host = {
  name: "host",
  title: "Podcast Host",
  type: "document",
  description: "Singleton document for the podcast host information",
  // This ensures only one host document can exist
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "title",
    },
    prepare(selection: { title: any; media: any; subtitle: any }) {
      const { title, media, subtitle } = selection;
      return {
        title: title || "Podcast Host",
        subtitle: subtitle || "Host Information",
        media,
      };
    },
  },
  fields: [
    {
      name: "name",
      title: "Host Name",
      type: "string",
      description: "Full name of the podcast host",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for the host profile page",
      options: {
        source: "name",
        maxLength: 90,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Host Title/Role",
      type: "string",
      description:
        "Professional title or role (e.g., 'CEO & Founder', 'Business Coach')",
    },
    {
      name: "image",
      title: "Profile Picture",
      type: "image",
      description: "Professional headshot of the host",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
      description: "Brief biography of the host",
      rows: 4,
    },
    {
      name: "company",
      title: "Company/Organization",
      type: "string",
      description: "Host's company or organization",
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      description: "Host's social media profiles",
      fields: [
        {
          name: "website",
          title: "Website",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
      ],
    },
    {
      name: "email",
      title: "Contact Email",
      type: "email",
      description: "Professional contact email",
    },
  ],
};

export default host;
