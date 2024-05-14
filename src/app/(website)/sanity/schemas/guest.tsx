import { Rule } from "@sanity/types";
const guest = {
  name: "guest",
  title: "Guests",
  type: "document",
  // Display name for guest, not title.
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare(selection: { title: any; media: any }) {
      const { title, media } = selection;
      return {
        title: title,
        media,
      };
    },
  },
  fields: [
    {
      name: "image",
      title: "Profile Picture",
      type: "image",
      description: "Upload the guest's profile picture",
    },
    {
      name: "name",
      title: "Guest Name",
      type: "string",
      description: "Guest's name (e.g., Dr. Jane Doe)",
    },
    {
      name: "title",
      title: "Guest Title",
      type: "string",
      description: "(e.g Caretaker at Healthcare Company)",
    },
    {
      name: "links",
      title: "Links",
      type: "object",
      description: "Links for Guest",
      fields: [
        {
          name: "website",
          title: "Website",
          type: "url",
          description: "URL to the guest's website (optional)",
        },
        {
          name: "social",
          title: "Social Media",
          type: "object",
          description: "An object containing social media links (optional)",
          fields: [
            {
              name: "twitter",
              title: "Twitter",
              type: "url",
              description: "URL to the guest's Twitter profile (optional)",
            },
            // Add more social media fields as needed (e.g., facebook, instagram)
          ],
        },
      ],
    },
    {
      name: "about",
      title: "About",
      type: "text",
      description: "A short bio or description of the guest",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Unique identifier for the guest page URL (e.g., /guest/jane-doe)",

      options: {
        source: "name", // Use the guest's title directly
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
        validation: (Rule: Rule) => Rule.required(),
      },
    },
  ],
};
export default guest;
