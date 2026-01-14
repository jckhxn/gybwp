import { MetadataRoute } from "next";
import { loadQuery } from "@/data/sanity/loadQuery";
import { groq } from "next-sanity";

const SITE_URL = "https://gybwp.com";

// Queries for dynamic content
const EPISODES_QUERY = groq`
  *[_type == "episode" && defined(pathname.current)] {
    "url": pathname.current,
    "lastModified": _updatedAt,
    youtube
  }
`;

const PERSONS_QUERY = groq`
  *[_type == "person" && defined(pathname.current)] {
    "url": pathname.current,
    "lastModified": _updatedAt,
    role
  }
`;

const PAGES_QUERY = groq`
  *[_type == "page" && defined(pathname.current)] {
    "url": pathname.current,
    "lastModified": _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Load dynamic content
    const [episodesData, personsData, pagesData] = await Promise.all([
      loadQuery({
        query: EPISODES_QUERY,
      }),
      loadQuery({
        query: PERSONS_QUERY,
      }),
      loadQuery({
        query: PAGES_QUERY,
      }),
    ]);

    // Extract data from loadQuery results
    const episodes = Array.isArray(episodesData) ? episodesData : [];
    const persons = Array.isArray(personsData) ? personsData : [];
    const pages = Array.isArray(pagesData) ? pagesData : [];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Homepage - highest priority
    sitemapEntries.push({
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Static pages with high priority
    const staticPages = [
      { url: "/episodes", priority: 0.9, changeFrequency: "daily" as const },
      { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
      {
        url: "/consulting",
        priority: 0.8,
        changeFrequency: "monthly" as const,
      },
    ];

    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });

    // Episode pages - high priority for recent episodes
    episodes?.forEach((episode: any, index: number) => {
      const isRecent = index < 10; // First 10 episodes are recent

      sitemapEntries.push({
        url: `${SITE_URL}${episode.url}`,
        lastModified: new Date(episode.lastModified),
        changeFrequency: "monthly",
        priority: isRecent ? 0.8 : 0.6,
      });
    });

    // Person pages - priority based on role
    persons?.forEach((person: any) => {
      const isHost = person.role === "host-consultant";

      sitemapEntries.push({
        url: `${SITE_URL}${person.url}`,
        lastModified: new Date(person.lastModified),
        changeFrequency: "monthly",
        priority: isHost ? 0.7 : 0.5,
      });
    });

    // Custom pages from page builder
    pages?.forEach((page: any) => {
      sitemapEntries.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return minimal sitemap on error
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }
}
