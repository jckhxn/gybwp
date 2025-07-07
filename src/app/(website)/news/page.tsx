// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
// components
import Articles from "@/src/components/features/Articles";
import FeaturedNews from "@/src/components/features/FeaturedNews";
import { client } from "@/data/sanity/client";
import { ALL_ARTICLES_WITH_FEATURED_QUERY } from "@/data/sanity/queries";

//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV

const NewsPageComponent = () => {
  const [featuredIds, setFeaturedIds] = useState([]);

  useEffect(() => {
    client.fetch(ALL_ARTICLES_WITH_FEATURED_QUERY).then((articles) => {
      const ids = Array.isArray(articles)
        ? articles.filter((a) => a.featured).map((a) => a._id)
        : [];
      setFeaturedIds(ids);
    });
  }, []);

  return (
    <>
      <FeaturedNews color="secondary" />
      <Articles excludeIds={featuredIds} />
    </>
  );
};

export default NewsPageComponent;
