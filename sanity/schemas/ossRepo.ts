import { defineField, defineType } from 'sanity'

const LANGUAGES = ['TypeScript', 'Python', 'Rust', 'Go', 'Solidity', 'JavaScript', 'Other']
const STATUSES = [
  { title: 'Merged', value: 'merged' },
  { title: 'Open', value: 'open' },
  { title: 'Closed', value: 'closed' },
]
const CATEGORIES = ['feature', 'bugfix', 'security', 'docs', 'refactor', 'performance']

export const ossRepo = defineType({
  name: 'ossRepo',
  title: 'OSS Repo',
  type: 'document',
  orderings: [
    {
      title: 'Repo Name A–Z',
      name: 'repoAsc',
      by: [{ field: 'repo', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'repo', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { repo: 'repo', prs: 'prs' },
    prepare(value) {
      const { repo, prs } = value as { repo: string; prs: unknown[] }
      return {
        title: repo,
        subtitle: `${prs?.length ?? 0} PR${prs?.length !== 1 ? 's' : ''}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'repo',
      title: 'Repo (owner/name)',
      type: 'string',
      description: 'e.g. jaegertracing/jaeger',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repo URL',
      type: 'url',
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
      name: 'tags',
      title: 'Tags',
      description: 'Shown on the repo card — applies to all PRs in this repo',
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
      name: 'prs',
      title: 'Pull Requests',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'pr',
          title: 'PR',
          preview: {
            select: { title: 'title', status: 'status', prNumber: 'prNumber' },
            prepare(value) {
              const { title, status, prNumber } = value as {
                title: string
                status: string
                prNumber?: number
              }
              return {
                title: prNumber ? `#${prNumber} ${title}` : title,
                subtitle: status?.toUpperCase() ?? 'OPEN',
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
              name: 'status',
              title: 'Status',
              type: 'string',
              options: { list: STATUSES, layout: 'radio' },
              initialValue: 'open',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: CATEGORIES.map((c) => ({ title: c, value: c })),
                layout: 'radio',
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'mergedAt',
              title: 'Merged At',
              type: 'datetime',
            }),
          ],
        },
      ],
    }),
  ],
})
