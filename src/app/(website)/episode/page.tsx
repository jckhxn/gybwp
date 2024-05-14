import React from "react";
import { draftMode } from "next/headers";
import { EpisodesPage } from "../components/EpisodesPage/episodes-page";

type Props = {};

const Page = (props: Props) => {
  if (draftMode().isEnabled) {
    // If in Live Preview (Dashboard), give new doc speel.
    return <h1 className="text-center">Start a new Episode document.</h1>;
  } else {
    // Display all episodes.
    return <EpisodesPage />;
  }
};

export default Page;
