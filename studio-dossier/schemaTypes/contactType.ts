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
      name: 'budgetRange',
      type: 'string',
      title: 'Budget range',
      options: {
        list: [
          {title: 'Under $1,000', value: 'under-1000'},
          {title: '$1,000–$5,000', value: '1000-5000'},
          {title: '$5,000–$10,000', value: '5000-10000'},
          {title: 'Over $10,000', value: 'over-10000'},
        ],
      },
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
      validation: (rule) => rule.required(),
    },
  ],
})
