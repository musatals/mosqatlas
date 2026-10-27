/** MOSQUE ATLAS 3D v1 contract. JSON Schema is normative; this TypeScript module is a developer convenience. */
export type Locale = 'en' | 'fr' | 'ar';
export type HistoricalCertainty = 'documented' | 'disputed' | 'traditional' | 'uncertain';
export type DatingPrecision = 'year' | 'range' | 'century' | 'period' | 'unknown' | 'traditional_century' | 'multi_period';
export type HeritageRelationship = 'individually_inscribed' | 'original_inscription_later_extended' | 'within_inscribed_property' | 'national_monument' | 'not_verified';
export interface HistoricalDate {
  display: string;
  start_year: number | null;
  end_year: number | null;
  precision: DatingPrecision;
  certainty: HistoricalCertainty;
  event_type: string;
  source_ids: string[];
  sort_year: number | null;
}
export interface Phase {
  id: string;
  event_type: 'foundation' | 'initial_construction' | 'early_foundation' | 'extension' | 'reconstruction' | 'modification' | 'change_of_use' | 'heritage_designation';
  display_date: string;
  start_year: number | null;
  end_year: number | null;
  description_en: string;
  certainty: HistoricalCertainty;
  source_ids: string[];
}
export interface Source {
  id: string; institution: string; title: string; url: string;
  source_type: string; accessed_on: string;
  rights_for_images: 'not_assessed' | 'cleared';
  full_text_review: string;
}
export interface Claim {
  id: string; statement_en: string; certainty: HistoricalCertainty;
  source_ids: string[]; review_note: string | null;
}
export interface Media {
  id: string; role: 'front' | 'rear' | 'side' | 'aerial' | 'interior' | 'detail' | 'plan' | 'section' | 'historical';
  url: string; author: string | null; license: string; attribution: string; rights_verified: boolean;
}
export interface Model3D {
  id: string; uri: string; format: 'glb' | 'gltf';
  represented_phase: string; provenance: string; license: string;
  scale_verified: boolean;
  accuracy_class: 'measured' | 'documentary_reconstruction' | 'hypothetical' | 'unverified';
  status: 'submitted' | 'reviewed' | 'published';
}
export interface MosqueRecordV1 {
  schema_version: '1.0.0'; id: string; slug: string;
  names: Record<Locale,string> & {original:{value:string; language:string}};
  location: {city:string; country:string; country_iso2:string; coordinates:null | {lat:number;lon:number}};
  chronology: {foundation:HistoricalDate;present_structure:HistoricalDate;phases:Phase[]};
  architectural_profile: {traditions:string[];typologies:string[];materials:string[];elements:string[]};
  heritage:{relationship:HeritageRelationship;designation_name:string|null;inscription_year:number|null;unesco_property_id:string|null;source_ids:string[];context_note:string|null};
  content: Record<Locale,{intro:string;history:string;architecture:string}>;
  claims: Claim[]; source_ids: string[]; media: Media[]; model_3d: Model3D|null;
  editorial:{approval:'editorial_core_fact_checked'|'research_candidate'|'scholarly_approved';approved_scope:'limited_verified_core'|'complete_dossier'|'none';scholarly_peer_review:'pending'|'approved';fr_ar_translation_review:'pending'|'approved';approved_on:string;image_license_status:'no_reuse_cleared'|'partially_cleared'|'cleared';model_validation:'not_applicable'|'pending'|'verified';visitor_access:'not_verified'|'verified'};
  provenance:{legacy_id:string|null; legacy_dataset:string};
}
export interface Term {term_id:string;en:string;fr:string;ar:string;definition_en:string;review_status:string}
