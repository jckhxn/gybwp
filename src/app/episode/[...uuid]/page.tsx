// @ts-nocheck
import React from "react";
import PodcastDetailsPageComponent from "../../../components/Pages/PodcastDetailsPage";
// Get Episode Data
import { getEpisodeDetails } from "../../sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: { uuid: string };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  const [episodeDetails] = await getEpisodeDetails(params.uuid);

  return {
    title: episodeDetails.episodeName,
    description: episodeDetails.blurb,
    openGraph: {
      title: episodeDetails.episodeName,
      description: episodeDetails.blurb,
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
  return (
    <>
      <PodcastDetailsPageComponent />
    </>
  );
}
