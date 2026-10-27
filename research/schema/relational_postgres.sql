-- MOSQUE ATLAS 3D — normalized PostgreSQL reference schema v1
-- The JSON Schema is normative for import/publishing payloads. Database migrations may extend this schema.
CREATE TABLE mosques (
  id text PRIMARY KEY CHECK(id ~ '^MOS-[0-9]{4}$'),
  slug text NOT NULL UNIQUE,
  country_iso2 char(2) NOT NULL,
  country_name text NOT NULL,
  city_name text NOT NULL,
  location_lat numeric(9,6),
  location_lon numeric(9,6),
  editorial_scope text NOT NULL DEFAULT 'research_candidate',
  model_id text,
  CHECK (location_lat BETWEEN -90 AND 90 OR location_lat IS NULL),
  CHECK (location_lon BETWEEN -180 AND 180 OR location_lon IS NULL)
);
CREATE TABLE translations (
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  language_tag text NOT NULL,
  field_key text NOT NULL,
  value_text text NOT NULL,
  review_status text NOT NULL DEFAULT 'pending',
  PRIMARY KEY(entity_type,entity_id,language_tag,field_key)
);
CREATE TABLE sources (
  id text PRIMARY KEY,
  institution text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  source_type text NOT NULL,
  accessed_on date,
  image_reuse_cleared boolean NOT NULL DEFAULT false
);
CREATE TABLE dated_events (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  event_type text NOT NULL,
  date_display text NOT NULL,
  start_year integer,
  end_year integer,
  precision text NOT NULL,
  certainty text NOT NULL,
  eligible_for_strict_sort boolean NOT NULL DEFAULT false,
  CHECK (end_year IS NULL OR start_year IS NULL OR end_year>=start_year)
);
CREATE TABLE claims (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  statement_en text NOT NULL,
  certainty text NOT NULL,
  editorial_note text,
  scholarly_review_status text NOT NULL DEFAULT 'pending'
);
CREATE TABLE claim_evidence (
  claim_id text NOT NULL REFERENCES claims(id),
  source_id text NOT NULL REFERENCES sources(id),
  locator text,
  evidence_role text NOT NULL DEFAULT 'supports',
  PRIMARY KEY (claim_id,source_id)
);
CREATE TABLE event_evidence (
  event_id text NOT NULL REFERENCES dated_events(id),
  source_id text NOT NULL REFERENCES sources(id),
  locator text,
  PRIMARY KEY(event_id,source_id)
);
CREATE TABLE architectural_elements (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  element_type text NOT NULL,
  associated_event_id text REFERENCES dated_events(id),
  description_en text
);
CREATE TABLE architectural_measurements (
  id text PRIMARY KEY,
  element_id text NOT NULL REFERENCES architectural_elements(id),
  value_numeric numeric NOT NULL,
  unit text NOT NULL,
  measurement_basis text NOT NULL,
  source_id text REFERENCES sources(id)
);
CREATE TABLE heritage_designations (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  designation_name text,
  relationship text NOT NULL,
  external_property_id text,
  inscription_year integer,
  supporting_source_id text REFERENCES sources(id)
);
CREATE TABLE media_assets (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  media_role text NOT NULL,
  original_uri text NOT NULL,
  creator text,
  license text,
  attribution text,
  rights_verified boolean NOT NULL DEFAULT false,
  associated_event_id text REFERENCES dated_events(id)
);
CREATE TABLE models_3d (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  asset_uri text NOT NULL,
  represented_phase text NOT NULL,
  source_provenance text NOT NULL,
  license text NOT NULL,
  scale_verified boolean NOT NULL DEFAULT false,
  accuracy_class text NOT NULL,
  review_status text NOT NULL DEFAULT 'submitted'
);
CREATE TABLE editorial_reviews (
  id text PRIMARY KEY,
  mosque_id text NOT NULL REFERENCES mosques(id),
  reviewer_id text,
  decision text NOT NULL,
  reviewed_at timestamptz,
  notes text
);
CREATE INDEX dated_events_by_time ON dated_events(start_year) WHERE eligible_for_strict_sort=true;
CREATE INDEX mosques_by_country ON mosques(country_iso2);
