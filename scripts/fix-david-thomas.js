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

async function fixPublishedDocument(documentId) {
  try {
    console.log(`Fixing published document: ${documentId}`);

    const doc = await client.getDocument(documentId);

    if (!doc) {
      console.error(`Document not found: ${documentId}`);
      process.exit(1);
    }

    console.log("Found document:", doc.name || doc._id);

    // Create the fixed version
    const fixedDoc = {
      ...doc,
      // Add pathname if missing (should be a string path)
      pathname: doc.pathname?.current || `/person/${doc.slug?.current || ""}`,
    };

    // Remove problematic fields
    delete fixedDoc._system;

    console.log(`Updating document with pathname: ${fixedDoc.pathname}`);

    // Update the document
    const result = await client.createOrReplace(fixedDoc);

    console.log("✅ Document fixed successfully!");
    console.log("Updated document ID:", result._id);

    return result;
  } catch (error) {
    console.error("❌ Error fixing document:", error.message);
    process.exit(1);
  }
}

// Run with the published document ID
fixPublishedDocument("person.e6af12d8-d3c3-4a74-afc0-b9aff3570a63");
