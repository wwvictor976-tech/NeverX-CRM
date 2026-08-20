import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border-subtle pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="page-kicker">{eyebrow}</p>
        <h2 className="mt-2 text-[1.85rem] font-extrabold tracking-[-0.045em] text-foreground sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">{description}</p>
      </div>
      {(action || meta) ? <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">{meta}{action}</div> : null}
    </div>
  );
}

export function SectionIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <p className="page-kicker">{eyebrow}</p>
        <h3 className="section-heading mt-1">{title}</h3>
        {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  helper,
  trend,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  helper: string;
  trend?: string;
  icon?: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article className={`card-surface min-w-0 p-4 sm:p-5 ${accent ? "border-l-2 border-l-accent" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="page-kicker truncate">{label}</p>
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
      </div>
      <p className="mt-4 truncate text-2xl font-extrabold tracking-[-0.045em] text-foreground">{value}</p>
      <p className={`mt-2 truncate text-[11px] ${trend ? "font-bold text-success" : "font-medium text-muted-foreground"}`}>
        {trend ? <>{trend} <span className="font-medium text-muted-foreground">{helper}</span></> : helper}
      </p>
    </article>
  );
}

export function StatusPill({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "neutral" | "info" }) {
  const styles = {
    success: "border-success/20 bg-success/5 text-success",
    warning: "border-accent/25 bg-accent/5 text-accent",
    danger: "border-danger/20 bg-danger/5 text-danger",
    neutral: "border-border-subtle bg-muted/60 text-muted-foreground",
    info: "border-blue-500/20 bg-blue-500/5 text-blue-700",
  } as const;

  return <span className={`inline-flex items-center rounded-lg border px-2 py-1 text-[10px] font-bold ${styles[tone]}`}>{children}</span>;
}
