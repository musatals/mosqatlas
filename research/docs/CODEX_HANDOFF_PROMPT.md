# Prompt for Codex: implement MOSQUE ATLAS 3D from the approved scholarly handoff

Create a production-quality, accessible and multilingual **MOSQUE ATLAS 3D** website, using the attached handoff as the authoritative content contract. Begin in a new branch and make a pull request; do not deploy to production without user approval. The package has no executable site code and does not authorize changing existing projects or domains.

## First read

Read `README.md`, `docs/EDITORIAL_RELEASE_POLICY.md`, `data/pilot_verified_core_6.json`, `data/sources.json`, `data/terminology_en_fr_ar.json`, and `schema/mosque-record.v1.schema.json`. Run `python validation/validate.py` before import; do not silently ignore failed validations.

## Scope

1. Build a modern responsive historical atlas with a home page, catalog page, locale-aware mosque detail pages, interactive timeline, world map, architecture glossary, research source register and a comparison laboratory for **two or three mosques**.
2. Supply two distinct views sharing the exact underlying facts: **Visitor View** (concise visitor-facing history, foundation and present-structure dates, illustrations when licensed, 3D viewer only when a model exists) and **Research View** (all construction phases, individual claims and sources, heritage relationship, contradictions and research gaps).
3. Use **English, French, Arabic** with semantic multilingual routing and accessible RTL for Arabic. Display original-language monument names alongside localized names. Never fabricate translation certainty.
4. The initial published sample consists of **six limited verified-core records** only. Other 96 records from `legacy_provisional_100.json` can be displayed in an explicitly separate **Research candidates** catalog with transparent unavailable fields, or kept private until checked. Do not label any complete dossier peer-reviewed.
5. Render **two dates on every mosque card whenever applicable**: Founded, Present Structure. Show `unknown`, `traditional`, `multi-period`, and `disputed` truthfully. Chronological default order is by verified mosque foundation; undated monuments appear in an unresolved-dates section. Provide optional present-structure chronology without assigning false exact years.
6. Embed interactive 3D viewers for administrator-uploaded GLB/glTF files only, with rotation, zoom, pan, front/rear/left/right/top/isometric camera presets, fullscreen and optional component annotations. **Do not implement VR, WebXR, immersive walkthroughs, or invented model geometry.** If no model, display a respectful empty state.
7. The 2/3 mosque comparison must support evidence-linked fact tables, synchronized/independent rotation when models exist, and true-scale only when all models have verified scale. Otherwise present a clear warning and disable that mode.
8. Media: use only reviewed asset records with license and author attribution; no scraped or fabricated illustrations. The initial pilot purposely has no cleared images.
9. Provide an admin review interface or migration workflow for candidate -> documented core -> scholarly approved, with auditing. Enforce source-to-claim referential integrity and content sanitization.
10. Use stable IDs (`MOS-0001` ... `MOS-0102`) independent of translated slugs. Preserve all source links and original names. Do not invent UNESCO designations or institutional endorsements.

## Acceptance tests

- JSON Schema Draft 2020-12 validation and source/ID referential integrity pass.
- Six verified-core entries are displayed; Djenné and Amr appended without collision.
- Kairouan founded 670 / ninth-century principal architecture; Córdoba founded 786–788 / multi-period; Isfahan early origin uncertain / multi-period; Djenné original date traditional / 1906–1907; Singapore Sultan Mosque foundation 1824–1826 and evidence disagreement 1928 vs 1932; Amr founded 641 / 20th century rebuilt.
- All six display source-linked timeline and scholarly notes. No `peer reviewed` labels appear.
- EN/FR/AR term IDs remain stable; Arabic RTL displays properly without reversing Arabic numerals or GLB camera controls.
- UNESCO relationship is shown accurately for each pilot.
- No model viewer pretends to have a 3D asset; no images without clearance; no VR navigation.
- Comparison for 2 or 3 mosque records works even when all 3D assets are missing (facts only).
- No production deployment without authorization.

## Future additions

Once a qualified human reviewer approves complete dossiers, their `editorial` object may transition to `scholarly_approved` with an identifiable review decision. Treat the schema as versioned, write migrations, do not mutate original claims without history, and do not accept model geometry as independent evidence for historical dimensions.
