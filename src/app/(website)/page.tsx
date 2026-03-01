import React from "react";
import { Page } from "@/src/components/Page";
import { loadPage, loadSiteSettings, loadMaintenancePage } from "@/data/sanity";
import { notFound } from "next/navigation";
import MaintenancePage from "@/src/components/features/MaintenancePage";

export default async function IndexRoute() {
  const settings = await loadSiteSettings();

  if (settings?.maintenanceMode) {
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
