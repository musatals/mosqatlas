import { notFound } from "next/navigation";
import { coreRecords } from "@/lib/data";
import { isLocale } from "@/lib/i18n";
import { ComparisonLab } from "@/components/ComparisonLab";
export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <ComparisonLab records={coreRecords} locale={locale}/>; }
