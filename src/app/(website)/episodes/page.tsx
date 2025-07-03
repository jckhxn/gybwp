import React from "react";

import type { Metadata } from "next";
import { EpisodesPage } from "@/src/components/pages/EpisodesPage/episodes-page";

export const metadata: Metadata = {
  title: "All Episodes - Growing Your Business With People",
  description:
    "Explore our complete library of business insights, leadership strategies, and growth tactics. Browse episodes by season, search for specific topics, and discover expert interviews that will help you grow your business through people-first leadership.",
  openGraph: {
    title: "All Episodes - Growing Your Business With People",
    description:
      "Explore our complete library of business insights, leadership strategies, and growth tactics. Browse episodes by season and discover expert interviews.",
    type: "website",
    url: "https://gybwp.com/episode",
    images: [
      {
        url: "https://gybwp.com/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "Growing Your Business With People Podcast - All Episodes",
      },
    ],
    siteName: "Growing Your Business With People",
  },
  twitter: {
    card: "summary_large_image",
    site: "@gybwp",
    title: "All Episodes - Growing Your Business With People",
    description:
      "Explore our complete library of business insights, leadership strategies, and growth tactics.",
    images: ["https://gybwp.com/images/logo.webp"],
  },
  alternates: {
    canonical: "https://gybwp.com/episode",
  },
  keywords: [
    "business podcast episodes",
    "leadership podcast",
    "entrepreneurship episodes",
    "business growth strategies",
    "people management",
    "CEO insights",
    "team building",
    "business development",
  ],
};

const Page = async () => {
  return <EpisodesPage />;
};

export default Page;
