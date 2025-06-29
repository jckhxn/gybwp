import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pathname',
      title: 'Pathname',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => `/episode/${input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)}`
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sectionsBody',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'episodeHero' },
        { type: 'episodePlayer' },
        { type: 'latestEpisode' },
        { type: 'featuredNews' },
        { type: 'newsletter' },
        // Add more episode-specific sections as needed
      ]
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Details',
      type: 'object',
      fields: [
        defineField({
          name: 'videoId',
          title: 'Video ID',
          type: 'string'
        }),
        defineField({
          name: 'publishedAt',
          title: 'Published At',
          type: 'datetime'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image'
        })
      ]
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
          options: {
            filter: 'role == "guest"'
          }
        }
      ]
    }),
    defineField({
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sponsor' }]
        }
      ]
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'episodeTranscriptField'
    }),
    defineField({
      name: 'featured',
      title: 'Featured Episode',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Business', value: 'business' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Technology', value: 'technology' },
          { title: 'HR', value: 'hr' },
          { title: 'Strategy', value: 'strategy' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      pathname: 'pathname.current',
      featured: 'featured'
    },
    prepare({ title, pathname, featured }) {
      return {
        title: title || 'Untitled Episode',
        subtitle: pathname || '/episode/untitled',
        media: featured ? '⭐' : '🎙️'
      }
    }
  }
})
