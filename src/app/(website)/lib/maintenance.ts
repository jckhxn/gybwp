import { redirect } from "next/navigation";
import { loadSiteSettings } from "@/data/sanity";
import { headers } from "next/headers";

/**
 * Call at the top of any page server component.
 * Redirects to / if maintenance mode is enabled.
 */
export async function checkMaintenanceMode() {
  const settings = await loadSiteSettings();
  if (!settings) return;

  const host = headers().get("host")?.split(":")[0];
  const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "::1";

  if (settings.maintenanceMode) {
    redirect("/");
  }

  if (settings.maintenanceModeLocalhost && isLocalHost) {
    redirect("/");
  }
}
