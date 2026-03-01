// @ts-nocheck
import React from "react";
import { checkMaintenanceMode } from "@/src/app/(website)/lib/maintenance";
import SponsorsPageComponent from "@/src/components/pages/SponsorsPage";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function page() {
  await checkMaintenanceMode();
  return (
    <>
      <SponsorsPageComponent />
    </>
  );
}
