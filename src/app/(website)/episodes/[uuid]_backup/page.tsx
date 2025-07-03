// @ts-nocheck
import { redirect } from "next/navigation";
import { SanityDocument } from "next-sanity";
import { loadEpisode } from "@/data/sanity";

// Import redirect map for legacy UUID support
import redirectMap from "@/uuid-to-pathname-redirects.json";

type PageProps = {
  params: Promise<{ uuid: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UUIDRedirectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;

  // First check static redirect map
  if (redirectMap[uuid]) {
    redirect(redirectMap[uuid]);
  }

  // If not in static map, try to find episode by UUID and redirect to pathname
  try {
    const epID = uuid.split("-")[0];
    const initial = await loadEpisode(uuid);

    if (initial?.pathname?.current) {
      redirect(initial.pathname.current);
    }
  } catch (error) {
    console.error("Error finding episode for UUID redirect:", error);
  }

  // If no pathname found, redirect to episodes listing
  redirect("/episode");
}
