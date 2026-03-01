import {
  PagePayload,
  EpisodePayload,
  PersonPayload,
  SponsorPayload,
  SiteSettings,
  MaintenancePageData,
} from "@/types";
import { loadQuery } from "./loadQuery";
import {
  PAGE_QUERY,
  ALL_EPISODES_QUERY,
  ALL_PEOPLE_QUERY,
  EPISODE_BY_IDENTIFIER_QUERY,
  SITE_SETTINGS_QUERY,
  MAINTENANCE_PAGE_QUERY,
} from "./queries";

export async function loadPage(pathname: string) {
  return loadQuery<
    PagePayload | EpisodePayload | PersonPayload | SponsorPayload | null
  >({
    query: PAGE_QUERY,
    params: { pathname },
  });
}

export async function loadAllEpisodes() {
  return loadQuery<any[]>({
    query: ALL_EPISODES_QUERY,
    params: {},
  });
}

export async function loadAllPeople() {
  return loadQuery<PersonPayload[]>({
    query: ALL_PEOPLE_QUERY,
    params: {},
  });
}

export async function loadEpisode(identifier: string, slug?: string) {
  return loadQuery<any>({
    query: EPISODE_BY_IDENTIFIER_QUERY,
    params: { identifier, slug, epID: identifier?.split("-")[0] },
  });
}

export async function loadSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await loadQuery<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: {},
      revalidate: 0,
      useCdn: false,
    });
  } catch (e) {
    console.error("[siteSettings] fetch error:", e);
    return null;
  }
}

export async function loadMaintenancePage(): Promise<MaintenancePageData | null> {
  try {
    return await loadQuery<MaintenancePageData | null>({
      query: MAINTENANCE_PAGE_QUERY,
      params: {},
      revalidate: 60,
    });
  } catch (e) {
    console.error("[maintenancePage] fetch error:", e);
    return null;
  }
}
