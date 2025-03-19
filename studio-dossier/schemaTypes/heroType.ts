import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Card',
  type: 'document',
  fields: [
    defineField({
      name: 'hero_title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'hero_text',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'hero_reveal_text',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'hero_description',
        type: 'array',
        of: [{type: 'block'}],
    }),
    defineField({
        name: 'hero_years_of_experience',
        type: 'number',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'hero_completed_projects',
        type: 'number',
        validation: (rule) => rule.required(),
    }),
]
})
