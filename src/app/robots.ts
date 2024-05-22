import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/dash/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/dash"],
      },
    ],
    sitemap: "https://gybwp.com/sitemap.xml",
  };
}
