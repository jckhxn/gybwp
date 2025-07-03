import { draftMode } from "next/headers";
import { client, draftClient } from "./sanity-utils";

// Server-only function to get the appropriate client based on draft mode
export async function getClient() {
  const isDraft = (await draftMode()).isEnabled;
  return isDraft ? draftClient : client;
}
