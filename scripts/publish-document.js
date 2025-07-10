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

async function publishDocument(documentId) {
  if (!documentId) {
    console.error("Please provide a document ID");
    process.exit(1);
  }

  try {
    console.log(`Publishing document: ${documentId}`);

    // The ID is already in the correct format for a draft document
    const draftId = documentId;
    const publishedId = documentId.replace("person-drafts.", "person.");

    console.log(`Looking for draft: ${draftId}`);

    const draftDoc = await client.getDocument(draftId);

    if (!draftDoc) {
      console.error(`Draft document not found: ${draftId}`);
      process.exit(1);
    }

    console.log("Found draft document:", draftDoc.name || draftDoc._id);

    // Create the published version
    const publishedDoc = {
      ...draftDoc,
      _id: publishedId,
      // Add pathname if missing (based on person schema)
      pathname: draftDoc.pathname || `/person/${draftDoc.slug?.current || ""}`,
    };

    // Remove draft-specific fields
    delete publishedDoc._rev;
    delete publishedDoc._system;

    console.log(`Creating published document: ${publishedId}`);

    // Create or replace the published document
    const result = await client.createOrReplace(publishedDoc);

    console.log("✅ Document published successfully!");
    console.log("Published document ID:", result._id);

    return result;
  } catch (error) {
    console.error("❌ Error publishing document:", error.message);
    process.exit(1);
  }
}

// Get document ID from command line arguments
const documentId = process.argv[2];

if (!documentId) {
  console.log("Usage: node scripts/publish-document.js <document-id>");
  console.log(
    "Example: node scripts/publish-document.js person-drafts.e6af12d8-d3c3-4a74-afc0-b9aff3570a63"
  );
  process.exit(1);
}

publishDocument(documentId);
