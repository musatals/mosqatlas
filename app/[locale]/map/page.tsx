import { notFound } from "next/navigation";
import { coreRecords } from "@/lib/data";
import { isLocale } from "@/lib/i18n";
import { GeographicExplorer } from "@/components/GeographicExplorer";
export default async function MapPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <GeographicExplorer records={coreRecords} locale={locale}/>; }
