// @ts-nocheck
import React from "react";
import { draftMode } from "next/headers";
import { SanityDocument } from "next-sanity";

// Components
import EpisodePreview from "@/src/app/(website)/components/EpisodePreview";
import EpisodeDetails from "@/src/app/(website)/components/EpisodeDetails/";

// Queries and utilities
import { PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { loadQuery } from "@/src/app/(website)/lib/store";
import processMetadata from "@/src/lib/processMetadata";

type PageParams = {
  uuid: string;
};

export default async function Page({ params }: { params: PageParams }) {
  const { uuid } = params;
  const epID = uuid.split("-")[0];

  const initial = await loadQuery<SanityDocument>(
    PODCAST_DETAILS_QUERY,
    { uuid, epID },
    {
      perspective: (await draftMode()).isEnabled
        ? "previewDrafts"
        : "published",
    }
  );

  return (await draftMode()).isEnabled ? (
    <EpisodePreview initial={initial} params={{ uuid, epID }} />
  ) : (
    <>
      <EpisodeDetails data={initial.data} />
    </>
  );
}

// export async function generateMetadata({ params }: { params: PageParams }) {
//   const { uuid } = params;
//   const epID = uuid.split("-")[0];

//   const initial = await loadQuery<SanityDocument>(
//     PODCAST_DETAILS_QUERY,
//     { uuid, epID },
//     {
//       perspective: (await draftMode()).isEnabled
//         ? "previewDrafts"
//         : "published",
//     }
//   );

//   return processMetadata(initial);
// }
