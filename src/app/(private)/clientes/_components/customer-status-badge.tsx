"use client";

import { Clock3, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";

export type CustomerStatus = "VIP" | "RECOMPRA_PENDENTE" | "EM_RISCO" | "NOVO";

interface StatusDetails {
  label: string;
  className: string;
  icon: typeof ShieldCheck;
}

const statusConfig: Record<CustomerStatus, StatusDetails> = {
  VIP: {
    label: "VIP",
    className:
      "bg-accent/15 text-accent border border-accent/30 shadow-2xs",
    icon: ShieldCheck,
  },
  RECOMPRA_PENDENTE: {
    label: "Recompra Pendente",
    className:
      "bg-success/15 text-success border border-success/30",
    icon: Clock3,
  },
  EM_RISCO: {
    label: "Em Risco",
    className:
      "bg-warning/15 text-warning border border-warning/30",
    icon: TriangleAlert,
  },
  NOVO: {
    label: "Novo",
    className:
      "bg-muted/80 text-muted-foreground border border-border-subtle",
    icon: Sparkles,
  },
};

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const config = statusConfig[status] || statusConfig.NOVO;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-150 select-none ${config.className}`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}