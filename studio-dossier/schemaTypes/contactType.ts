import {defineType} from 'sanity'

export const contactType = defineType({
  name: 'contactMe',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (rule) => rule.required().email().error('Please enter a valid email address'),
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone',
    },
    {
      name: 'subject',
      type: 'string',
      title: 'Subject',
      options: {
        list: [
          {title: 'Tutoring', value: 'tutoring'},
          {title: 'Web Development', value: 'web_development'},
          {title: 'AI/ML', value: 'ai/ml'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'budget',
      type: 'number',
      title: 'Budget',
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
      validation: (rule) => rule.required(),
    },
  ],
})
