import TOUPageComponent from "@/src/components/pages/TOUPage";
import React from "react";
import { checkMaintenanceMode } from "@/src/app/(website)/lib/maintenance";

type Props = {};

const page = async (props: Props) => {
  await checkMaintenanceMode();
  return <TOUPageComponent />;
};

export default page;
