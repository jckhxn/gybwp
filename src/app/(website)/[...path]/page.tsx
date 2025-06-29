import { notFound } from 'next/navigation'
import { loadQuery } from '@/data/sanity'
import { pageByPathQuery } from '@/data/sanity/queries'
import { Page } from '@/components/Page'
import { PagePayload } from '@/types'

export default async function DynamicPage({
  params,
}: {
  params: { path: string[] }
}) {
  const pathname = params.path ? `/${params.path.join('/')}` : '/'
  
  try {
    const page = await loadQuery<PagePayload>({
      query: pageByPathQuery,
      params: { pathname },
    })

    if (!page) {
      notFound()
    }

    return <Page page={page} />
  } catch (error) {
    console.error('Error loading page:', error)
    notFound()
  }
}

export async function generateMetadata({
  params,
}: {
  params: { path: string[] }
}) {
  const pathname = params.path ? `/${params.path.join('/')}` : '/'
  
  try {
    const page = await loadQuery<PagePayload>({
      query: pageByPathQuery,
      params: { pathname },
    })

    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: page.title || 'Growing Your Business With People',
      description: 'Growing Your Business With People - Podcast and Consulting',
    }
  } catch (error) {
    return {
      title: 'Growing Your Business With People',
    }
  }
}
