import { notFound } from "next/navigation";
import { loadPage } from "@/data/sanity";
import { Page } from "@/src/components/Page";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
import { isBlockedPath } from "@/src/app/(website)/lib/security";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path ? `/${path.join("/")}` : "/";

  // BLOCK MALICIOUS PATHS IMMEDIATELY
  if (isBlockedPath(pathname)) {
    console.log(`🛡️ Blocked malicious path at page level: ${pathname}`);
    notFound();
    return;
  }

  let page;
  try {
    page = await loadPage(pathname);
  } catch (error) {
    // Re-throw Next.js navigation/HTTP errors (notFound, redirect, etc.)
    if (
      error != null &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    console.error("Error loading page:", error);
    notFound();
    return;
  }

  if (!page) {
    // Sanity not found route, otherwise nextjs route.
    const notFoundPage = await loadPage("not-found");
    if (!notFoundPage) {
      notFound();
      return;
    }
    return <Page data={notFoundPage} />;
  }

  return <Page data={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path ? `/${path.join("/")}` : "/";

  // BLOCK MALICIOUS PATHS - Don't even generate metadata
  if (isBlockedPath(pathname)) {
    return {
      title: "Page Not Found",
    };
  }

  try {
    const page = await loadPage(pathname);

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title:
        "title" in page && page.title
          ? page.title
          : "Growing Your Business With People",
      description: "Growing Your Business With People - Podcast and Consulting",
    };
  } catch (error) {
    return {
      title: "Growing Your Business With People",
    };
  }
}
