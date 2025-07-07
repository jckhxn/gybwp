import { createClient } from "next-sanity";
import dotenv from "dotenv";
dotenv.config();

// Use SANITY_API_TOKEN if present, otherwise fallback to SANITY_WRITE_TOKEN
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token,
  apiVersion: "2023-01-01",
});

async function migrateFeaturedArticles() {
  // 1. Fetch all featuredArticle documents
  const featuredArticles = await client.fetch(`*[_type == "featuredArticle"]`);
  let migrated = 0;
  let unmatched = [];

  for (const fa of featuredArticles) {
    // 2. Try to find a matching article by title and/or link
    const match = await client.fetch(
      `*[_type == "article" && title == $title && link == $link][0]`,
      { title: fa.title, link: fa.link }
    );

    if (match && match._id) {
      // 3. Patch the article: set featured = true, and migrate extra fields if missing
      const patch: { [key: string]: any } = {
        featured: true,
      };
      if (!match.excerpt && fa.excerpt) patch.excerpt = fa.excerpt;
      if (!match.description && fa.description)
        patch.description = fa.description;
      if (!match.publication && fa.publication)
        patch.publication = fa.publication;
      if (!match.date && fa.date) patch.date = fa.date;
      // Always patch the image from featuredArticle, even if article already has one
      if (fa.image) patch.image = fa.image;

      await client.patch(match._id).set(patch).commit();
      migrated++;
    } else {
      unmatched.push(fa);
    }
  }

  console.log(`Migrated ${migrated} featured articles.`);
  if (unmatched.length > 0) {
    console.warn(
      "Unmatched featured articles:",
      unmatched.map((fa) => ({ title: fa.title, link: fa.link }))
    );
  }
}

migrateFeaturedArticles().catch(console.error);
