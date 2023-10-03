import React from "react";
import DashComponent from "../../components/DashboardPage";
// Ensures the Studio route is statically generated
export const dynamic = "force-static";

export default function page() {
  return <DashComponent />;
}
