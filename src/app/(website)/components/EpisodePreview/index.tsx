"use client";
import React from "react";
import {
  EPISODES_DETAILS_QUERY,
  PODCAST_DETAILS_QUERY,
} from "../../lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";
import EpisodeDetails from "../EpisodeDetails";
type Props = {};

const EpisodePreview = ({
  initial,
  params,
}: {
  initial: QueryResponseInitial<SanityDocument>;
  params: QueryParams;
}) => {
  // FOR SOME REASON
  // This causes the call depth issue
  const { data } = useQuery<SanityDocument | null>(
    PODCAST_DETAILS_QUERY,
    params,
    {
      initial,
    }
  );

  return data ? (
    <EpisodeDetails data={data} />
  ) : (
    <div className="bg-red-100">Episode not found</div>
  );
};
export default EpisodePreview;
