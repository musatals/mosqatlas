import { notFound } from "next/navigation";
import { terms } from "@/lib/data";
import { isLocale } from "@/lib/i18n";
import { GlossaryExplorer } from "@/components/GlossaryExplorer";
export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <GlossaryExplorer terms={terms} locale={locale}/>; }
