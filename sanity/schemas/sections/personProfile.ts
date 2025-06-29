import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personProfile',
  title: 'Person Profile',
  type: 'object',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'showBio',
      title: 'Show Bio',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showEpisodes',
      title: 'Show Episodes',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'maxEpisodes',
      title: 'Max Episodes to Show',
      type: 'number',
      initialValue: 6,
      validation: Rule => Rule.min(1).max(20),
      hidden: ({ parent }) => !parent?.showEpisodes
    })
  ],
  preview: {
    select: {
      title: 'person.name',
      role: 'person.role'
    },
    prepare({ title, role }) {
      return {
        title: title ? `Profile: ${title}` : 'Person Profile',
        subtitle: role || 'Person profile section'
      }
    }
  }
})
