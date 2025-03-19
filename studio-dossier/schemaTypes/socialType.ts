import {defineType} from 'sanity'

interface SocialField {
  name: string
  title: string
  type: string
  validation: (rule: any) => any
}

export const socials = defineType({
  name: 'socials',
  title: 'Socials Links',
  type: 'document',
  fields: [
    {
      name: 'X',
      title: 'Social Media Icon',
      type: 'string',
      validation: (rule: any) => rule.required(),
    } as SocialField,
  ],
})
