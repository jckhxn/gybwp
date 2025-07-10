import { createClient } from "@sanity/client";
import { config } from "dotenv";

// Load environment variables
config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Must have write permissions
  useCdn: false,
  apiVersion: "2023-05-03",
});

async function recreateDavidThomas() {
  try {
    console.log("Recreating David Thomas document...");

    // First, delete the problematic document
    console.log("Deleting old document...");
    await client
      .delete("person.e6af12d8-d3c3-4a74-afc0-b9aff3570a63")
      .catch(() => {
        console.log("Old document not found or already deleted");
      });

    // Create a clean new document with proper structure
    const newDoc = {
      _type: "person",
      name: "David Thomas",
      slug: {
        _type: "slug",
        current: "david-thomas",
      },
      pathname: "/person/david-thomas",
      role: "guest",
      guestProfile: {
        title: "CEO of Your AI Coach",
        bio: "David Thomas, founder and CEO of Your AI Coach. David is an AI visionary with three groundbreaking patents and a rich history, including his time at Bell Labs, where he developed life-saving technology like the Adventure Safely app. Today, he helps businesses use AI responsibly and effectively.",
        profileImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-ad3867b7e8cae965ef17180af93c24cdba726c04-400x400-jpg",
          },
        },
        socialLinks: {},
      },
    };

    console.log("Creating new clean document...");
    const result = await client.create(newDoc);

    console.log("✅ David Thomas document recreated successfully!");
    console.log("New document ID:", result._id);
    console.log("Slug:", result.slug.current);
    console.log("Pathname:", result.pathname);

    return result;
  } catch (error) {
    console.error("❌ Error recreating document:", error.message);
    process.exit(1);
  }
}

recreateDavidThomas();
