import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8"));
const core = read("research/data/pilot_verified_core_6.json");
const sources = read("research/data/sources.json");
const legacy = read("research/data/legacy_provisional_100.json");
const terms = read("research/data/terminology_en_fr_ar.json");
const catalog = read("research/data/catalog_index_102.json");
const enriched = read("research/data/enriched_profiles_6.json");
const sourceIds = new Set(sources.map((s) => s.id));
const ids = new Set(core.map((r) => r.id));

function assert(value, message) { if (!value) throw new Error(message); }
assert(core.length === 6, "Expected six documented core records");
assert(legacy.length === 100, "Expected the original 100 legacy candidates");
assert(terms.length === 42, "Expected 42 stable terms");
assert(catalog.count === 102 && catalog.provisional_count === 96, "Catalog counts are inconsistent");
assert(ids.size === 6 && ids.has("MOS-0101") && ids.has("MOS-0102"), "Core IDs collide or additions are missing");
assert(enriched.schema_version === "1.0.0" && enriched.profiles.length === 6, "Expected six enriched profiles");
assert(new Set(enriched.profiles.map((profile) => profile.record_id)).size === 6, "Enriched profile IDs duplicate");
assert(enriched.profiles.every((profile) => ids.has(profile.record_id)), "Enriched profile does not map to a verified core record");
assert(enriched.profiles.every((profile) => profile.sections.length === 4), "Each enriched profile must contain four sections");
assert(enriched.profiles.every((profile) => profile.sections.filter((section) => section.visibility === "visitor_and_research").length === 3 && profile.sections.filter((section) => section.visibility === "research_only").length === 1), "Enriched visibility boundaries are inconsistent");
for (const profile of enriched.profiles) {
  const record = core.find((item) => item.id === profile.record_id);
  assert(["en", "fr", "ar"].every((locale) => profile.names[locale] === record.names[locale]), `${profile.record_id} enriched names do not match the core record`);
  for (const section of profile.sections) {
    assert(["en", "fr", "ar"].every((locale) => section.content[locale].title.length >= 4 && section.content[locale].body.length >= 80), `${section.id} localized enrichment is incomplete`);
    for (const id of section.source_ids) assert(sourceIds.has(id), `${section.id} references missing source ${id}`);
  }
}
assert(core.every((r) => r.media.length === 0 && r.model_3d === null), "Pilot must not contain unreviewed media or models");
assert(core.every((r) => r.editorial.approval === "editorial_core_fact_checked" && r.editorial.scholarly_peer_review === "pending"), "Core editorial status is overstated");
for (const record of core) {
  for (const id of [...record.source_ids, ...record.claims.flatMap((c) => c.source_ids), ...record.chronology.phases.flatMap((p) => p.source_ids)]) assert(sourceIds.has(id), `${record.id} references missing source ${id}`);
}
assert(core.find((r) => r.id === "MOS-0003").chronology.foundation.sort_year === null, "Isfahan must remain undated for sorting");
assert(core.find((r) => r.id === "MOS-0101").chronology.foundation.sort_year === null, "Djenné traditional foundation must remain undated for sorting");
console.log("PASS — atlas invariants, 24 enriched profile sections, publication boundaries and evidence references verified.");
