import coreData from "@/research/data/pilot_verified_core_6.json";
import candidateData from "@/research/data/legacy_provisional_100.json";
import sourceData from "@/research/data/sources.json";
import termData from "@/research/data/terminology_en_fr_ar.json";
import catalogData from "@/research/data/catalog_index_102.json";
import enrichedProfileData from "@/research/data/enriched_profiles_6.json";
import type { Candidate, EnrichedProfileCollection, MosqueRecord, Source, Term } from "@/lib/types";

export const coreRecords = coreData as MosqueRecord[];
export const sources = sourceData as Source[];
export const terms = termData as Term[];
export const sourceMap = new Map(sources.map((source) => [source.id, source]));
export const enrichedProfiles = (enrichedProfileData as EnrichedProfileCollection).profiles;
export const enrichedProfileMap = new Map(enrichedProfiles.map((profile) => [profile.record_id, profile]));

const pilotIds = new Set(catalogData.pilot_index.map((item) => item.id));
export const candidates = (candidateData as Candidate[]).filter((item) => !pilotIds.has(item.mosque_id));

export const sortedCoreRecords = [...coreRecords].sort((a, b) => {
  const aYear = a.chronology.foundation.sort_year;
  const bYear = b.chronology.foundation.sort_year;
  if (aYear === null && bYear === null) return a.id.localeCompare(b.id);
  if (aYear === null) return 1;
  if (bYear === null) return -1;
  return aYear - bYear;
});

export function getRecord(slug: string) {
  return coreRecords.find((record) => record.slug === slug);
}

export function getEnrichedProfile(recordId: string) {
  return enrichedProfileMap.get(recordId);
}

export function getSources(ids: string[]) {
  return ids.flatMap((id) => {
    const source = sourceMap.get(id);
    return source ? [source] : [];
  });
}
