"use client";

import { useMemo, useState } from "react";
import type { Locale, MosqueRecord } from "@/lib/types";
import { EmptyModel } from "@/components/EmptyModel";

const copyByLocale = {
  en: { kicker: "ARCHITECTURAL COMPARISON LABORATORY", title: "Read buildings against one another", intro: "Select two or three documented records. Dates, evidence and uncertainty remain visible; missing models never block factual comparison.", choose: "Choose records", selected: "selected", add: "Add to comparison", remove: "Remove", max: "Maximum three records", need: "Select at least two records to begin.", facts: "Evidence-linked facts", foundation: "Foundation", structure: "Present structure", tradition: "Traditions", layout: "Typologies", materials: "Materials", elements: "Architectural elements", heritage: "Heritage relationship", models: "3D comparison", sync: "Synchronized rotation", scale: "True-scale comparison", unavailable: "Unavailable", scaleNote: "True scale is disabled until every selected record has a reviewed model with verified scale.", sourceCount: "linked claims" },
  fr: { kicker: "LABORATOIRE DE COMPARAISON ARCHITECTURALE", title: "Lire les édifices en regard", intro: "Sélectionnez deux ou trois notices documentées. Dates, preuves et incertitudes restent visibles ; l’absence de modèles ne bloque jamais la comparaison factuelle.", choose: "Choisir les notices", selected: "sélectionnées", add: "Ajouter", remove: "Retirer", max: "Trois notices maximum", need: "Sélectionnez au moins deux notices.", facts: "Faits liés aux preuves", foundation: "Fondation", structure: "Structure actuelle", tradition: "Traditions", layout: "Typologies", materials: "Matériaux", elements: "Éléments architecturaux", heritage: "Relation patrimoniale", models: "Comparaison 3D", sync: "Rotation synchronisée", scale: "Comparaison à l’échelle", unavailable: "Indisponible", scaleNote: "L’échelle réelle reste désactivée tant que chaque notice ne possède pas un modèle contrôlé à l’échelle vérifiée.", sourceCount: "affirmations liées" },
  ar: { kicker: "مختبر المقارنة المعمارية", title: "قراءة المباني بالمقارنة", intro: "اختر بطاقتين أو ثلاثاً. تبقى التواريخ والأدلة ودرجات اليقين ظاهرة، ولا يمنع غياب النماذج المقارنة المعرفية.", choose: "اختر البطاقات", selected: "مختارة", add: "أضف للمقارنة", remove: "إزالة", max: "ثلاث بطاقات كحد أقصى", need: "اختر بطاقتين على الأقل للبدء.", facts: "حقائق مرتبطة بالأدلة", foundation: "التأسيس", structure: "البنية الحالية", tradition: "التقاليد", layout: "الأنماط", materials: "المواد", elements: "العناصر المعمارية", heritage: "العلاقة التراثية", models: "المقارنة ثلاثية الأبعاد", sync: "تدوير متزامن", scale: "مقارنة بالمقياس الحقيقي", unavailable: "غير متاح", scaleNote: "تظل المقارنة بالمقياس الحقيقي معطلة حتى يتوفر لكل بطاقة نموذج مراجع وموثق المقياس.", sourceCount: "ادعاءات مرتبطة" },
};

export function ComparisonLab({ records, locale }: { records: MosqueRecord[]; locale: Locale }) {
  const copy = copyByLocale[locale];
  const [selected, setSelected] = useState<string[]>(records.slice(0, 2).map((r) => r.id));
  const chosen = useMemo(() => selected.map((id) => records.find((r) => r.id === id)!).filter(Boolean), [selected, records]);
  function toggle(id: string) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current); }
  const rows = [
    [copy.foundation, (r: MosqueRecord) => r.chronology.foundation.display],
    [copy.structure, (r: MosqueRecord) => r.chronology.present_structure.display],
    [copy.tradition, (r: MosqueRecord) => r.architectural_profile.traditions.join(", ") || "—"],
    [copy.layout, (r: MosqueRecord) => r.architectural_profile.typologies.join(", ") || "—"],
    [copy.materials, (r: MosqueRecord) => r.architectural_profile.materials.join(", ") || "—"],
    [copy.elements, (r: MosqueRecord) => r.architectural_profile.elements.join(", ") || "—"],
    [copy.heritage, (r: MosqueRecord) => `${r.heritage.relationship.replaceAll("_", " ")}${r.heritage.designation_name ? ` · ${r.heritage.designation_name}` : ""}`],
  ] as const;
  return <main>
    <section className="page-hero comparison-hero"><div className="hero-kicker">{copy.kicker}</div><h1>{copy.title}</h1><p>{copy.intro}</p></section>
    <section className="content-wide comparison-workspace">
      <div className="selection-rail"><div className="section-heading"><div><span className="eyebrow">01 · {copy.choose}</span><h2>{selected.length} {copy.selected}</h2></div><span>{copy.max}</span></div><div className="selection-list">{records.map((record) => { const on = selected.includes(record.id); return <button key={record.id} onClick={() => toggle(record.id)} className={on ? "selected" : ""} aria-pressed={on}><span className="selection-number">{on ? selected.indexOf(record.id) + 1 : "+"}</span><span><strong>{record.names[locale]}</strong><small>{record.location.city} · {record.chronology.foundation.display}</small></span><span>{on ? copy.remove : copy.add}</span></button>; })}</div></div>
      {chosen.length < 2 ? <div className="empty-result">{copy.need}</div> : <>
        <section className="comparison-section"><div className="section-heading"><div><span className="eyebrow">02</span><h2>{copy.facts}</h2></div></div><div className={`comparison-table columns-${chosen.length}`}><div className="comparison-head"><span />{chosen.map((record) => <div key={record.id}><span dir="ltr">{record.id}</span><strong>{record.names[locale]}</strong><small>{record.location.city}, {record.location.country}</small></div>)}</div>{rows.map(([label, getValue]) => <div className="comparison-row" key={label}><h3>{label}</h3>{chosen.map((record) => <div key={record.id}>{getValue(record)}</div>)}</div>)}<div className="comparison-row evidence-row"><h3>{copy.sourceCount}</h3>{chosen.map((record) => <div key={record.id}><strong>{record.claims.length}</strong><span>{record.source_ids.length} {record.source_ids.length === 1 ? "source" : "sources"}</span></div>)}</div></div></section>
        <section className="comparison-section"><div className="section-heading"><div><span className="eyebrow">03</span><h2>{copy.models}</h2></div><div className="disabled-controls"><label><input type="checkbox" disabled /> {copy.sync}</label><label><input type="checkbox" disabled /> {copy.scale}</label></div></div><div className={`model-compare columns-${chosen.length}`}>{chosen.map((record) => <div key={record.id}><EmptyModel locale={locale} compact /><strong>{record.names[locale]}</strong></div>)}</div><p className="scale-note">{copy.scaleNote}</p></section>
      </>}
    </section>
  </main>;
}
