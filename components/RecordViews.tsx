"use client";

import { useState } from "react";
import type { EnrichedProfile, Locale, MosqueRecord, Source } from "@/lib/types";
import { t } from "@/lib/i18n";
import { EmptyModel } from "@/components/EmptyModel";

export function RecordViews({ record, enrichedProfile, recordSources, locale }: { record: MosqueRecord; enrichedProfile: EnrichedProfile; recordSources: Source[]; locale: Locale }) {
  const copy = t(locale);
  const [view, setView] = useState<"visitor" | "research">("visitor");
  const visitorSections = enrichedProfile.sections.filter((section) => section.visibility === "visitor_and_research");
  const sourcesById = new Map(recordSources.map((source) => [source.id, source]));
  const sourceLinks = (ids: string[]) => <div className="profile-sources" aria-label={copy.sourcesLabel}>{ids.map((id) => {
    const source = sourcesById.get(id);
    return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer" title={`${source.institution}: ${source.title}`}><span dir="ltr">{id}</span><span aria-hidden="true">↗</span></a> : null;
  })}</div>;
  return <>
    <div className="view-switch-wrap"><div className="segmented view-switch" role="tablist"><button type="button" role="tab" aria-selected={view === "visitor"} aria-controls="record-view" className={view === "visitor" ? "active" : ""} onClick={() => setView("visitor")}>{copy.visitor}</button><button type="button" role="tab" aria-selected={view === "research"} aria-controls="record-view" className={view === "research" ? "active" : ""} onClick={() => setView("research")}>{copy.research}</button></div><p>{copy.limited}</p></div>
    {view === "visitor" ? <div id="record-view" role="tabpanel" className="record-layout visitor-layout">
      <div className="record-prose">{visitorSections.map((section, index) => <section key={section.id}><span className="section-number">{String(index + 1).padStart(2, "0")}</span><div><h2>{section.content[locale].title}</h2><p className={index === 0 ? "lead-copy" : undefined}>{section.content[locale].body}</p>{sourceLinks(section.source_ids)}{index === 1 && <div className="tag-list">{[...record.architectural_profile.traditions, ...record.architectural_profile.typologies, ...record.architectural_profile.materials, ...record.architectural_profile.elements].map((item, tagIndex) => <span key={`${item}-${tagIndex}`}>{item}</span>)}</div>}</div></section>)}</div>
      <aside><EmptyModel locale={locale}/><div className="fact-panel"><h3>{copy.heritage}</h3><strong>{record.heritage.designation_name || copy.unknown}</strong><p>{visitorSections[2].content[locale].title}{record.heritage.inscription_year ? ` · ${record.heritage.inscription_year}` : ""}</p></div></aside>
    </div> : <div id="record-view" role="tabpanel" className="research-layout">
      {locale !== "en" && <div className="translation-notice">{copy.fallback}</div>}
      <section className="research-section enriched-profile"><div className="section-heading"><div><span className="eyebrow">01</span><h2>{copy.profile}</h2></div><p>{copy.profileIntro}</p></div><div className="enriched-profile-grid">{enrichedProfile.sections.map((section, index) => <article key={section.id} className={section.visibility === "research_only" ? "research-note" : undefined}><div className="enriched-profile-meta"><code>{String(index + 1).padStart(2, "0")}</code>{section.visibility === "research_only" && <span>{copy.researchNote}</span>}</div><h3>{section.content[locale].title}</h3><p>{section.content[locale].body}</p>{sourceLinks(section.source_ids)}</article>)}</div></section>
      <section className="research-section"><div className="section-heading"><div><span className="eyebrow">02</span><h2>{copy.phases}</h2></div></div><div className="phase-list">{record.chronology.phases.map((phase) => <article key={phase.id}><div className="phase-date" dir="ltr">{phase.display_date}</div><div><span className={`certainty ${phase.certainty}`}>{phase.event_type.replaceAll("_", " ")} · {phase.certainty}</span><p>{phase.description_en}</p><div className="source-chips">{phase.source_ids.map((id) => <span key={id} dir="ltr">{id}</span>)}</div></div></article>)}</div></section>
      <section className="research-section"><div className="section-heading"><div><span className="eyebrow">03</span><h2>{copy.evidence}</h2></div><span>{record.claims.length} {copy.claims}</span></div><div className="claim-list">{record.claims.map((claim) => <article key={claim.id}><div><code>{claim.id}</code><span className={`certainty ${claim.certainty}`}>{claim.certainty}</span></div><p>{claim.statement_en}</p><div className="source-chips">{claim.source_ids.map((id) => <span key={id} dir="ltr">{id}</span>)}</div></article>)}</div></section>
      <section className="research-section source-register"><div className="section-heading"><div><span className="eyebrow">04</span><h2>{copy.sourcesLabel}</h2></div></div>{recordSources.map((source) => <article key={source.id}><code dir="ltr">{source.id}</code><div><h3>{source.institution}</h3><p>{source.title}</p></div><a href={source.url} target="_blank" rel="noreferrer">↗</a></article>)}</section>
      <section className="research-section limit-grid"><div><span className="eyebrow">05</span><h2>{copy.limitations}</h2></div><ul><li>{copy.emptyMedia}</li><li>{copy.emptyModel}</li><li>No verified architectural dimensions are published.</li><li>Scholarly peer review and French/Arabic copyediting remain pending.</li></ul></section>
    </div>}
  </>;
}
