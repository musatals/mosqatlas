import Link from "next/link";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return <footer className="site-footer"><div><strong>MOSQUE ATLAS 3D</strong><p>{copy.limited}</p></div><div><span>RESEARCH EDITION · 2026</span><Link href={`/${locale}/editorial`}>Editorial workflow</Link></div></footer>;
}
