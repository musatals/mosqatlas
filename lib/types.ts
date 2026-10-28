export type Locale = "en" | "fr" | "ar";
export type Certainty = "documented" | "disputed" | "traditional" | "uncertain";

export interface HistoricalDate {
  display: string;
  start_year: number | null;
  end_year: number | null;
  precision: string;
  certainty: Certainty;
  event_type: string;
  source_ids: string[];
  sort_year: number | null;
}

export interface Phase {
  id: string;
  event_type: string;
  display_date: string;
  start_year: number | null;
  end_year: number | null;
  description_en: string;
  certainty: Certainty;
  source_ids: string[];
}

export interface Source {
  id: string;
  institution: string;
  title: string;
  url: string;
  source_type: string;
  accessed_on: string;
  rights_for_images: string;
  full_text_review: string;
}

export interface Claim {
  id: string;
  statement_en: string;
  certainty: Certainty;
  source_ids: string[];
  review_note: string | null;
}

export interface MosqueRecord {
  schema_version: "1.0.0";
  id: string;
  slug: string;
  names: Record<Locale, string> & { original: { value: string; language: string } };
  location: { city: string; country: string; country_iso2: string; coordinates: null | { lat: number; lon: number } };
  chronology: { foundation: HistoricalDate; present_structure: HistoricalDate; phases: Phase[] };
  architectural_profile: { traditions: string[]; typologies: string[]; materials: string[]; elements: string[] };
  heritage: {
    relationship: string;
    designation_name: string | null;
    inscription_year: number | null;
    unesco_property_id: string | null;
    source_ids: string[];
    context_note: string | null;
  };
  content: Record<Locale, { intro: string; history: string; architecture: string }>;
  claims: Claim[];
  source_ids: string[];
  media: Array<Record<string, unknown>>;
  model_3d: null | Record<string, unknown>;
  editorial: {
    approval: string;
    approved_scope: string;
    scholarly_peer_review: string;
    fr_ar_translation_review: string;
    approved_on: string;
    image_license_status: string;
    model_validation: string;
    visitor_access: string;
  };
  provenance: { legacy_id: string | null; legacy_dataset: string };
}

export interface Candidate {
  mosque_id: string;
  name_en: string;
  city: string;
  country: string;
  continent: string;
  foundation_display: string;
  present_structure_display: string;
  foundation_sort_year: number | null;
  source_status: string;
  uncertainty: string;
  editorial_status: string;
  publication_ready: boolean;
}

export interface Term {
  term_id: string;
  en: string;
  fr: string;
  ar: string;
  definition_en: string;
  review_status: string;
}

export interface EnrichedProfileSection {
  id: string;
  visibility: "visitor_and_research" | "research_only";
  content: Record<Locale, { title: string; body: string }>;
  source_ids: string[];
}

export interface EnrichedProfile {
  record_id: string;
  names: Record<Locale, string>;
  sections: EnrichedProfileSection[];
}

export interface EnrichedProfileCollection {
  schema_version: "1.0.0";
  editorial_status: "source_linked_editorial_synthesis_pending_scholarly_and_translation_review";
  profiles: EnrichedProfile[];
}
