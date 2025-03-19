import {defineField, defineType} from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'skill_image',
      title: 'Skill Image',
      type: 'image',
      description: 'Image should be square and have a size of 48px x 48px',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skill_rate',
      title: 'Skill Rate',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skill_title',
      title: 'Skill Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
