import { client } from "../data/sanity/client";

async function ensureHomepageExists() {
  try {
    console.log("Checking for homepage document...");

    // Check if there's already a page with pathname "/"
    const existingHomepage = await client.fetch(`
      *[_type == "page" && pathname.current == "/"][0] {
        _id,
        title,
        "pathname": pathname.current,
        sectionsBody[] { _type }
      }
    `);

    if (existingHomepage) {
      console.log("✅ Homepage document exists:", existingHomepage);
      console.log(`   ID: ${existingHomepage._id}`);
      console.log(`   Title: ${existingHomepage.title}`);
      console.log(`   Sections: ${existingHomepage.sectionsBody?.length || 0}`);

      if (existingHomepage.sectionsBody?.length > 0) {
        console.log(
          "   Section types:",
          existingHomepage.sectionsBody.map((s: any) => s._type).join(", ")
        );
      } else {
        console.log("⚠️  Warning: Homepage has no sections!");
      }
    } else {
      console.log("❌ No homepage document found!");
      console.log("\nTo create a homepage document in Sanity Studio:");
      console.log("1. Go to your Sanity Studio");
      console.log("2. Create a new 'Page' document");
      console.log("3. Set the pathname to '/'");
      console.log("4. Add sections to the 'Sections Body' field");
      console.log(
        "5. Include sections like: homeHero, latestEpisodeSection, browseEpisodesSection, etc."
      );
    }

    // Also check for any conflicting documents
    console.log("\nChecking for conflicting documents using '/' pathname...");
    const conflictingDocs = await client.fetch(`
      *[pathname.current == "/" && _type != "page"] {
        _id,
        _type,
        title,
        "pathname": pathname.current
      }
    `);

    if (conflictingDocs.length > 0) {
      console.log("⚠️  Found conflicting documents using '/' pathname:");
      conflictingDocs.forEach((doc: any) => {
        console.log(`   - ${doc._type}: ${doc.title || doc._id} (${doc._id})`);
      });
      console.log("\nThese should be deleted or have their pathname changed.");
    } else {
      console.log("✅ No conflicting documents found.");
    }
  } catch (error) {
    console.error("Error checking homepage:", error);
  }
}

ensureHomepageExists();
