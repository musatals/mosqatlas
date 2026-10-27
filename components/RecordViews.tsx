"use client";

import { useState } from "react";
import type { Locale, MosqueRecord, Source } from "@/lib/types";
import { t } from "@/lib/i18n";
import { EmptyModel } from "@/components/EmptyModel";

export function RecordViews({ record, recordSources, locale }: { record: MosqueRecord; recordSources: Source[]; locale: Locale }) {
  const copy = t(locale);
  const [view, setView] = useState<"visitor" | "research">("visitor");
  const content = record.content[locale];
  return <>
    <div className="view-switch-wrap"><div className="segmented view-switch"><button className={view === "visitor" ? "active" : ""} onClick={() => setView("visitor")}>{copy.visitor}</button><button className={view === "research" ? "active" : ""} onClick={() => setView("research")}>{copy.research}</button></div><p>{copy.limited}</p></div>
    {view === "visitor" ? <div className="record-layout visitor-layout">
      <div className="record-prose"><section><span className="section-number">01</span><div><h2>{copy.history}</h2><p className="lead-copy">{content.intro}</p><p>{content.history}</p></div></section><section><span className="section-number">02</span><div><h2>{copy.architecture}</h2><p>{content.architecture}</p><div className="tag-list">{[...record.architectural_profile.traditions, ...record.architectural_profile.typologies, ...record.architectural_profile.materials, ...record.architectural_profile.elements].map((item) => <span key={item}>{item}</span>)}</div></div></section></div>
      <aside><EmptyModel locale={locale}/><div className="fact-panel"><h3>{copy.heritage}</h3><strong>{record.heritage.relationship.replaceAll("_", " ")}</strong><p>{record.heritage.context_note || copy.unknown}</p></div></aside>
    </div> : <div className="research-layout">
      {locale !== "en" && <div className="translation-notice">{copy.fallback}</div>}
      <section className="research-section"><div className="section-heading"><div><span className="eyebrow">01</span><h2>{copy.phases}</h2></div></div><div className="phase-list">{record.chronology.phases.map((phase) => <article key={phase.id}><div className="phase-date" dir="ltr">{phase.display_date}</div><div><span className={`certainty ${phase.certainty}`}>{phase.event_type.replaceAll("_", " ")} · {phase.certainty}</span><p>{phase.description_en}</p><div className="source-chips">{phase.source_ids.map((id) => <span key={id} dir="ltr">{id}</span>)}</div></div></article>)}</div></section>
      <section className="research-section"><div className="section-heading"><div><span className="eyebrow">02</span><h2>{copy.evidence}</h2></div><span>{record.claims.length} claims</span></div><div className="claim-list">{record.claims.map((claim) => <article key={claim.id}><div><code>{claim.id}</code><span className={`certainty ${claim.certainty}`}>{claim.certainty}</span></div><p>{claim.statement_en}</p><div className="source-chips">{claim.source_ids.map((id) => <span key={id} dir="ltr">{id}</span>)}</div></article>)}</div></section>
      <section className="research-section source-register"><div className="section-heading"><div><span className="eyebrow">03</span><h2>{copy.sourcesLabel}</h2></div></div>{recordSources.map((source) => <article key={source.id}><code dir="ltr">{source.id}</code><div><h3>{source.institution}</h3><p>{source.title}</p></div><a href={source.url} target="_blank" rel="noreferrer">↗</a></article>)}</section>
      <section className="research-section limit-grid"><div><span className="eyebrow">04</span><h2>{copy.limitations}</h2></div><ul><li>{copy.emptyMedia}</li><li>{copy.emptyModel}</li><li>No verified architectural dimensions are published.</li><li>Scholarly peer review and French/Arabic copyediting remain pending.</li></ul></section>
    </div>}
  </>;
}
