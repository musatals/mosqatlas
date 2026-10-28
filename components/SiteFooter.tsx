import Link from "next/link";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const labels = {
    en: { explore: "Explore", about: "Research method", editorial: "Editorial workflow" },
    fr: { explore: "Explorer", about: "Méthode de recherche", editorial: "Processus éditorial" },
    ar: { explore: "استكشف", about: "منهج البحث", editorial: "مسار التحرير" },
  }[locale];
  return <footer className="site-footer">
    <div className="footer-identity"><strong>MOSQUE ATLAS 3D</strong><p>{copy.limited}</p><span>RESEARCH EDITION · 2026</span></div>
    <nav aria-label={labels.explore}><b>{labels.explore}</b><Link href={`/${locale}/catalog`}>{copy.nav.atlas}</Link><Link href={`/${locale}/timeline`}>{copy.nav.timeline}</Link><Link href={`/${locale}/compare`}>{copy.nav.compare}</Link></nav>
    <nav aria-label={labels.about}><b>{labels.about}</b><Link href={`/${locale}/sources`}>{copy.nav.sources}</Link><Link href={`/${locale}/glossary`}>{copy.nav.glossary}</Link><Link href={`/${locale}/editorial`}>{labels.editorial}</Link></nav>
  </footer>;
}
