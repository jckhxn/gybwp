import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://gybwp.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dash*", // Sanity Studio
          "/api/*", // API routes
          "/_next/*", // Next.js internal
          "/studio*", // Alternative studio path
        ],
      },
      // Special rules for search engine bots
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dash*", "/api/*", "/studio*"],
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        allow: "/",
        disallow: ["/dash*", "/api/*", "/studio*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
