import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function updatePathnamestoEpisodes() {
  console.log("🔍 Finding episodes with /episode/ pathnames...");

  // Find all episodes with pathnames starting with /episode/
  const episodes = await client.fetch(`
    *[_type == "episode" && pathname.current match "/episode/*"] {
      _id,
      episodeName,
      "pathname": pathname.current,
      youtube {
        title,
        uuid
      }
    }
  `);

  console.log(`Found ${episodes.length} episodes with /episode/ pathnames`);

  if (episodes.length === 0) {
    console.log("✅ No episodes found with /episode/ pathnames. All done!");
    return;
  }

  // Update each episode
  for (const episode of episodes) {
    const newPathname = episode.pathname.replace("/episode/", "/episodes/");

    console.log(
      `Updating episode: ${episode.episodeName || episode.youtube?.title}`
    );
    console.log(`  Old pathname: ${episode.pathname}`);
    console.log(`  New pathname: ${newPathname}`);

    try {
      await client
        .patch(episode._id)
        .set({
          pathname: {
            current: newPathname,
          },
        })
        .commit();

      console.log(`  ✅ Updated successfully`);
    } catch (error) {
      console.error(`  ❌ Error updating episode ${episode._id}:`, error);
    }
  }

  console.log("\n🎉 Pathname update completed!");
}

// Run the update
updatePathnamestoEpisodes().catch(console.error);
