// ./app/api/draft/route.ts

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "@/data/sanity/client";

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
});

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  // Enable draft mode
  (await draftMode()).enable();

  // Redirect to the validated path
  redirect(redirectTo);
}
