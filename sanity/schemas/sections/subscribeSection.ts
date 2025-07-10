import { defineField, defineType } from "sanity";

export default defineType({
  name: "subscribeSection",
  title: "Subscribe Section",
  type: "object",
  fields: [
    defineField({
      name: "showSubscribe",
      title: "Show Subscribe Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Subscribe & Listen",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      initialValue: "Never miss an episode",
    }),
    defineField({
      name: "showPodcastPlatforms",
      title: "Show Podcast Platforms",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showNewsletter",
      title: "Show Newsletter Signup",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      showSubscribe: "showSubscribe",
    },
    prepare({ title, showSubscribe }) {
      return {
        title: title || "Subscribe Section",
        subtitle: showSubscribe ? "Shows subscription options" : "Hidden",
      };
    },
  },
});
