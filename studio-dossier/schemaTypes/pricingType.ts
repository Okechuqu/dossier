import {defineField, defineType} from 'sanity'

export const pricingType = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    // Define your schema fields here
    defineField({
      name: 'price_header',
      title: 'Price Header',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price_info',
      title: 'Price Info',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price_per_hour',
      title: 'Price per hour',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price_features',
      title: 'Price features',
      type: 'array',
      of: [{type: 'features'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price_link',
      title: 'Price Link',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const features = defineType({
  name: 'features',
  title: 'Price Features',
  type: 'string',
})
