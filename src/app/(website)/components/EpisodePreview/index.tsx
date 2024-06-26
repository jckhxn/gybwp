"use client";
import React from "react";
import { PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";
import EpisodeDetails from "../EpisodeDetails/indexOLD";

const EpisodePreview = ({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityDocument>;
  params: QueryParams;
}) => {
  const { data } = useQuery<SanityDocument | null>(
    PODCAST_DETAILS_QUERY,
    params,
    {
      initial,
    }
  );

  return data ? (
    <EpisodeDetails data={data} draftMode={true} />
  ) : (
    <div className="bg-red-100">Episode not found</div>
  );
};
export default EpisodePreview;
