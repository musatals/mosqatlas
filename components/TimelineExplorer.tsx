"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale, MosqueRecord } from "@/lib/types";

const labels = {
  en: { kicker: "LAYERED TIME", title: "One monument, many beginnings", intro: "Foundation, extension, reconstruction and change of use are different events. This chronology keeps them separate.", all: "All phases", foundations: "Foundations", reconstructions: "Reconstruction & extension", unresolved: "Unresolved foundations", note: "Qualitative or traditional dates remain outside the numeric axis.", read: "Open record" },
  fr: { kicker: "STRATES DU TEMPS", title: "Un monument, plusieurs commencements", intro: "Fondation, agrandissement, reconstruction et changement d’usage sont des événements distincts. Cette chronologie les sépare.", all: "Toutes les phases", foundations: "Fondations", reconstructions: "Reconstructions et extensions", unresolved: "Fondations non résolues", note: "Les dates qualitatives ou traditionnelles restent hors de l’axe numérique.", read: "Ouvrir la notice" },
  ar: { kicker: "طبقات الزمن", title: "للمعلم الواحد بدايات متعددة", intro: "التأسيس والتوسعة وإعادة البناء وتغيير الاستعمال أحداث مختلفة، ويعرضها هذا الخط الزمني منفصلة.", all: "كل المراحل", foundations: "التأسيس", reconstructions: "إعادة البناء والتوسعة", unresolved: "تواريخ تأسيس غير محسومة", note: "تبقى التواريخ الوصفية أو التقليدية خارج المحور الرقمي.", read: "افتح البطاقة" },
};

export function TimelineExplorer({ records, locale }: { records: MosqueRecord[]; locale: Locale }) {
  const copy = labels[locale];
  const [filter, setFilter] = useState<"all" | "foundation" | "building">("all");
  const events = records.flatMap((record) => record.chronology.phases.map((phase) => ({ record, phase }))).filter(({ phase }) => phase.start_year !== null).filter(({ phase }) => filter === "all" || (filter === "foundation" ? ["foundation", "initial_construction", "early_foundation"].includes(phase.event_type) : ["reconstruction", "extension", "modification"].includes(phase.event_type))).sort((a, b) => (a.phase.start_year ?? 9999) - (b.phase.start_year ?? 9999));
  const unresolved = records.filter((record) => record.chronology.foundation.sort_year === null);
  return <main><section className="page-hero timeline-hero"><div className="hero-kicker">{copy.kicker}</div><h1>{copy.title}</h1><p>{copy.intro}</p></section><section className="content-wide timeline-layout"><div className="timeline-filters segmented"><button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>{copy.all}</button><button onClick={() => setFilter("foundation")} className={filter === "foundation" ? "active" : ""}>{copy.foundations}</button><button onClick={() => setFilter("building")} className={filter === "building" ? "active" : ""}>{copy.reconstructions}</button></div><div className="timeline-axis">{events.map(({ record, phase }, index) => <article key={`${record.id}-${phase.id}`} className="timeline-event"><div className="timeline-year" dir="ltr">{phase.display_date}</div><div className="timeline-node"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="timeline-copy"><span className={`certainty ${phase.certainty}`}>{phase.event_type.replaceAll("_", " ")} · {phase.certainty}</span><h2>{record.names[locale]}</h2><p>{phase.description_en}</p><Link href={`/${locale}/mosques/${record.slug}`}>{copy.read} →</Link></div></article>)}</div><aside className="unresolved-panel"><span className="eyebrow">{copy.unresolved}</span><h2>{unresolved.length}</h2><p>{copy.note}</p>{unresolved.map((record) => <div key={record.id}><strong>{record.names[locale]}</strong><span>{record.chronology.foundation.display}</span></div>)}</aside></section></main>;
}
