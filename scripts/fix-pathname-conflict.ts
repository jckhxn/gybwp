import { client } from "../src/app/(website)/sanity/sanity-utils";

async function fixPathnameConflict() {
  console.log("🔍 Finding documents with root pathname '/'...");

  try {
    // Find all documents with root pathname
    const rootPathDocs = await client.fetch(`
      *[pathname.current == "/"] {
        _id,
        _type,
        title,
        pathname,
        _createdAt
      }
    `);

    console.log(
      `Found ${rootPathDocs.length} documents using root path "/":`,
      rootPathDocs
    );

    if (rootPathDocs.length === 0) {
      console.log("✅ No documents using root path");
      return;
    }

    // If there's only one document and it's a 'post', move it to free up the root path
    if (rootPathDocs.length === 1) {
      const doc = rootPathDocs[0];
      if (doc._type === "post") {
        const newPath = `/blog/${doc.title?.toLowerCase().replace(/\s+/g, "-") || "post-" + doc._id.slice(-6)}`;

        console.log(
          `Moving post "${doc.title}" from "/" to "${newPath}" to free up root path`
        );

        await client
          .patch(doc._id)
          .set({
            pathname: { current: newPath, _type: "slug" },
          })
          .commit();

        console.log(`✅ Updated ${doc._id} to ${newPath}`);
        console.log("🎉 Root path is now available for your home page!");
        return;
      } else {
        console.log(
          "✅ Root path is used by:",
          doc._type,
          doc.title || doc._id
        );
        return;
      }
    }

    // Sort by creation date - keep the oldest one
    const sortedDocs = rootPathDocs.sort(
      (a: any, b: any) =>
        new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
    );

    const keepDoc = sortedDocs[0];
    const docsToUpdate = sortedDocs.slice(1);

    console.log(
      `Keeping root path for: ${keepDoc.title || keepDoc._id} (${keepDoc._type})`
    );

    // Update the conflicting documents
    for (const doc of docsToUpdate) {
      const newPath =
        doc._type === "page"
          ? `/${doc.title?.toLowerCase().replace(/\s+/g, "-") || "page-" + doc._id.slice(-6)}`
          : `/${doc._type}/${doc._id.slice(-6)}`;

      console.log(`Updating ${doc.title || doc._id} to "${newPath}"`);

      await client
        .patch(doc._id)
        .set({
          pathname: { current: newPath, _type: "slug" },
        })
        .commit();

      console.log(`✅ Updated ${doc._id}`);
    }

    console.log("🎉 All conflicts resolved!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

fixPathnameConflict();
