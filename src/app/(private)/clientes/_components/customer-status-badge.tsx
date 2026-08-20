"use client";

import { Clock3, ShieldCheck, TriangleAlert, UserRound } from "lucide-react";

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
      "bg-accent/10 text-accent border border-accent/25",
    icon: ShieldCheck,
  },
  RECOMPRA_PENDENTE: {
    label: "Recompra Pendente",
    className:
      "bg-amber-500/10 text-amber-700 border border-amber-500/20",
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
    icon: UserRound,
  },
};

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const config = statusConfig[status] || statusConfig.NOVO;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] transition-all duration-150 select-none ${config.className}`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}