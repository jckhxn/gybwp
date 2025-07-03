import { definePathname } from "@tinloof/sanity-studio";
import { defineField, defineType } from "sanity";
import { sections } from "../sections";

export default defineType({
  type: "document",
  name: "person",
  title: "Person",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    definePathname({
      name: "pathname",
      title: "URL Path",
      options: {
        source: (doc: any) => `/person/${doc.slug?.current || ""}`,
      },
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role",
      options: {
        list: [
          { title: "Host & Consultant", value: "host-consultant" },
          { title: "Guest", value: "guest" },
          { title: "Team Member", value: "team" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "isMainHost",
      type: "boolean",
      title: "Is Main Host/Consultant",
      description: "Mark this person as the main host and consultant",
      hidden: ({ document }: any) => document?.role !== "host-consultant",
    }),
    // Consulting-specific fields
    defineField({
      name: "consultingProfile",
      type: "object",
      title: "Consulting Profile",
      hidden: ({ document }: any) => document?.role !== "host-consultant",
      fields: [
        defineField({
          name: "bio",
          type: "text",
          title: "Biography",
        }),
        defineField({
          name: "expertise",
          type: "array",
          title: "Areas of Expertise",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "profileImage",
          type: "image",
          title: "Profile Image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "calendarLink",
          type: "url",
          title: "Calendar Booking Link",
        }),
      ],
    } as any),
    // Guest-specific fields
    defineField({
      name: "guestProfile",
      type: "object",
      title: "Guest Profile",
      hidden: ({ document }: any) => document?.role !== "guest",
      fields: [
        defineField({
          name: "bio",
          type: "text",
          title: "Biography",
        }),
        defineField({
          name: "company",
          type: "string",
          title: "Company",
        }),
        defineField({
          name: "title",
          type: "string",
          title: "Job Title",
        }),
        defineField({
          name: "website",
          type: "url",
          title: "Website",
        }),
        defineField({
          name: "profileImage",
          type: "image",
          title: "Profile Image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "socialLinks",
          type: "object",
          title: "Social Links",
          fields: [
            defineField({ name: "twitter", type: "url", title: "Twitter" }),
            defineField({ name: "linkedin", type: "url", title: "LinkedIn" }),
            defineField({ name: "website", type: "url", title: "Website" }),
          ],
        } as any),
      ],
    } as any),
    // Page sections for dedicated person pages
    defineField({
      name: "sectionsBody",
      title: "Page Sections",
      type: "array",
      of: sections.map((section) => ({
        type: section.name,
      })),
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (type: string) => `/sections/${type}.png`,
            },
          ],
        },
      },
    } as any),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      media: "consultingProfile.profileImage",
      guestMedia: "guestProfile.profileImage",
    },
    prepare(selection) {
      const { title, role, media, guestMedia } = selection;
      return {
        title: title || "Untitled",
        subtitle: role || "Unknown role",
        media: media || guestMedia,
      };
    },
  },
});
