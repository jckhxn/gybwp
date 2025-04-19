// @ts-nocheck
import { defineMigration, patch } from "sanity/migrate";
import fetch from "node-fetch";

export default defineMigration({
  title: "convert-string-to-image",
  documentTypes: ["featuredArticle"],

  async *migrate(documents, context) {
    for await (const doc of documents()) {
      // Track if we need to update this document
      let hasChanges = false;
      // Store all the patches we'll apply
      const patches = [];

      // Function to process an image field
      const processImageField = async (fieldPath, imageUrl) => {
        if (typeof imageUrl === "string" && imageUrl) {
          try {
            // Skip if it's already an image reference
            if (imageUrl.startsWith("{") || imageUrl.includes("asset")) {
              return;
            }

            console.log(
              `Converting image at ${fieldPath} in document ${doc._id}`
            );

            // Fetch the image
            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch image: ${imageResponse.status}`);
            }

            // Upload to Sanity as an asset
            const asset = await context.uploadAsset(imageResponse.body, {
              filename: `${fieldPath.replace(/\./g, "-")}.jpg`,
            });

            // Create proper image reference
            const imageAsset = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };

            // Add to patches
            patches.push(patch.set({ [fieldPath]: imageAsset }));
            hasChanges = true;
          } catch (error) {
            console.error(`Failed to process image at ${fieldPath}:`, error);
          }
        }
      };

      // Recursively traverse the document to find string fields that might be images
      const traverseObject = async (obj, path = "") => {
        if (!obj || typeof obj !== "object") return;

        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;

          // If the field name suggests it's an image and it's a string, convert it
          if (
            (key.toLowerCase().includes("image") ||
              key.toLowerCase().includes("photo") ||
              key.toLowerCase().includes("picture")) &&
            typeof value === "string"
          ) {
            await processImageField(currentPath, value);
          }
          // If it's an array or object, traverse it
          else if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              // Handle arrays
              for (let i = 0; i < value.length; i++) {
                const itemPath = `${currentPath}[${i}]`;
                if (typeof value[i] === "object" && value[i] !== null) {
                  await traverseObject(value[i], itemPath);
                } else if (
                  (currentPath.toLowerCase().includes("image") ||
                    currentPath.toLowerCase().includes("photo") ||
                    currentPath.toLowerCase().includes("picture")) &&
                  typeof value[i] === "string"
                ) {
                  await processImageField(`${itemPath}`, value[i]);
                }
              }
            } else {
              // Handle objects
              await traverseObject(value, currentPath);
            }
          }
        }
      };

      // Start the traversal
      await traverseObject(doc);

      // Apply the patches if we have any
      if (hasChanges && patches.length > 0) {
        yield patch(doc._id, ...patches);
        console.log(
          `Updated document ${doc._id} with ${patches.length} image conversions`
        );
      }
    }
  },
});
