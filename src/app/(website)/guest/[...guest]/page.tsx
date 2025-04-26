// @ts-nocheck
import React from "react";
import GuestPage from "@/src/app/(website)/components/GuestPage";

export default function Page(props) {
  const { guest } = props.params;

  return <GuestPage guest={guest} />;
}
