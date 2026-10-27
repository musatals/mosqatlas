import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";
import { CubeIcon } from "@/components/Icons";

export function EmptyModel({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const copy = t(locale);
  return <div className={compact ? "empty-model compact" : "empty-model"}>
    <div className="model-stage" aria-hidden="true"><span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="model-cube"><CubeIcon size={compact ? 26 : 42}/></span></div>
    <div><p className="eyebrow">GLB / glTF</p><h3>{copy.emptyModel}</h3>{!compact && <p>{copy.emptyModelNote}</p>}</div>
  </div>;
}
