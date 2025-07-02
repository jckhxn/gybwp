import {
  PagePayload,
  EpisodePayload,
  PersonPayload,
  SponsorPayload,
} from "@/types";
import { loadQuery } from "./loadQuery";
import { PAGE_QUERY, ALL_EPISODES_QUERY, ALL_PEOPLE_QUERY } from "./queries";

// Export loadQuery for use in other parts of the app
export { loadQuery } from "./loadQuery";

export async function loadPage(pathname: string) {
  return loadQuery<
    PagePayload | EpisodePayload | PersonPayload | SponsorPayload | null
  >({
    query: PAGE_QUERY,
    params: { pathname },
    tags: [pathname === "/" ? "page" : pathname.split("/")[1]],
  });
}

export async function loadAllEpisodes() {
  return loadQuery<any[]>({
    query: ALL_EPISODES_QUERY,
    tags: ["episode"],
  });
}

export async function loadAllPeople() {
  return loadQuery<PersonPayload[]>({
    query: ALL_PEOPLE_QUERY,
    tags: ["person"],
  });
}
