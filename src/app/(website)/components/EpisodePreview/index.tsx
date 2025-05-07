"use client";
import React from "react";
import { PODCAST_DETAILS_QUERY } from "../../lib/queries";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { QueryParams, SanityDocument } from "next-sanity";

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
    <h2>WIP</h2>
  ) : (
    <div className="bg-red-100">Episode not found</div>
  );
};
export default EpisodePreview;
