import "server-only";

import { createClient } from "next-sanity";
import config from "@/config";

export const client = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  useCdn: false,
  stega: {
    enabled: false,
    studioUrl: config.sanity.studioUrl,
  },
});
