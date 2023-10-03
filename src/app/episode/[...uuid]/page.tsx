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
  };
};
export default function page() {
  return (
    <>
      <PodcastDetailsPageComponent />
    </>
  );
}
