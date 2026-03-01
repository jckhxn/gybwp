import React from "react";
import { checkMaintenanceMode } from "@/src/app/(website)/lib/maintenance";
import PrivacyPageComponent from "@/src/components/pages/PrivacyPage";
type Props = {};

const page = async (props: Props) => {
  await checkMaintenanceMode();
  return <PrivacyPageComponent />;
};

export default page;
