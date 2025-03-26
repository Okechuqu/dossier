import {defineField, defineType} from 'sanity'

export const socials = defineType({
  name: 'socials',
  title: 'Socials Links',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      type: 'string',
      title: 'Social header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'Linkedin URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'github',
      type: 'url',
      title: 'Github URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'x',
      type: 'url',
      title: 'X URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'instagram',
      type: 'url',
      title: 'Instagram URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'facebook',
      type: 'url',
      title: 'Facebook URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'tiktok',
      type: 'url',
      title: 'Tiktok URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'upwork',
      type: 'url',
      title: 'Upwork URL',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
  ],
})
