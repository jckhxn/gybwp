import React from "react";
import { draftMode } from "next/headers";

type Props = {};

const Page = (props: Props) => {
  if (draftMode().isEnabled) {
    // If in Live Preview (Dashboard), give new doc speel.
    return <h1 className="text-center">Start a new Episode document.</h1>;
  } else {
    // Page not found error for regular visitors
    throw new Error("Get outta here.");
  }
};

export default Page;
