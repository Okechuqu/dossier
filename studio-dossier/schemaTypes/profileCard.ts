import {defineField, defineType} from 'sanity'

export const profileCard = defineType({
  name: 'profile',
  title: 'Profile Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skill',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      validation: (rule) => rule.required(),
    }),
    {
      name: 'cv',
      title: 'CV',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (rule) => rule.required().error('Please upload a PDF file'),
    },
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email')
          .error('Enter a valid email address'),
    }),
    defineField({
      name: 'socials',
      type: 'reference',
      title: 'Socials Links',
      to: [{type: 'socials'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta_title',
      type: 'string',
      title: 'Meta Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta_description',
      type: 'text',
      title: 'Meta Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta_favicon',
      type: 'image',
      title: 'Meta Favicon',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta_x_handle',
      type: 'string',
      title: 'X Handle',
    }),
    defineField({
      name: 'meta_site_url',
      type: 'string',
      title: 'Site URL',
    }),
  ],
})
