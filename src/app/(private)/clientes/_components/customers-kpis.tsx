"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  HeartPulse,
  Repeat2,
  Users,
} from "lucide-react";

interface KpiItem {
  label: string;
  value: string;
  detail: string;
  change: string;
  isPositive: boolean;
  isDecrease: boolean;
  icon: React.ElementType;
}

const kpis: KpiItem[] = [
  {
    label: "Base total de clientes",
    value: "2.847",
    detail: "clientes cadastrados",
    change: "+12,4%",
    isPositive: true,
    isDecrease: false,
    icon: Users,
  },
  {
    label: "LTV médio",
    value: "R$ 1.284,60",
    detail: "valor por cliente",
    change: "+8,7%",
    isPositive: true,
    isDecrease: false,
    icon: CircleDollarSign,
  },
  {
    label: "Janela de recompra",
    value: "386",
    detail: "prontos este mês",
    change: "+16,2%",
    isPositive: true,
    isDecrease: false,
    icon: Repeat2,
  },
  {
    label: "Clientes em risco",
    value: "72",
    detail: "sem compra há 90+ dias",
    change: "-4,1%",
    isPositive: true, // Redução de clientes em risco é positiva
    isDecrease: true,
    icon: HeartPulse,
  },
];

export function CustomersKpis() {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.isDecrease ? ArrowDownRight : ArrowUpRight;

        return (
          <div
            key={kpi.label}
            className="group rounded-2xl border border-border-subtle bg-card p-4 shadow-card transition-all duration-200 hover:border-border hover:shadow-md sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold text-muted-foreground">
                {kpi.label}
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {kpi.value}
                </p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                  {kpi.detail}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-0.5 rounded-lg border px-2 py-0.5 text-[11px] font-extrabold ${
                  kpi.isPositive
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-warning/10 text-warning border-warning/20"
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                <span>{kpi.change}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}