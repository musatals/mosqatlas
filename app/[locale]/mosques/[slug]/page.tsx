import { notFound } from "next/navigation";
import Link from "next/link";
import { coreRecords, getRecord, getSources } from "@/lib/data";
import { isLocale, t } from "@/lib/i18n";
import { RecordViews } from "@/components/RecordViews";
import { ArrowIcon } from "@/components/Icons";

export function generateStaticParams() { return coreRecords.flatMap((record) => ["en", "fr", "ar"].map((locale) => ({ locale, slug: record.slug }))); }

export default async function MosquePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const record = getRecord(slug);
  if (!record) notFound();
  const copy = t(locale);
  return <main><section className="record-hero"><div className="record-breadcrumb"><Link href={`/${locale}/catalog`}>{copy.nav.atlas}</Link><span>/</span><span dir="ltr">{record.id}</span></div><div className="record-hero-grid"><div><div className="eyebrow"><span className="status-dot"/>{copy.documented}</div><h1>{record.names[locale]}</h1><p className="record-original" lang={record.names.original.language}>{record.names.original.value}</p><p className="record-intro">{record.content[locale].intro}</p><div className="record-place">{record.location.city}<span/> {record.location.country}</div></div><div className="record-date-block"><div><span>{copy.founded}</span><strong dir="auto">{record.chronology.foundation.display}</strong><small>{record.chronology.foundation.certainty}</small></div><div><span>{copy.present}</span><strong dir="auto">{record.chronology.present_structure.display}</strong><small>{record.chronology.present_structure.certainty}</small></div></div></div><div className="record-visual" aria-label={copy.emptyMedia}><div className="monument-wireframe" aria-hidden="true"><i/><i/><i/><i/><i/></div><span>{copy.emptyMedia}</span></div></section><section className="content-wide record-content"><RecordViews record={record} recordSources={getSources(record.source_ids)} locale={locale}/><div className="next-record"><span>NEXT RECORD</span>{(() => { const index = coreRecords.findIndex((r) => r.id === record.id); const next = coreRecords[(index + 1) % coreRecords.length]; return <Link href={`/${locale}/mosques/${next.slug}`}>{next.names[locale]}<ArrowIcon/></Link>; })()}</div></section></main>;
}
