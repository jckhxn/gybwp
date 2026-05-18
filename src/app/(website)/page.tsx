import React from "react";
import { Page } from "@/src/components/Page";
import { loadPage, loadSiteSettings, loadMaintenancePage } from "@/data/sanity";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MaintenancePage from "@/src/components/features/MaintenancePage";

export default async function IndexRoute() {
  const settings = await loadSiteSettings();

  const host = headers().get("host")?.split(":")[0];
  const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "::1";

  if (settings?.maintenanceMode || (settings?.maintenanceModeLocalhost && isLocalHost)) {
    const maintenanceData = await loadMaintenancePage();
    return <MaintenancePage data={maintenanceData} />;
  }

  const data = await loadPage("/");
  if (!data) {
    // If there's no homepage build, return error with message
    // Sanity not found route, otherwise nextjs route.
    const notFoundPage = await loadPage("not-found");
    if (!notFoundPage) return notFound();
  }
  return <Page data={data} />;
}
