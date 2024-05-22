// @ts-nocheck

import React from "react";
import PodcastDetailsPageComponent from "@/src/app/(website)/components/PodcastDetailsPage";
import PodcastPreview from "@/src/app/(website)/components/EpisodePreview";
import EpisodeDetails from "@/src/app/(website)/components/EpisodeDetails";

// Get Episode Data
import { client } from "../../sanity/sanity-utils";
import { Metadata } from "next";
import { QueryParams, SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";
import {
  EPISODES_DETAILS_QUERY,
  PODCAST_DETAILS_QUERY,
} from "../../lib/queries";
import EpisodePreview from "@/src/app/(website)/components/EpisodePreview";
import { loadQuery } from "@/src/app/(website)/lib/store";

export const generateMetadata = async (props): Promise<Metadata> => {
  const { params } = props;

  const [episodeDetails] = await client.fetch(EPISODES_DETAILS_QUERY, {
    uuid: String(params.uuid),
  });

  if (episodeDetails)
    return {
      title: episodeDetails.episodeName,
      description: episodeDetails.blurb,
      openGraph: {
        title: episodeDetails.episodeName,
        description: episodeDetails.blurb,
        image: episodeDetails.image,
        videos: [
          {
            url: episodeDetails.url,
            secureUrl: `https://www.youtube.com/embed/${
              episodeDetails.url.split("/")[3]
            }`,
            type: "video.other",
          },
        ],
        images: [
          {
            url: episodeDetails.image,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
};

export default async function Page({ params }: { params: QueryParams }) {
  const { uuid } = params;
  const epID = uuid.split("-")[0];

  const initial = await loadQuery<SanityDocument>(
    PODCAST_DETAILS_QUERY,
    { uuid, epID },
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    }
  );

  return draftMode().isEnabled ? (
    <EpisodePreview initial={initial} params={{ uuid, epID }} />
  ) : (
    <EpisodeDetails data={initial.data} />
  );
}
