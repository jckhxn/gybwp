const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
    // Not exposed to the front-end, used solely by the server
    token: process.env.SANITY_API_TOKEN || "",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21",
    revalidateSecret: process.env.SANITY_REVALIDATE_SECRET || "",
    studioUrl: "/dash",
  },
  youtube: {
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "",
    channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "",
  },
  siteName: "Growing Your Business With People",
  siteDomain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
};

export default config;
