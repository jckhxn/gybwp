// @ts-nocheck
import * as queryStore from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client, draftClient } from "@/src/app/(website)/sanity/sanity-utils";
import { token } from "@/src/app/(website)/lib/token";

// Set up the query store with both clients
queryStore.setServerClient(client.withConfig({ token }));

// Custom loadQuery that respects draft mode
export async function loadQuery<T>(
  query: string,
  params: any = {},
  options: any = {}
): Promise<{ data: T }> {
  const isDraft = (await draftMode()).isEnabled;
  const clientToUse = isDraft ? draftClient : client.withConfig({ token });

  // Use the appropriate client based on draft mode
  const tempStore = { ...queryStore };
  tempStore.setServerClient(clientToUse);

  return tempStore.loadQuery(query, params, {
    ...options,
    perspective: isDraft ? "previewDrafts" : "published",
  });
}
