import Link from "next/link";
import type { Locale, MosqueRecord } from "@/lib/types";
import { t } from "@/lib/i18n";
import { ArrowIcon } from "@/components/Icons";

const motifs = ["motif-arch", "motif-court", "motif-dome", "motif-minaret", "motif-grid", "motif-star"];

export function MosqueCard({ record, locale, index = 0 }: { record: MosqueRecord; locale: Locale; index?: number }) {
  const copy = t(locale);
  return <article className="mosque-card">
    <div className={`card-visual ${motifs[index % motifs.length]}`} aria-label={copy.emptyMedia} role="img">
      <span className="record-id" dir="ltr">{record.id}</span>
      <div className="abstract-mosque" aria-hidden="true"><i/><i/><i/></div>
      <span className="rights-note">{copy.emptyMedia}</span>
    </div>
    <div className="card-body">
      <div className="eyebrow"><span className="status-dot" />{copy.documented}</div>
      <h3>{record.names[locale]}</h3>
      <p className="original-name" lang={record.names.original.language}>{record.names.original.value}</p>
      <p className="place">{record.location.city} · {record.location.country}</p>
      <dl className="date-pair">
        <div><dt>{copy.founded}</dt><dd>{record.chronology.foundation.display}</dd></div>
        <div><dt>{copy.present}</dt><dd>{record.chronology.present_structure.display}</dd></div>
      </dl>
      <div className="card-evidence" aria-label={`${record.claims.length} ${copy.claims}; ${record.source_ids.length} ${copy.verifiedSources}`}>
        <span><strong>{record.claims.length}</strong>{copy.claims}</span>
        <span><strong>{record.source_ids.length}</strong>{copy.verifiedSources}</span>
      </div>
      <Link href={`/${locale}/mosques/${record.slug}`} className="text-link card-link" aria-label={`${copy.explore}: ${record.names[locale]}`}>{copy.explore}<ArrowIcon className="inline-arrow" /></Link>
    </div>
  </article>;
}
