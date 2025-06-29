import { defineField } from 'sanity'

export default defineField({
  name: 'section.latestEpisode',
  title: 'Latest Episode',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Latest Episode',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
    }),
    defineField({
      name: 'showAutomatic',
      type: 'boolean',
      title: 'Show Latest Episode Automatically',
      description: 'If enabled, shows the most recent episode. If disabled, choose a specific episode.',
      initialValue: true,
    }),
    defineField({
      name: 'specificEpisode',
      type: 'reference',
      title: 'Specific Episode',
      to: [{ type: 'episode' }],
      hidden: ({ parent }) => parent?.showAutomatic,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      showAutomatic: 'showAutomatic',
    },
    prepare(selection) {
      const { title, showAutomatic } = selection
      return {
        title: 'Latest Episode',
        subtitle: showAutomatic ? 'Automatic' : 'Manual selection',
      }
    },
  },
})
