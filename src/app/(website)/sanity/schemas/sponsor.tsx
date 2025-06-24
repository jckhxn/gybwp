const sponsor = {
  name: "sponsor",
  title: "Sponsors",
  type: "document",
  preview: {
    select: {
      title: "name",
      media: "logo",
      subtitle: "tier",
    },
    prepare({ title, media, subtitle }: any) {
      return {
        title,
        media,
        subtitle: subtitle ? `${subtitle} tier` : undefined,
      };
    },
  },
  fields: [
    {
      // Name of the Sponsor
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      // Slug for the Sponsor
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      // UUID of the Sponsor (keeping for backward compatibility)
      name: "uuid",
      title: "UUID (lowercase)",
      type: "string",
    },
    {
      // Sponsor Logo Image Upload
      name: "logo",
      title: "Sponsor Logo",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      // Legacy Image URL field (keeping for backward compatibility)
      name: "image",
      title: "Legacy Image URL",
      type: "url",
      description: "Deprecated: Use Logo field instead",
    },
    {
      name: "bgColor",
      title: "Background Color for Image",
      type: "string",
    },
    {
      name: "tier",
      title: "Sponsorship Tier",
      type: "string",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Bronze", value: "bronze" },
        ],
      },
    },
    {
      name: "website",
      title: "Website URL",
      type: "url",
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    },
    {
      name: "isActive",
      title: "Active Sponsor",
      type: "boolean",
      initialValue: true,
    },
    {
      // Description of the Sponsor
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      // Audio/Podcast Links of the Episode
      name: "social",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name of Link",
            },
            { name: "link", type: "string", title: "Link" },
          ],
        },
      ],
    },
  ],
};
export default sponsor;
