import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dash/",
      },
    ],
    sitemap: "https://gybwp.com/sitemap.xml",
  };
}
