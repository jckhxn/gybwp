export default {
  name: 'aboutListenConnect',
  type: 'object',
  title: 'About Listen & Connect',
  fields: [
    { name: 'heading', type: 'string', title: 'Heading' },
    { name: 'text', type: 'text', title: 'Text' },
    {
      name: 'badges',
      type: 'array',
      title: 'Badges',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'url', title: 'Link' },
            { name: 'icon', type: 'string', title: 'Icon (optional)' },
          ],
        },
      ],
    },
  ],
}; 