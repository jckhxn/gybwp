import { notFound } from "next/navigation";
import { loadPage } from "@/data/sanity";
import { Page } from "@/components/Page";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path ? `/${path.join("/")}` : "/";

  try {
    const page = await loadPage(pathname);

    if (!page) {
      notFound();
    }

    return <Page data={page} />;
  } catch (error) {
    console.error("Error loading page:", error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path ? `/${path.join("/")}` : "/";

  try {
    const page = await loadPage(pathname);

    if (!page) {
      return {
        title: "Page Not Found",
      };
    }

    return {
      title: page.title || "Growing Your Business With People",
      description: "Growing Your Business With People - Podcast and Consulting",
    };
  } catch (error) {
    return {
      title: "Growing Your Business With People",
    };
  }
}
