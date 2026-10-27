"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/types";
import { localeName, t } from "@/lib/i18n";
import { CloseIcon, CompassIcon, MenuIcon } from "@/components/Icons";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const links = [
    ["catalog", copy.nav.atlas], ["timeline", copy.nav.timeline], ["map", copy.nav.map],
    ["compare", copy.nav.compare], ["glossary", copy.nav.glossary], ["sources", copy.nav.sources],
  ];
  const localizedPath = (next: Locale) => pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, `/${next}`);

  return <header className="site-header">
    <Link className="brand" href={`/${locale}`} aria-label={copy.siteName}>
      <span className="brand-mark"><CompassIcon /></span>
      <span><b>MOSQUE ATLAS</b><small>ARCHITECTURE · HERITAGE · EVIDENCE</small></span>
    </Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={copy.menu}>{open ? <CloseIcon /> : <MenuIcon />}</button>
    <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
      {links.map(([path, label]) => <Link key={path} href={`/${locale}/${path}`} onClick={() => setOpen(false)} className={pathname.includes(`/${path}`) ? "active" : ""}>{label}</Link>)}
    </nav>
    <div className="locale-switcher" aria-label="Language">
      {(["en", "fr", "ar"] as Locale[]).map((item) => <Link key={item} href={localizedPath(item)} className={locale === item ? "active" : ""} hrefLang={item} lang={item}>{localeName(item)}</Link>)}
    </div>
  </header>;
}
