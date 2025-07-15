import React from "react";
import { Page } from "@/src/components/Page";
import { loadPage } from "@/data/sanity";
import { notFound } from "next/navigation";

export default async function IndexRoute() {
  const data = await loadPage("/");
  if (!data) {
    // If there's no homepage build, return error with message
    // Sanity not found route, otherwise nextjs route.
    const notFound = await loadPage("not-found");
    if (!notFound) return notFound();
  }

  return <Page data={data} />;
}
