/**
 * Migration Script: Migrate Guest Documents to Person Documents
 *
 * This script migrates all existing guest documents to the unified person schema
 * with role="guest" and maps guest-specific fields to guestProfile.
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { SanityDocument } from "@sanity/types";

// Load environment variables
config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2023-01-01",
  useCdn: false,
});

interface GuestDocument extends SanityDocument {
  _type: "guest";
  name?: string;
  title?: string;
  image?: any;
  about?: string;
  slug?: {
    current: string;
  };
  links?: {
    website?: string;
    social?: {
      twitter?: string;
    };
  };
}

interface PersonDocument {
  _type: "person";
  name: string;
  slug: {
    current: string;
    _type: "slug";
  };
  pathname: string;
  role: "guest";
  guestProfile: {
    bio?: string;
    company?: string;
    title?: string;
    website?: string;
    profileImage?: any;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

// Store mapping of old guest IDs to new person IDs for reference updates
const guestToPersonMapping: Record<string, string> = {};

async function migrateGuestsToPersons() {
  try {
    console.log("🚀 Starting guest to person migration...");

    // 1. Fetch all guest documents
    const guests = await client.fetch<GuestDocument[]>(`
      *[_type == "guest"] {
        _id,
        _rev,
        _createdAt,
        _updatedAt,
        name,
        title,
        image,
        about,
        slug,
        links
      }
    `);

    console.log(`📋 Found ${guests.length} guest documents to migrate`);

    if (guests.length === 0) {
      console.log("✅ No guest documents found. Migration completed.");
      return guestToPersonMapping;
    }

    // 2. Create person documents for each guest
    const transaction = client.transaction();

    for (const guest of guests) {
      // Generate new person document ID
      const newPersonId = `person-${guest._id.replace("guest-", "")}`;

      // Map guest data to person data structure
      const personDoc: PersonDocument = {
        _type: "person",
        name: guest.name || "Unknown Guest",
        slug: guest.slug
          ? {
              current: guest.slug.current,
              _type: "slug",
            }
          : {
              current:
                guest.name?.toLowerCase().replace(/\s+/g, "-") ||
                "unknown-guest",
              _type: "slug",
            },
        pathname: `/person/${guest.slug?.current || guest.name?.toLowerCase().replace(/\s+/g, "-") || "unknown-guest"}`,
        role: "guest",
        guestProfile: {
          bio: guest.about,
          title: guest.title,
          website: guest.links?.website,
          profileImage: guest.image,
          socialLinks: {
            twitter: guest.links?.social?.twitter,
            website: guest.links?.website,
          },
        },
      };

      // Add to transaction
      transaction.createIfNotExists({
        _id: newPersonId,
        ...personDoc,
      });

      // Store mapping for later reference updates
      guestToPersonMapping[guest._id] = newPersonId;

      console.log(
        `🔄 Mapped guest "${guest.name}" (${guest._id}) -> person (${newPersonId})`
      );
    }

    // 3. Execute the transaction
    console.log("💾 Creating person documents...");
    const result = await transaction.commit();
    console.log(`✅ Successfully created person documents`);

    // 4. Save mapping to a file for reference updates
    const fs = await import("fs");
    const path = await import("path");

    const mappingPath = path.join(
      process.cwd(),
      "migrations",
      "guest-to-person-mapping.json"
    );
    fs.writeFileSync(
      mappingPath,
      JSON.stringify(guestToPersonMapping, null, 2)
    );
    console.log(`📄 Saved mapping to ${mappingPath}`);

    console.log("🎉 Guest to person migration completed successfully!");

    return guestToPersonMapping;
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Validation function to check migration results
async function validateGuestMigration() {
  try {
    console.log("🔍 Validating guest migration...");

    // Check if all guests have corresponding persons
    const guests = await client.fetch<{ _id: string; name: string }[]>(`
      *[_type == "guest"] { _id, name }
    `);

    const guestPersons = await client.fetch<{ _id: string; name: string }[]>(`
      *[_type == "person" && role == "guest"] { _id, name }
    `);

    console.log(`📊 Original guests: ${guests.length}`);
    console.log(`📊 Migrated guest persons: ${guestPersons.length}`);

    if (guests.length === guestPersons.length) {
      console.log("✅ Guest count matches - migration appears successful");
    } else {
      console.log("⚠️  Guest count mismatch - please review migration");
    }

    // Check for missing persons
    const fs = await import("fs");
    const path = await import("path");
    const mappingPath = path.join(
      process.cwd(),
      "migrations",
      "guest-to-person-mapping.json"
    );

    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));

      for (const [guestId, personId] of Object.entries(mapping)) {
        const person = await client.fetch(`*[_id == $personId][0]`, {
          personId,
        });
        if (!person) {
          console.log(
            `❌ Missing person document: ${personId} for guest: ${guestId}`
          );
        }
      }

      console.log("✅ Validation completed");
    }
  } catch (error) {
    console.error("❌ Validation failed:", error);
  }
}

// Function to rollback migration (delete created person documents)
async function rollbackGuestMigration() {
  try {
    console.log("🔄 Rolling back guest migration...");

    const fs = await import("fs");
    const path = await import("path");
    const mappingPath = path.join(
      process.cwd(),
      "migrations",
      "guest-to-person-mapping.json"
    );

    if (!fs.existsSync(mappingPath)) {
      console.log("❌ No mapping file found. Cannot rollback.");
      return;
    }

    const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));
    const personIds = Object.values(mapping);

    // Delete created person documents
    const transaction = client.transaction();
    for (const personId of personIds) {
      transaction.delete(personId as string);
    }

    await transaction.commit();
    console.log(`✅ Rolled back ${personIds.length} person documents`);

    // Remove mapping file
    fs.unlinkSync(mappingPath);
    console.log("🗑️  Removed mapping file");
  } catch (error) {
    console.error("❌ Rollback failed:", error);
  }
}

// Export functions for use in other scripts
export {
  migrateGuestsToPersons,
  validateGuestMigration,
  rollbackGuestMigration,
  guestToPersonMapping,
};

// Run migration if this script is executed directly
if (require.main === module) {
  const action = process.argv[2];

  switch (action) {
    case "migrate":
      migrateGuestsToPersons();
      break;
    case "validate":
      validateGuestMigration();
      break;
    case "rollback":
      rollbackGuestMigration();
      break;
    default:
      console.log(`
Usage: npx tsx migrations/migrate-guests-to-persons.ts [action]

Actions:
  migrate   - Migrate all guest documents to person documents
  validate  - Validate the migration results
  rollback  - Rollback the migration (delete created person documents)

Example:
  npx tsx migrations/migrate-guests-to-persons.ts migrate
      `);
  }
}
