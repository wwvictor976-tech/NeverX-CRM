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
    isPositive: true,
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
            className="group rounded-2xl border border-border-subtle bg-card p-4 shadow-card transition-all duration-200 hover:border-border"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                {kpi.label}
              </p>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-2.5 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {kpi.value}
                </p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                  {kpi.detail}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-0.5 text-[11px] font-semibold ${
                  kpi.isPositive ? "text-success" : "text-danger"
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
