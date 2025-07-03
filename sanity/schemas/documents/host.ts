import { defineField, defineType } from "sanity";

export default defineType({
  name: "host",
  title: "Podcast Host",
  type: "document",
  description: "Singleton document for the podcast host information",
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
    defineField({
      name: "name",
      title: "Host Name",
      type: "string",
      description: "Full name of the podcast host",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for the host profile page",
      options: {
        source: "name",
        maxLength: 90,
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Host Title/Role",
      type: "string",
      description:
        "Professional title or role (e.g., 'CEO & Founder', 'Business Coach')",
    }),
    defineField({
      name: "image",
      title: "Profile Picture",
      type: "image",
      description: "Professional headshot of the host",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      description: "Brief biography of the host",
      rows: 4,
    } as any),
    defineField({
      name: "company",
      title: "Company/Organization",
      type: "string",
      description: "Host's company or organization",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      description: "Host's social media profiles",
      fields: [
        defineField({
          name: "website",
          title: "Website",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
      ],
    } as any),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "email",
      description: "Professional contact email",
    }),
  ],
});
