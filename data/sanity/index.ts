import {
  PagePayload,
  EpisodePayload,
  PersonPayload,
  SponsorPayload,
} from "@/types";
import { loadQuery } from "./loadQuery";
import {
  PAGE_QUERY,
  ALL_EPISODES_QUERY,
  ALL_PEOPLE_QUERY,
  EPISODE_BY_IDENTIFIER_QUERY,
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
