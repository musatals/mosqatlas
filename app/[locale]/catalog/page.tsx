import { notFound } from "next/navigation";
import { candidates, coreRecords } from "@/lib/data";
import { isLocale } from "@/lib/i18n";
import { CatalogExplorer } from "@/components/CatalogExplorer";

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <CatalogExplorer records={coreRecords} candidates={candidates} locale={locale}/>; }
