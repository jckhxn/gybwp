/**
 * UUID to Slug Migration Script
 *
 * This script migrates episode documents from UUID-based routing to pathname-based routing
 * while maintaining backward compatibility through redirects.
 *
 * Usage: npm run migration:uuid-to-slug
 */

import "dotenv/config";
import { createClient } from "@sanity/client";
import { generateEpisodePathname } from "../sanity/utils/slugify";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21",
  useCdn: false,
});

interface EpisodeDocument {
  _id: string;
  _type: string;
  uuid?: string;
  youtube?: {
    uuid?: string;
    title?: string;
  };
  pathname?: {
    current?: string;
  };
}

async function migrateUuidsToSlugs() {
  console.log("🚀 Starting UUID to Slug migration...");

  try {
    // 1. Fetch all episodes and filter for those needing migration
    const allEpisodes = await client.fetch<EpisodeDocument[]>(`
      *[_type == "episode" && (defined(uuid) || defined(youtube.uuid))] {
        _id,
        _type,
        uuid,
        youtube {
          uuid,
          title
        },
        pathname
      }
    `);

    // Filter episodes that need migration (have UUID-style pathnames or no pathnames)
    const episodes = allEpisodes.filter((episode) => {
      const pathname = episode.pathname?.current;
      return (
        !pathname ||
        pathname === "/episode/" ||
        pathname === "" ||
        /\/episode\/[0-9]+/.test(pathname) ||
        /\/episode\/[0-9]+-[0-9]+/.test(pathname) ||
        /\/episode\/[0-9]+_[0-9]+/.test(pathname)
      );
    });

    console.log(
      `📊 Found ${episodes.length} episodes to migrate from UUID to pathname routing`
    );

    if (episodes.length === 0) {
      console.log(
        "✅ No episodes need migration - all episodes already have pathname routing"
      );
      return;
    }

    console.log("\n📄 Episodes found for migration:");
    episodes.forEach((episode, index) => {
      const title = episode.youtube?.title || "No title";
      const uuid = episode.uuid || episode.youtube?.uuid || "No UUID";
      const currentPathname = episode.pathname?.current || "None";
      console.log(
        `${index + 1}. "${title}" (UUID: ${uuid}, Current pathname: ${currentPathname})`
      );
    });

    // 2. Generate slugs and check for conflicts
    const slugMap = new Map<string, EpisodeDocument[]>();
    const migrationPlan: Array<{
      documentId: string;
      currentUuid: string;
      newPathname: string;
      title: string;
    }> = [];

    for (const episode of episodes) {
      const title = episode.youtube?.title;
      const uuid = episode.uuid || episode.youtube?.uuid;

      if (!title) {
        console.warn(`⚠️  Episode ${episode._id} has no title, skipping`);
        continue;
      }

      if (!uuid) {
        console.warn(`⚠️  Episode ${episode._id} has no UUID, skipping`);
        continue;
      }

      const newPathname = generateEpisodePathname(title);

      // Track potential conflicts
      if (!slugMap.has(newPathname)) {
        slugMap.set(newPathname, []);
      }
      slugMap.get(newPathname)!.push(episode);

      migrationPlan.push({
        documentId: episode._id,
        currentUuid: uuid,
        newPathname,
        title,
      });
    }

    // 3. Handle slug conflicts
    const conflicts = Array.from(slugMap.entries()).filter(
      ([, docs]) => docs.length > 1
    );

    if (conflicts.length > 0) {
      console.log("⚠️  Found slug conflicts:");
      for (const [slug, docs] of conflicts) {
        console.log(`   ${slug}: ${docs.length} documents`);
        docs.forEach((doc, index) => {
          if (index > 0) {
            // Add suffix to conflicting slugs
            const conflictedPlan = migrationPlan.find(
              (p) => p.documentId === doc._id
            );
            if (conflictedPlan) {
              conflictedPlan.newPathname =
                conflictedPlan.newPathname.replace("/episode/", `/episode/`) +
                `-${index + 1}`;
            }
          }
        });
      }
    }

    // 4. Preview migration plan
    console.log("\n📋 Migration Plan:");
    migrationPlan.forEach((plan, index) => {
      console.log(`${index + 1}. ${plan.title}`);
      console.log(
        `   UUID: ${plan.currentUuid} → Pathname: ${plan.newPathname}`
      );
    });

    // 5. Confirm migration
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const shouldProceed = await new Promise<boolean>((resolve) => {
      readline.question(
        "\n❓ Proceed with migration? (y/N): ",
        (answer: string) => {
          readline.close();
          resolve(
            answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
          );
        }
      );
    });

    if (!shouldProceed) {
      console.log("❌ Migration cancelled");
      return;
    }

    // 6. Execute migration
    console.log("\n🔄 Executing migration...");

    let successCount = 0;

    for (const plan of migrationPlan) {
      try {
        await client
          .patch(plan.documentId)
          .set({
            "pathname.current": plan.newPathname,
          })
          .commit();

        successCount++;
        console.log(`✓ Migrated: ${plan.title}`);
      } catch (error) {
        console.error(`✗ Failed to migrate ${plan.title}:`, error);
      }
    }

    console.log(
      `✅ Successfully migrated ${successCount}/${migrationPlan.length} episodes`
    );

    // 7. Generate redirect map for frontend
    const redirectMap = migrationPlan.reduce(
      (map, plan) => {
        map[plan.currentUuid] = plan.newPathname;
        return map;
      },
      {} as Record<string, string>
    );

    console.log("\n📝 Redirect map for frontend:");
    console.log(JSON.stringify(redirectMap, null, 2));

    // 8. Save redirect map to file
    const fs = require("fs");
    fs.writeFileSync(
      "./uuid-to-pathname-redirects.json",
      JSON.stringify(redirectMap, null, 2)
    );

    console.log("💾 Redirect map saved to uuid-to-pathname-redirects.json");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Validation function to check migration success
async function validateMigration() {
  console.log("🔍 Validating migration...");

  // Check for episodes that still need pathname migration
  const episodesNeedingMigration = await client.fetch(`
    count(*[_type == "episode" && (
      defined(uuid) || defined(youtube.uuid)
    ) && (
      !defined(pathname.current) || 
      pathname.current == "/episode/" ||
      pathname.current == null ||
      pathname.current == ""
    )])
  `);

  // Check for episodes with proper pathnames
  const episodesWithPathnames = await client.fetch(`
    count(*[_type == "episode" && defined(pathname.current) && pathname.current != "/episode/" && pathname.current != null && pathname.current != ""])
  `);

  // Get all pathnames to check for duplicates
  const allPathnames = await client.fetch(`
    *[_type == "episode" && defined(pathname.current)] {
      "pathname": pathname.current
    }
  `);

  // Check for duplicates in JavaScript
  const pathnameCount = allPathnames.reduce((acc: any, item: any) => {
    acc[item.pathname] = (acc[item.pathname] || 0) + 1;
    return acc;
  }, {});

  const duplicatePathnames = Object.entries(pathnameCount)
    .filter(([_, count]) => (count as number) > 1)
    .map(([pathname, count]) => ({ pathname, count }));

  console.log(
    `📊 Episodes still needing migration: ${episodesNeedingMigration}`
  );
  console.log(`📊 Episodes with proper pathnames: ${episodesWithPathnames}`);
  console.log(`📊 Duplicate pathnames: ${duplicatePathnames.length}`);

  if (episodesNeedingMigration === 0 && duplicatePathnames.length === 0) {
    console.log("✅ Migration validation passed");
  } else {
    console.log("⚠️  Migration validation found issues");
    if (episodesNeedingMigration > 0) {
      console.log(
        `   - ${episodesNeedingMigration} episodes still need pathname migration`
      );
    }
    if (duplicatePathnames.length > 0) {
      console.log(
        `   - ${duplicatePathnames.length} duplicate pathname conflicts`
      );
    }
  }
}

// Preview function to see all episodes
async function previewEpisodes() {
  console.log("👁️  Previewing all episodes...");

  const allEpisodes = await client.fetch<EpisodeDocument[]>(`
    *[_type == "episode"] | order(_createdAt desc) {
      _id,
      _type,
      uuid,
      youtube {
        uuid,
        title
      },
      pathname,
      _createdAt
    }
  `);

  console.log(`📊 Total episodes found: ${allEpisodes.length}`);

  const withSeoFriendlyPathnames = allEpisodes.filter(
    (ep) =>
      ep.pathname?.current &&
      ep.pathname.current !== "/episode/" &&
      ep.pathname.current !== "" &&
      !ep.pathname.current.match(/\/episode\/[0-9]+/)
  );

  const withUuidPathnames = allEpisodes.filter(
    (ep) =>
      ep.pathname?.current && ep.pathname.current.match(/\/episode\/[0-9]+/)
  );

  const needingMigration = allEpisodes.filter(
    (ep) =>
      (ep.uuid || ep.youtube?.uuid) &&
      (!ep.pathname?.current ||
        ep.pathname.current === "/episode/" ||
        ep.pathname.current === "" ||
        ep.pathname.current.match(/\/episode\/[0-9]+/))
  );

  console.log(
    `✅ Episodes with SEO-friendly pathnames: ${withSeoFriendlyPathnames.length}`
  );
  console.log(
    `🔄 Episodes with UUID-style pathnames: ${withUuidPathnames.length}`
  );
  console.log(`🔄 Episodes needing migration: ${needingMigration.length}`);

  if (needingMigration.length > 0) {
    console.log("\n🔄 Episodes that need migration:");
    needingMigration.forEach((episode, index) => {
      const title = episode.youtube?.title || "No title";
      const uuid = episode.uuid || episode.youtube?.uuid || "No UUID";
      const currentPathname = episode.pathname?.current || "None";
      console.log(
        `${index + 1}. "${title}" (UUID: ${uuid}, Current pathname: ${currentPathname})`
      );
    });
  }

  if (withSeoFriendlyPathnames.length > 0) {
    console.log("\n✅ Episodes with SEO-friendly pathnames:");
    withSeoFriendlyPathnames.slice(0, 10).forEach((episode, index) => {
      const title = episode.youtube?.title || "No title";
      const pathname = episode.pathname?.current;
      console.log(`${index + 1}. "${title}" → ${pathname}`);
    });
    if (withSeoFriendlyPathnames.length > 10) {
      console.log(`   ... and ${withSeoFriendlyPathnames.length - 10} more`);
    }
  }

  if (withUuidPathnames.length > 0) {
    console.log(
      "\n🔄 Episodes with UUID-style pathnames (need SEO-friendly slugs):"
    );
    withUuidPathnames.slice(0, 10).forEach((episode, index) => {
      const title = episode.youtube?.title || "No title";
      const pathname = episode.pathname?.current;
      console.log(`${index + 1}. "${title}" → ${pathname}`);
    });
    if (withUuidPathnames.length > 10) {
      console.log(`   ... and ${withUuidPathnames.length - 10} more`);
    }
  }
}

// Main execution
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case "migrate":
      migrateUuidsToSlugs();
      break;
    case "validate":
      validateMigration();
      break;
    case "preview":
      previewEpisodes();
      break;
    default:
      console.log("Usage:");
      console.log(
        "  npm run migration:uuid-to-slug preview  - Preview all episodes"
      );
      console.log("  npm run migration:uuid-to-slug migrate  - Run migration");
      console.log(
        "  npm run migration:uuid-to-slug validate - Validate migration"
      );
  }
}

export { migrateUuidsToSlugs, validateMigration, previewEpisodes };
