"use client";

import { useMemo, useState } from "react";
import type { Locale, Term } from "@/lib/types";

const labels = {
  en: { kicker: "ARCHITECTURAL LANGUAGE", title: "A shared vocabulary across three scripts", intro: "Forty-two stable concept IDs align English, French and Arabic terminology. Native-language editorial review is still pending.", search: "Search the glossary", pending: "Editorial harmonization · native review pending", terms: "terms" },
  fr: { kicker: "LANGAGE ARCHITECTURAL", title: "Un vocabulaire commun en trois écritures", intro: "Quarante-deux identifiants stables alignent les termes anglais, français et arabes. La révision par des linguistes reste en attente.", search: "Rechercher dans le glossaire", pending: "Harmonisation éditoriale · révision native en attente", terms: "termes" },
  ar: { kicker: "لغة العمارة", title: "معجم مشترك بثلاثة أنظمة كتابة", intro: "تربط اثنتان وأربعون هوية ثابتة المصطلحات الإنجليزية والفرنسية والعربية، مع بقاء المراجعة اللغوية المتخصصة معلقة.", search: "ابحث في المصطلحات", pending: "مواءمة تحريرية · المراجعة اللغوية معلقة", terms: "مصطلحاً" },
};

export function GlossaryExplorer({ terms, locale }: { terms: Term[]; locale: Locale }) {
  const copy = labels[locale];
  const [query, setQuery] = useState("");
  const visible = useMemo(() => terms.filter((term) => `${term.en} ${term.fr} ${term.ar} ${term.definition_en}`.toLowerCase().includes(query.toLowerCase())), [terms, query]);
  return <main><section className="page-hero glossary-hero"><div className="hero-kicker">{copy.kicker}</div><h1>{copy.title}</h1><p>{copy.intro}</p></section><section className="content-wide glossary-layout"><div className="glossary-tools"><label className="search-field"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.search}/><span>⌕</span></label><div className="result-count">{visible.length} {copy.terms}</div></div><div className="glossary-list">{visible.map((term, index) => <article key={term.term_id}><div className="term-index" dir="ltr">{String(index + 1).padStart(2, "0")}</div><div className="term-main"><h2>{term[locale]}</h2><code>{term.term_id}</code><p>{term.definition_en}</p></div><div className="term-languages"><span lang="en">{term.en}</span><span lang="fr">{term.fr}</span><span lang="ar" dir="rtl">{term.ar}</span></div><small>{copy.pending}</small></article>)}</div></section></main>;
}
