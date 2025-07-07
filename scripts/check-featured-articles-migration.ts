#!/usr/bin/env node
import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token,
  apiVersion: "2023-01-01",
});

async function checkFeaturedArticlesMigration() {
  try {
    console.log("🔍 Checking featured articles migration status...\n");

    // Check if there are any remaining featuredArticle documents
    const remainingFeaturedArticles = await client.fetch(
      `*[_type == "featuredArticle"]`
    );

    console.log(
      `📄 Remaining featuredArticle documents: ${remainingFeaturedArticles.length}`
    );

    if (remainingFeaturedArticles.length > 0) {
      console.log("⚠️  Found remaining featuredArticle documents:");
      remainingFeaturedArticles.forEach((doc: any, idx: number) => {
        console.log(`   ${idx + 1}. ${doc.title} (${doc._id})`);
      });
    }

    // Check how many articles have featured = true
    const featuredArticles = await client.fetch(
      `*[_type == "article" && featured == true]`
    );

    console.log(`⭐ Articles marked as featured: ${featuredArticles.length}`);

    if (featuredArticles.length > 0) {
      console.log("✅ Featured articles:");
      featuredArticles.forEach((article: any, idx: number) => {
        console.log(
          `   ${idx + 1}. ${article.title} (${article.company || article.publication})`
        );
      });
    }

    // Check total articles
    const totalArticles = await client.fetch(`*[_type == "article"]`);
    console.log(`📊 Total articles: ${totalArticles.length}`);

    console.log("\n🎯 Migration Summary:");
    console.log(
      `   - Legacy featuredArticle documents: ${remainingFeaturedArticles.length}`
    );
    console.log(`   - Articles with featured flag: ${featuredArticles.length}`);
    console.log(`   - Total articles: ${totalArticles.length}`);

    if (remainingFeaturedArticles.length === 0 && featuredArticles.length > 0) {
      console.log(
        "\n✅ Migration appears successful! All featuredArticle documents have been migrated to the featured flag on articles."
      );
    } else if (remainingFeaturedArticles.length > 0) {
      console.log(
        "\n⚠️  Migration incomplete. There are still featuredArticle documents that need to be migrated."
      );
    } else {
      console.log(
        "\n⚠️  No featured articles found. This might indicate the migration hasn't been run yet."
      );
    }
  } catch (error) {
    console.error("❌ Error checking migration:", error);
  }
}

checkFeaturedArticlesMigration().catch(console.error);
