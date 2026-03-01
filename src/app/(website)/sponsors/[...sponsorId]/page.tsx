// @ts-nocheck
import React from "react";
import { checkMaintenanceMode } from "@/src/app/(website)/lib/maintenance";
import SponsorsPageDetailsComponent from "@/src/components/pages/SponsorsDetailPage";

export default async function page() {
  await checkMaintenanceMode();
  return (
    <>
      <SponsorsPageDetailsComponent />
    </>
  );
}
