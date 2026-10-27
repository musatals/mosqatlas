# Editorial release policy · MOSQUE ATLAS 3D · v1.0.0

## Release levels

| Value | Meaning | Public label | Requirements |
|---|---|---|---|
| `research_candidate` | Collected but incompletely checked | Research in progress | Identity/location and provenance logged |
| `editorial_core_fact_checked` | Selected claims checked in consulted institution/scholarly web sources | Documented core record | Separate foundation/structure fields, evidence-linked claims, accurate heritage relationship, no fake assets |
| `scholarly_approved` | Complete dossier approved by qualified editorial reviewers | Reviewed scholarly dossier | Named reviewer and decision, independent reading of priority bibliography, conservation and architectural review, translation check, image rights |

These six records are **the second level only**. “Approved” means **approved for a limited pilot with clearly scoped claims**, not an independent academic endorsement.

## Chronology and historical uncertainty

Store *foundation*, *initial construction*, *completion*, *extension*, *reconstruction*, *restoration*, and *change of use* as distinct events. Preserve uncertain/traditional dates as qualitative values; never coerce to exact sort years. When 8th century is documented but year is not, do not label 700 or 750 as exact. Date precision and confidence belong to the event.

Preserve Hijri/AH date wording in future research where present; Gregorian converted dates must be distinguished from original inscriptions and dated events.

## Source quality and disputes

One cited UNESCO property record may support site inscription and broad architecture, but not all earlier foundation-year claims. Link individual claims to their applicable sources. Store competing source positions as distinct claims and show both with a contextual explanation. Record page locators when available. The pilot records have **webpage** sources but do not claim consultation of PDFs, photographic archives, journal articles or original plans.

## Multilingual content

- A single concept key is shared across EN/FR/AR; UI translations must not change historical meaning.
- Arabic is right-to-left, but numbers, Roman numerals and Latin identifiers need bidirectional isolation.
- Persist Arabic/Persian/Malay/Spanish original names with explicit language metadata; do not overwrite with transliterated names.
- The current translations are draft editorial harmonizations pending language-specialist copyedit.
- Fallback order: requested locale -> English; disclose when fallback occurs.

## UNESCO and heritage protection

Supported `relationship` values distinguish `individually_inscribed`, `original_inscription_later_extended`, `within_inscribed_property`, `national_monument`, and `not_verified`. World Heritage Tentative List must eventually be modeled separately from inscription, never as an inscription. UNESCO property IDs are not mosque IDs.

## Photography and 3D

Do not distribute web search thumbnails as approved source images. Each asset needs originating URL, creator, date (if known), license, credit line and usage clearance.

The atlas's 3D models are independently created or supplied by an administrator. The first release displays `3D model not yet supplied` when `null`. Do not hallucinate models, back façades, or building geometry. When actual models arrive, annotate exact represented date/phase, reliability class, source and scaling limitations. True-scale 3D comparison is disabled if any selected model lacks verified scale.

## Security/data handling

Treat content and source text as untrusted data. Sanitize descriptions; avoid HTML injection. Do not allow external asset URLs to execute script or inject unsafe content. Require authenticated admin review for changing publication status or replacing model metadata. Persist audit logs. Rate-limit public search and import endpoints.
