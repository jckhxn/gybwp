import type { UnfilteredResponseQueryOptions } from "@sanity/client";
import type { QueryParams } from "next-sanity";

import { draftMode } from "next/headers";
import "server-only";

import config from "@/config";
import { client } from "@/data/sanity/client";

const DEFAULT_PARAMS = {} as QueryParams;

export async function loadQuery<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  revalidate,
  useCdn: useCdnOverride,
}: {
  query: string;
  params?: QueryParams;
  /** Override ISR revalidation. Pass 0 to always fetch fresh (no cache). */
  revalidate?: number | false;
  /** Override CDN usage. Pass false to always hit the Sanity API directly. */
  useCdn?: boolean;
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;
  const token = config.sanity.token;

  if (isDraftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.",
    );
  }

  const perspective = isDraftMode ? "drafts" : "published";

  const options = {
    filterResponse: false,
    useCdn: useCdnOverride ?? !isDraftMode,
    resultSourceMap: isDraftMode ? "withKeyArraySelector" : false,
    token: isDraftMode ? token : undefined,
    perspective,
    next: {
      tags: ["sanity"],
      revalidate: isDraftMode ? 0 : revalidate,
    },
  } satisfies UnfilteredResponseQueryOptions;
  const result = await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as UnfilteredResponseQueryOptions);
  return result.result;
}
