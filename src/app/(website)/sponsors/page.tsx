// @ts-nocheck
import React from "react";

import SponsorsPageComponent from "@/src/components/pages/SponsorsPage";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default function page() {
  return (
    <>
      <SponsorsPageComponent />
    </>
  );
}
