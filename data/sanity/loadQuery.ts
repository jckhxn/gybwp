import 'server-only'

import type { QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'

import { client } from './client'
import config from '@/config'

const token = config.sanity.token

if (!token) {
  throw new Error(
    'The `SANITY_API_TOKEN` environment variable is required.',
  )
}

export async function loadQuery<QueryResponse>({
  query,
  params = {},
  revalidate = 60, // default to 60 seconds
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  const isDraftMode = (await draftMode()).isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_TOKEN` environment variable is required.',
    )
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published'
  const queryClient = client.withConfig({
    token: isDraftMode ? token : undefined,
    perspective,
    useCdn: !isDraftMode,
    stega: isDraftMode,
  })

  return queryClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : revalidate,
      tags,
    },
  })
}
