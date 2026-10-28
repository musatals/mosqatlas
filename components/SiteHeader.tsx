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

  const languageLinks = (className: string) => <div className={className} aria-label="Language">
    {(["en", "fr", "ar"] as Locale[]).map((item) => <Link key={item} href={localizedPath(item)} className={locale === item ? "active" : ""} hrefLang={item} lang={item} aria-current={locale === item ? "page" : undefined}>{localeName(item)}</Link>)}
  </div>;

  return <><a className="skip-link" href="#main-content">{copy.skip}</a><header className="site-header">
    <Link className="brand" href={`/${locale}`} aria-label={copy.siteName}>
      <span className="brand-mark"><CompassIcon /></span>
      <span><b>MOSQUE ATLAS</b><small>ARCHITECTURE · HERITAGE · EVIDENCE</small></span>
    </Link>
    <button type="button" className="menu-button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="primary-navigation" aria-label={copy.menu}>{open ? <CloseIcon /> : <MenuIcon />}</button>
    <nav id="primary-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
      {links.map(([path, label]) => {
        const active = pathname.includes(`/${path}`);
        return <Link key={path} href={`/${locale}/${path}`} onClick={() => setOpen(false)} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{label}</Link>;
      })}
      {languageLinks("nav-locale-switcher")}
    </nav>
    {languageLinks("locale-switcher")}
  </header></>;
}
