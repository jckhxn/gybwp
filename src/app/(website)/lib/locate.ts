// locate.ts
import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
  // Set up locations for episode documents

  if (params.type === "episode") {
    // Extract the params we need and remove the version property
    const { id, type } = params;
    const queryParams = { id, type };

    // Subscribe to the latest uuid and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{youtube{uuid,title}}`,
      queryParams,
      { perspective: "previewDrafts" } // returns a draft article if it exists
    );
    // Return a streaming list of locations

    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null

        if (!doc || !doc.youtube) {
          return null;
        }
        return {
          locations: [
            {
              title: doc.youtube.title || "Untitled",
              href: `/episode/${doc.youtube.uuid}`,
            },
          ],
        };
      })
    );
  }
  return null;
};
