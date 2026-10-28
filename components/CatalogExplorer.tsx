"use client";

import { useMemo, useState } from "react";
import type { Candidate, Locale, MosqueRecord } from "@/lib/types";
import { MosqueCard } from "@/components/MosqueCard";

const labels = {
  en: { title: "Atlas catalog", intro: "Six source-documented pilot records are published separately from the research queue.", search: "Search by mosque, city or country", foundation: "Foundation chronology", structure: "Present-structure chronology", country: "Country", core: "Documented core", queue: "Research candidates", queueNote: "These 96 entries are preserved for investigation. Their dates and sources are not validated for publication.", noResult: "No records match this search.", incomplete: "Source reconciliation required", record: "record", records: "records", sort: "Sort documented records", clear: "Clear search", showing: "Showing" },
  fr: { title: "Catalogue de l’atlas", intro: "Six notices pilotes documentées sont publiées séparément de la file de recherche.", search: "Rechercher par mosquée, ville ou pays", foundation: "Chronologie de fondation", structure: "Chronologie de la structure actuelle", country: "Pays", core: "Noyau documenté", queue: "Candidats de recherche", queueNote: "Ces 96 entrées sont conservées pour étude. Leurs dates et sources ne sont pas validées pour publication.", noResult: "Aucune notice ne correspond.", incomplete: "Réconciliation des sources requise", record: "notice", records: "notices", sort: "Trier les notices documentées", clear: "Effacer la recherche", showing: "Affichage de" },
  ar: { title: "فهرس الأطلس", intro: "تُنشر ست بطاقات تجريبية موثقة منفصلة عن قائمة البحث.", search: "ابحث باسم المسجد أو المدينة أو الدولة", foundation: "ترتيب تاريخ التأسيس", structure: "ترتيب البنية الحالية", country: "الدولة", core: "السجل الموثق", queue: "مرشحو البحث", queueNote: "حُفظت هذه السجلات الـ96 للبحث، ولم تُعتمد تواريخها ومصادرها للنشر.", noResult: "لا توجد نتائج مطابقة.", incomplete: "يلزم التحقق من المصادر", record: "سجل", records: "سجلات", sort: "رتب السجلات الموثقة", clear: "امسح البحث", showing: "المعروض" },
};

export function CatalogExplorer({ records, candidates, locale }: { records: MosqueRecord[]; candidates: Candidate[]; locale: Locale }) {
  const copy = labels[locale];
  const [mode, setMode] = useState<"core" | "queue">("core");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"foundation" | "structure" | "country">("foundation");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return records.filter((r) => `${r.names.en} ${r.names.fr} ${r.names.ar} ${r.location.city} ${r.location.country}`.toLocaleLowerCase(locale).includes(needle)).sort((a, b) => {
      if (sort === "country") return a.location.country.localeCompare(b.location.country);
      const key = sort === "foundation" ? "foundation" : "present_structure";
      const ay = a.chronology[key].sort_year;
      const by = b.chronology[key].sort_year;
      if (ay === null) return by === null ? a.id.localeCompare(b.id) : 1;
      if (by === null) return -1;
      return ay - by;
    });
  }, [records, query, sort, locale]);
  const candidateFiltered = candidates.filter((c) => `${c.name_en} ${c.city} ${c.country}`.toLowerCase().includes(query.toLowerCase()));

  return <main>
    <section className="page-hero compact-hero"><div className="hero-kicker">CATALOG · 102 RECORDS</div><h1>{copy.title}</h1><p>{copy.intro}</p></section>
    <section className="catalog-controls content-wide" aria-label={copy.title}>
      <div className="segmented catalog-tabs" role="tablist" aria-label={copy.title}><button type="button" role="tab" aria-selected={mode === "core"} aria-controls="catalog-results" className={mode === "core" ? "active" : ""} onClick={() => setMode("core")}>{copy.core} <span>6</span></button><button type="button" role="tab" aria-selected={mode === "queue"} aria-controls="catalog-results" className={mode === "queue" ? "active" : ""} onClick={() => setMode("queue")}>{copy.queue} <span>96</span></button></div>
      <div className="catalog-fields">
        <label className="search-field"><span className="sr-only">{copy.search}</span><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.search} />{query && <button type="button" className="clear-search" onClick={() => setQuery("")} aria-label={copy.clear}>×</button>}</label>
        {mode === "core" && <label className="sort-field"><span>{copy.sort}</span><select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}><option value="foundation">{copy.foundation}</option><option value="structure">{copy.structure}</option><option value="country">{copy.country}</option></select></label>}
      </div>
    </section>
    {mode === "core" ? <section id="catalog-results" role="tabpanel" className="content-wide"><div className="result-count" aria-live="polite">{copy.showing} {filtered.length} {filtered.length === 1 ? copy.record : copy.records}</div>{filtered.length ? <div className="card-grid">{filtered.map((record, index) => <MosqueCard key={record.id} record={record} locale={locale} index={index} />)}</div> : <p className="empty-result">{copy.noResult}</p>}</section> : <section id="catalog-results" role="tabpanel" className="content-wide candidate-section"><div className="result-count" aria-live="polite">{copy.showing} {candidateFiltered.length} {candidateFiltered.length === 1 ? copy.record : copy.records}</div><div className="notice-panel"><strong>{copy.queue}</strong><p>{copy.queueNote}</p></div>{candidateFiltered.length ? <div className="candidate-list">{candidateFiltered.map((item) => <article key={item.mosque_id}><span className="candidate-id" dir="ltr">{item.mosque_id}</span><div><h3>{item.name_en}</h3><p>{item.city}, {item.country}</p></div><span className="candidate-status">{copy.incomplete}</span></article>)}</div> : <p className="empty-result">{copy.noResult}</p>}</section>}
  </main>;
}
