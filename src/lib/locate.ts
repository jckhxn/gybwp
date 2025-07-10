// locate.ts
import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";
import { formatEpisodeTitle } from "@/src/lib/formatTitle";

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
  // Set up locations for episode documents
  if (params.type === "episode") {
    // Extract the params we need and remove the version property
    const { id, type } = params;
    const queryParams = { id, type };

    // Subscribe to the latest episode data
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{
        pathname,
        slug,
        episodeName,
        youtube{uuid, title},
        uuid
      }`,
      queryParams,
      { perspective: "drafts" }
    );

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        if (!doc) {
          return null;
        }

        // Try to get the title from various sources
        const title =
          doc.episodeName || doc.youtube?.title || "Untitled Episode";

        // Try to get the URL from various sources
        let href = null;

        // First try pathname (this is the most reliable)
        if (doc.pathname?.current) {
          href = doc.pathname.current;
        }
        // Then try slug
        else if (doc.slug?.current) {
          href = `/episodes/${encodeURIComponent(doc.slug.current)}`;
        }
        // Finally try UUID (legacy)
        else if (doc.uuid || doc.youtube?.uuid) {
          href = `/episodes/${encodeURIComponent(doc.uuid || doc.youtube.uuid)}`;
        }

        if (!href) {
          return null;
        }

        return {
          locations: [
            {
              title: formatEpisodeTitle(title),
              href: href,
            },
          ],
        };
      })
    );
  }

  // Handle page documents
  if (params.type === "page") {
    const { id, type } = params;
    const queryParams = { id, type };

    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{title, pathname}`,
      queryParams,
      { perspective: "previewDrafts" }
    );

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.pathname?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled Page",
              href: doc.pathname.current,
            },
          ],
        };
      })
    );
  }

  // Handle person documents
  if (params.type === "person") {
    const { id, type } = params;
    const queryParams = { id, type };

    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]{name, pathname}`,
      queryParams,
      { perspective: "previewDrafts" }
    );

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.pathname?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.name || "Untitled Person",
              href: doc.pathname.current,
            },
          ],
        };
      })
    );
  }

  return null;
};
