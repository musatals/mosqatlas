"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale, MosqueRecord } from "@/lib/types";

const labels = {
  en: { kicker: "GEOGRAPHIC INDEX", title: "A world map that admits what it does not know", intro: "The pilot identifies cities and countries, but supplies no verified coordinates. We therefore show a country-level explorer without invented map pins.", note: "Precise map markers are withheld until coordinates are documented.", all: "All regions", records: "documented records", location: "Documented location", coordinates: "Coordinates pending verification", open: "Open record" },
  fr: { kicker: "INDEX GÉOGRAPHIQUE", title: "Une carte qui reconnaît ses limites", intro: "Le pilote identifie villes et pays, mais ne fournit aucune coordonnée vérifiée. Nous proposons donc une exploration par pays, sans marqueurs inventés.", note: "Les marqueurs précis sont suspendus jusqu’à la vérification des coordonnées.", all: "Toutes les régions", records: "notices documentées", location: "Localisation documentée", coordinates: "Coordonnées en attente", open: "Ouvrir la notice" },
  ar: { kicker: "الفهرس الجغرافي", title: "خريطة تصرّح بحدود معرفتها", intro: "يحدد الإصدار التجريبي المدن والدول من دون إحداثيات موثقة، لذلك يقدّم استكشافاً حسب الدولة بلا علامات مختلقة.", note: "لن توضع علامات دقيقة قبل توثيق الإحداثيات.", all: "كل المناطق", records: "بطاقات موثقة", location: "الموقع الموثق", coordinates: "الإحداثيات بانتظار التحقق", open: "افتح البطاقة" },
};
const regionByCountry: Record<string, string> = { Tunisia: "Africa", Mali: "Africa", Egypt: "Africa", Spain: "Europe", Iran: "Asia", Singapore: "Asia" };

export function GeographicExplorer({ records, locale }: { records: MosqueRecord[]; locale: Locale }) {
  const copy = labels[locale];
  const [region, setRegion] = useState("All");
  const visible = region === "All" ? records : records.filter((record) => regionByCountry[record.location.country] === region);
  return <main><section className="page-hero map-hero"><div className="hero-kicker">{copy.kicker}</div><h1>{copy.title}</h1><p>{copy.intro}</p></section><section className="content-wide map-layout"><div className="atlas-map" role="img" aria-label={copy.note}><svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M102 103 180 72l85 25 45 67-45 39-63-13-39 38-76-41-30-57 45-27Zm195 140 87-18 59 47-13 93-50 72-61-26-20-78-44-38 42-52Zm227-116 64-44 92 7 62 41 96-13 86 56-30 45-68-4-44 43-79-23-59 21-43-40-79 1-43-40 25-50Zm180 155 70-25 78 34 34 57-38 43-77-14-45-43-22-52Z"/><path className="map-grid" d="M0 115h1000M0 230h1000M0 345h1000M200 0v460M400 0v460M600 0v460M800 0v460"/></svg><div className="map-callout"><span>0</span><p>{copy.note}</p></div></div><div className="map-sidebar"><div className="segmented vertical"><button className={region === "All" ? "active" : ""} onClick={() => setRegion("All")}>{copy.all}</button>{["Africa", "Asia", "Europe"].map((item) => <button key={item} className={region === item ? "active" : ""} onClick={() => setRegion(item)}>{item} · {records.filter((r) => regionByCountry[r.location.country] === item).length}</button>)}</div><div className="map-count"><strong>{visible.length}</strong><span>{copy.records}</span></div></div><div className="location-grid">{visible.map((record) => <article key={record.id}><div className="location-code">{record.location.country_iso2}</div><div><span className="eyebrow">{copy.location}</span><h2>{record.names[locale]}</h2><p>{record.location.city}, {record.location.country}</p><small>{copy.coordinates}</small></div><Link href={`/${locale}/mosques/${record.slug}`} aria-label={copy.open}>↗</Link></article>)}</div></section></main>;
}
