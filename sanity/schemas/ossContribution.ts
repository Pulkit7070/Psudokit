import { defineField, defineType } from 'sanity'

const LANGUAGES = ['TypeScript', 'Python', 'Rust', 'Go', 'Solidity', 'JavaScript', 'Other']
const CATEGORIES = ['feature', 'bugfix', 'security', 'docs', 'refactor', 'performance']
const STATUSES = [
  { title: 'Merged', value: 'merged' },
  { title: 'Open', value: 'open' },
  { title: 'Closed', value: 'closed' },
]

export const ossContribution = defineType({
  name: 'ossContribution',
  title: 'OSS Contribution',
  type: 'document',
  orderings: [
    {
      title: 'Newest First',
      name: 'mergedAtDesc',
      by: [{ field: 'mergedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'mergedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      repo: 'repo',
      status: 'status',
      category: 'category',
    },
    prepare(value) {
      const { title, repo, status, category } = value as {
        title: string
        repo: string
        status: string
        category: string
      }
      return {
        title,
        subtitle: `${repo} · ${status} · ${category}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'PR Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'repo',
      title: 'Repo (owner/name)',
      type: 'string',
      description: 'e.g. meshery/meshery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repo URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prUrl',
      title: 'PR URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prNumber',
      title: 'PR Number',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description (what the PR did)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'impact',
      title: 'Impact (why it mattered)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mergedAt',
      title: 'Merged / Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: STATUSES, layout: 'radio' },
      initialValue: 'merged',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Primary Language',
      type: 'string',
      options: {
        list: LANGUAGES.map((l) => ({ title: l, value: l })),
        layout: 'radio',
      },
    }),
    defineField({
      name: 'repoStars',
      title: 'Repo Stars (manual)',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedBlog',
      title: 'Related Blog Post',
      description: 'Link to a blog post where you wrote about this PR',
      type: 'reference',
      to: [{ type: 'blog' }],
      options: { disableNew: true },
    }),
  ],
})
