import React from "react";
import GuestPage from "@/src/app/(website)/components/GuestPage";

type Props = {
  params: { guest: string };
};

export default function Page(props: Props) {
  const { guest } = props.params;

  return <GuestPage guest={guest} />;
}
