import {defineField, defineType} from 'sanity'

export const resumeType = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'timeline_title',
      title: 'Timeline Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resumeData'}]}],
    }),
  ],
})

export const resumeData = defineType({
  name: 'resumeData',
  title: 'Resume Data',
  type: 'document',
  fields: [
    defineField({
      name: 'timeline_role',
      title: 'Timeline Role',
      type: 'string',
    }),
    defineField({
      name: 'timeline_organization',
      title: 'Timeline Organization',
      type: 'string',
    }),
    defineField({
      name: 'timeline_content',
      title: 'Timeline Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'timeline_image',
      title: 'Timeline Images',
      type: 'array',
      of: [{type: 'resume_image'}],
    }),
  ],
})

export const resumeImage = defineType({
  name: 'resume_image',
  title: 'Resume Image',
  type: 'image',
})
