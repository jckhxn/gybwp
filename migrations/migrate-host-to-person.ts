/**
 * Migration Script: Migrate Host Documents to Person Documents
 *
 * This script migrates all existing host documents to the unified person schema
 * with role="host-consultant" and maps host-specific fields to consultingProfile.
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

interface HostDocument extends SanityDocument {
  _type: "host";
  name?: string;
  slug?: {
    current: string;
  };
  title?: string;
  image?: any;
  bio?: string;
  company?: string;
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  email?: string;
}

interface PersonDocument {
  _type: "person";
  name: string;
  slug: {
    current: string;
    _type: "slug";
  };
  pathname: string;
  role: "host-consultant";
  isMainHost?: boolean;
  consultingProfile: {
    bio?: string;
    expertise?: string[];
    profileImage?: any;
    calendarLink?: string;
  };
}

// Store mapping of old host IDs to new person IDs for reference updates
const hostToPersonMapping: Record<string, string> = {};

async function migrateHostsToPersons() {
  try {
    console.log("🚀 Starting host to person migration...");

    // 1. Fetch all host documents
    const hosts = await client.fetch<HostDocument[]>(`
      *[_type == "host"] {
        _id,
        _rev,
        _createdAt,
        _updatedAt,
        name,
        slug,
        title,
        image,
        bio,
        company,
        socialLinks,
        email
      }
    `);

    console.log(`📋 Found ${hosts.length} host documents to migrate`);

    if (hosts.length === 0) {
      console.log("✅ No host documents found. Migration completed.");
      return hostToPersonMapping;
    }

    // 2. Create person documents for each host
    const transaction = client.transaction();

    for (let i = 0; i < hosts.length; i++) {
      const host = hosts[i];
      // Generate new person document ID
      const newPersonId = `person-${host._id.replace("host-", "")}`;

      // Create expertise array from title and company
      const expertise: string[] = [];
      if (host.title) expertise.push(host.title);
      if (host.company) expertise.push(`${host.company} Experience`);

      // Create enhanced bio that includes company info
      let enhancedBio = host.bio || "";
      if (host.company && !enhancedBio.includes(host.company)) {
        enhancedBio = enhancedBio
          ? `${enhancedBio}\n\nCurrently with ${host.company}.`
          : `Professional with ${host.company}.`;
      }

      // Map host data to person data structure
      const personDoc: PersonDocument = {
        _type: "person",
        name: host.name || "Unknown Host",
        slug: host.slug
          ? {
              current: host.slug.current,
              _type: "slug",
            }
          : {
              current:
                host.name?.toLowerCase().replace(/\s+/g, "-") || "unknown-host",
              _type: "slug",
            },
        pathname: `/person/${host.slug?.current || host.name?.toLowerCase().replace(/\s+/g, "-") || "unknown-host"}`,
        role: "host-consultant",
        isMainHost: i === 0, // Mark the first host as the main host
        consultingProfile: {
          bio: enhancedBio,
          expertise:
            expertise.length > 0
              ? expertise
              : ["Business Consulting", "Podcast Host"],
          profileImage: host.image,
          calendarLink: host.socialLinks?.website || undefined,
        },
      };

      // Add to transaction
      transaction.createIfNotExists({
        _id: newPersonId,
        ...personDoc,
      });

      // Store mapping for later reference updates
      hostToPersonMapping[host._id] = newPersonId;

      console.log(
        `🔄 Mapped host "${host.name}" (${host._id}) -> person (${newPersonId})${i === 0 ? " [MAIN HOST]" : ""}`
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
      "host-to-person-mapping.json"
    );
    fs.writeFileSync(mappingPath, JSON.stringify(hostToPersonMapping, null, 2));
    console.log(`📄 Saved mapping to ${mappingPath}`);

    console.log("🎉 Host to person migration completed successfully!");

    return hostToPersonMapping;
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Validation function to check migration results
async function validateHostMigration() {
  try {
    console.log("🔍 Validating host migration...");

    // Check if all hosts have corresponding persons
    const hosts = await client.fetch<{ _id: string; name: string }[]>(`
      *[_type == "host"] { _id, name }
    `);

    const hostPersons = await client.fetch<
      { _id: string; name: string; isMainHost: boolean }[]
    >(`
      *[_type == "person" && role == "host-consultant"] { _id, name, isMainHost }
    `);

    console.log(`📊 Original hosts: ${hosts.length}`);
    console.log(`📊 Migrated host persons: ${hostPersons.length}`);

    if (hosts.length === hostPersons.length) {
      console.log("✅ Host count matches - migration appears successful");
    } else {
      console.log("⚠️  Host count mismatch - please review migration");
    }

    // Check for main host
    const mainHosts = hostPersons.filter((p) => p.isMainHost);
    console.log(`📊 Main hosts: ${mainHosts.length}`);

    if (mainHosts.length === 1) {
      console.log(`✅ Exactly one main host found: ${mainHosts[0].name}`);
    } else if (mainHosts.length === 0) {
      console.log("⚠️  No main host found");
    } else {
      console.log("⚠️  Multiple main hosts found");
    }

    // Check for missing persons
    const fs = await import("fs");
    const path = await import("path");
    const mappingPath = path.join(
      process.cwd(),
      "migrations",
      "host-to-person-mapping.json"
    );

    if (fs.existsSync(mappingPath)) {
      const mapping = JSON.parse(fs.readFileSync(mappingPath, "utf8"));

      for (const [hostId, personId] of Object.entries(mapping)) {
        const person = await client.fetch(`*[_id == $personId][0]`, {
          personId,
        });
        if (!person) {
          console.log(
            `❌ Missing person document: ${personId} for host: ${hostId}`
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
async function rollbackHostMigration() {
  try {
    console.log("🔄 Rolling back host migration...");

    const fs = await import("fs");
    const path = await import("path");
    const mappingPath = path.join(
      process.cwd(),
      "migrations",
      "host-to-person-mapping.json"
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
  migrateHostsToPersons,
  validateHostMigration,
  rollbackHostMigration,
  hostToPersonMapping,
};

// Run migration if this script is executed directly
if (require.main === module) {
  const action = process.argv[2];

  switch (action) {
    case "migrate":
      migrateHostsToPersons();
      break;
    case "validate":
      validateHostMigration();
      break;
    case "rollback":
      rollbackHostMigration();
      break;
    default:
      console.log(`
Usage: npx tsx migrations/migrate-host-to-person.ts [action]

Actions:
  migrate   - Migrate all host documents to person documents
  validate  - Validate the migration results
  rollback  - Rollback the migration (delete created person documents)

Example:
  npx tsx migrations/migrate-host-to-person.ts migrate
      `);
  }
}
