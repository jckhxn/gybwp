import { redirect } from "next/navigation";
import { loadSiteSettings } from "@/data/sanity";

/**
 * Call at the top of any page server component.
 * Redirects to / if maintenance mode is enabled.
 */
export async function checkMaintenanceMode() {
  const settings = await loadSiteSettings();
  if (settings?.maintenanceMode) {
    redirect("/");
  }
}
