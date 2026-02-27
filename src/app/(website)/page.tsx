import React from "react";
import { Page } from "@/src/components/Page";
import { loadPage } from "@/data/sanity";
import { notFound } from "next/navigation";

export default async function IndexRoute() {
  // Return 503 for temp shutdown.
  return new Response("Site undergoing maintenance", { status: 503 });

  // const data = await loadPage("/");
  // if (!data) {
  //   // If there's no homepage build, return error with message
  //   // Sanity not found route, otherwise nextjs route.
  //   const notFoundPage = await loadPage("not-found");
  //   if (!notFoundPage) return notFound();
  // }
  // return <Page data={data} />;
}
