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
    // defineField({
    //   name: 'slug',
    //   type: 'slug',
    //   options: {source: 'title'},
    //   validation: (rule) => rule.required(),
    // }),
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
      name: 'linkedin',
      type: 'url',
      title: 'Linkedin URL',
      validation: (rule) => rule.required().uri({ allowRelative: false }),
    }),
    defineField({
      name: 'github',
      type: 'url',
      title: 'Github URL',
      validation: (rule) => rule.required().uri({ allowRelative: false }),
    }),
    defineField({
      name: 'x',
      type: 'url',
      title: 'X URL',
      validation: (rule) => rule.required().uri({ allowRelative: false }),
    }),
    defineField({
      name: 'instagram',
      type: 'url',
      title: 'Instagram URL',
      validation: (rule) => rule.required().uri({ allowRelative: false }),
    }),
  ],
})