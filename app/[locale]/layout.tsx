import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} className={`locale-${locale}`}><SiteHeader locale={locale}/><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter locale={locale}/></div>;
}
