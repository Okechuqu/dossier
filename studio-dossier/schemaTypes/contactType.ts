import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (role) => role.required(),
    }),
  ],
})
