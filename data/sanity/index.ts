import {
  PagePayload,
  EpisodePayload,
  PersonPayload,
  SponsorPayload,
  SiteSettings,
} from "@/types";
import { loadQuery } from "./loadQuery";
import {
  PAGE_QUERY,
  ALL_EPISODES_QUERY,
  ALL_PEOPLE_QUERY,
  EPISODE_BY_IDENTIFIER_QUERY,
} from "./queries";
import config from "@/config";

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
  // Use a direct REST fetch with cache:'no-store' to guarantee the latest
  // published value on every request — bypasses @sanity/client internals,
  // the Sanity CDN, and the Next.js data cache entirely.
  const { projectId, dataset, apiVersion } = config.sanity;
  const query = encodeURIComponent(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{ maintenanceMode, maintenanceTitle, maintenanceMessage }`
  );
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.result as SiteSettings) ?? null;
  } catch (e) {
    console.error("[siteSettings] fetch error:", e);
    return null;
  }
}
