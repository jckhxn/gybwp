// @ts-nocheck
import React from "react";
// components
import Articles from "@/src/components/features/Articles";
import FeaturedNews from "@/src/components/features/FeaturedNews";
import { client } from "@/data/sanity/client";
import { FEATURED_ARTICLES_QUERY } from "@/data/sanity/queries";
import { checkMaintenanceMode } from "@/src/app/(website)/lib/maintenance";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

const NewsPageComponent = async () => {
  await checkMaintenanceMode();
  // Fetch featured articles on the server
  const featuredArticles = await client.fetch(FEATURED_ARTICLES_QUERY);
  const featuredIds = Array.isArray(featuredArticles)
    ? featuredArticles.map((a) => a._id)
    : [];

  return (
    <>
      <FeaturedNews color="secondary" />
      <Articles excludeIds={featuredIds} />
    </>
  );
};

export default NewsPageComponent;
