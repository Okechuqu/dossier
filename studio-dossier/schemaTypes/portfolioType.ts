import {defineField, defineType} from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'portfolio_image',
      title: 'Portfolio Image',
      type: 'array',
      of: [{type: 'portfolio_image'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portfolio_stack',
      title: 'Portfolio Stack',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portfolio_link',
      title: 'Portfolio Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portfolio_description',
      title: 'Portfolio Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'portfolio_title',
      title: 'Portfolio Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const portfolioImage = defineType({
  name: 'portfolio_image',
  type: 'image',
})
