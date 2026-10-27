# MOSQUE ATLAS 3D — Codex Research Handoff v1.0.0

**Prepared:** 2026-10-27  
**Scope:** Source-verified pilot research content and structured implementation contract; not a built website.  
**Languages:** English `en`, French `fr`, Arabic `ar` (Arabic interface must use RTL direction). Native monument names are preserved separately in their original language.

## What is actually approved?

Six records have completed **editorial verification of a limited set of source-backed historical and architectural claims**, suitable for a restricted pilot publication. No record has passed independent scholarly peer review, specialist architectural-plan verification, image-license clearance, 3D-model review, or final Arabic/French linguistic proofreading. Consequently, **none is approved as a complete academic dossier**, and none should carry a `scholarly_approved` label. In the UI, use *Documented core record / Notice documentaire vérifiée / بطاقة موثقة المعلومات الأساسية*, not *Peer-reviewed*.

This distinction applies to the two new records outside the existing 100 candidate inventory: `MOS-0101` (Great Mosque of Djenné) and `MOS-0102` (Mosque of Amr ibn al-As). The original inventory remains at 100 candidates; the working register may therefore total 102 distinct entries without implying 102 verified dossiers.

## Package contents

- `data/pilot_verified_core_6.json` — the 6 verified-core records with multilingual narratives, chronological phases, 24 evidence-linked claims, heritage relationships, image/model empty states.
- `data/sources.json` — 10 consulted institutional/scholarly web sources with permanent IDs.
- `data/terminology_en_fr_ar.json` and `.csv` — 42 harmonized interface and architectural terms (editorially normalized; native-language copyedit pending).
- `data/legacy_provisional_100.json` — exactly the earlier 100 source-data records preserved unchanged, **NOT** publication-ready, and not conforming to the new strict verified-core schema.
- `data/catalog_index_102.json` — separate ledger for the 100 provisional entries and two new noncolliding IDs.
- `schema/mosque-record.v1.schema.json` — JSON Schema Draft 2020-12, normative for verified record validation.
- `schema/contracts.ts` — TypeScript developer types mirroring the JSON contract.
- `schema/relational_postgres.sql` — normalized SQL example; not executed against any database.
- `validation/validate.py` — schema and cross-reference checks using Python `jsonschema`.
- `docs/CODEX_HANDOFF_PROMPT.md` — developer task specification and acceptance conditions.
- `docs/EDITORIAL_RELEASE_POLICY.md` — rules for dates, citations, provenance, UNESCO, RTL, 3D and publication scope.
- `docs/RESEARCH_DECISIONS.md` — known contradictions and unresolved tasks.

## Quick validation

```bash
python -m pip install jsonschema
python validation/validate.py
```

Expected result: six core records, 24 source-linked claims, ten sources, 42 trilingual terms, original 100 candidates, and two additional noncolliding IDs. This validation is structural and referential, not a substitute for academic review.

## Historical dating (important)

- Foundation and surviving building must have independent dates, **event types** and sources.
- Unknown or traditionally attributed foundation dates must have `sort_year: null`.
- Sorting by foundation date may use only a verified actual mosque foundation; **not** date of city foundation, building completion, earliest archaeological occupation, or an unrelated monument.
- For `multi_period` structures, the card must say *Multi-period structure*, not invent a single construction year.
- Sultan Mosque: the National Museum of Singapore gives 1928 and the National Library Board gives 1932 for completion; show a range and an evidence note. Do not silently choose one.
- UNESCO designations are relational. A mosque inside a World Heritage city or serial property must not be labeled a separate UNESCO inscription.
- The Córdoba monument was inscribed as a mosque in 1984; the World Heritage property was extended and renamed in 1994.

## Publishing and asset rules

- `media=[]`, `model_3d=null` are intentional and must produce honest empty states.
- The future 3D viewer allows orbit, zoom, pan, orthographic camera presets, side-by-side comparisons of 2 or 3 models, and optional synced rotation. **No VR/WebXR, first-person navigation, or artificial models.**
- Only real admin-uploaded models in GLB/glTF are eligible; show source, represented historical phase, license, scale verification and accuracy class.
- Images returned by a search engine are not licensed for reuse merely because they are visible. Attribution and license review are required before storing assets.
- All significant descriptions must be mapped to claim IDs and original institutional source links. A source hyperlink is not an image license.

## Implementation boundary

The handoff is deliberately framework-neutral. Codex may use a React/Next.js app and PostgreSQL, but data format, stable IDs, multilingual conventions and scholarly editorial constraints must survive a change of technology.

No live deployment, domain update or code repository mutation occurred during this research handoff.
