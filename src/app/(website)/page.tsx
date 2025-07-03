import React from "react";
import { Page } from "@/src/components/Page";
import { loadPage } from "@/data/sanity";

export default async function IndexRoute() {
  const data = await loadPage("/");
  if (!data) {
    // Not found sanity page?
  }

  return <Page data={data} />;
}
