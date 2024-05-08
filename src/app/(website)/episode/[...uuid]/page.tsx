// @ts-nocheck

import React from "react";
import PodcastDetailsPageComponent from "../../components/Pages/PodcastDetailsPage";
import PodcastPreview from "../../sanity/components/PodcastPreview";
// Get Episode Data
import { client } from "../../sanity/sanity-utils";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { EPISODES_DETAILS_QUERY } from "../../lib/queries";

type Props = {
  params: { uuid: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
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

export default function page() {
  return draftMode().isEnabled ? (
    // Preview Component for dashboard
    <PodcastPreview />
  ) : (
    <PodcastDetailsPageComponent />
  );
}
