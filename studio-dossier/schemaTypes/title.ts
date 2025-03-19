import {defineField, defineType} from 'sanity'

export const titleType = defineType({
  name: 'title',
  title: 'Title',
  type: 'document',
  fields: [
    defineField({
      name: 'resume_title',
      title: 'Resume Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resume_title_span',
      title: 'Resume Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services_title',
      title: 'Services Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services_title_span',
      title: 'Services Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skill_title',
      title: 'Skill Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skill_title_span',
      title: 'Skill Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portfolio_title',
      title: 'Portfolio Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portfolio_title_span',
      title: 'Portfolio Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonial_title',
      title: 'Testimonial Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonial_title_span',
      title: 'Testimonial Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricing_title',
      title: 'Pricing Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricing_title_span',
      title: 'Pricing Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contact_title',
      title: 'Contact Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contact_title_span',
      title: 'Contact Title Span',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
