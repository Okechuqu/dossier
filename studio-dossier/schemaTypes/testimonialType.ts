import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'testimonial_quote',
      title: 'Testimonial Quote',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonial_author_name',
      title: 'Testimonial Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonial_author_designation',
      title: 'Testimonial Author Designation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonial_author_image',
      title: 'Testimonial Author Image',
      type: 'image',
      description: 'Image should be square and have a size of 48px x 48px',
      validation: (rule) => rule.required(),
    }),
  ],
})
