import { notFound } from "next/navigation";
import { coreRecords } from "@/lib/data";
import { isLocale } from "@/lib/i18n";
import { TimelineExplorer } from "@/components/TimelineExplorer";
export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <TimelineExplorer records={coreRecords} locale={locale}/>; }
