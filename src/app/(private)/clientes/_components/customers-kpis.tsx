import { ArrowDownRight, ArrowUpRight, CircleDollarSign, HeartPulse, Repeat2, Users } from "lucide-react";

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
  { label: "Base total de clientes", value: "2.847", detail: "clientes cadastrados", change: "+12,4%", isPositive: true, isDecrease: false, icon: Users },
  { label: "LTV médio", value: "R$ 1.284,60", detail: "valor por cliente", change: "+8,7%", isPositive: true, isDecrease: false, icon: CircleDollarSign },
  { label: "Janela de recompra", value: "386", detail: "prontos este mês", change: "+16,2%", isPositive: true, isDecrease: false, icon: Repeat2 },
  { label: "Clientes em risco", value: "72", detail: "sem compra há 90+ dias", change: "-4,1%", isPositive: true, isDecrease: true, icon: HeartPulse },
];

export function CustomersKpis() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.isDecrease ? ArrowDownRight : ArrowUpRight;
        return (
          <article key={kpi.label} className={`card-surface p-4 sm:p-5 ${index === 3 ? "border-l-2 border-l-rose-400" : ""}`}>
            <div className="flex items-center justify-between gap-3"><p className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{kpi.label}</p><Icon className="h-4 w-4 shrink-0 text-muted-foreground" /></div>
            <div className="mt-4 flex items-end justify-between gap-3"><div className="min-w-0"><p className="truncate text-[1.35rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-2xl">{kpi.value}</p><p className="mt-1 truncate text-[11px] font-medium text-muted-foreground">{kpi.detail}</p></div><span className={`inline-flex shrink-0 items-center gap-0.5 text-[10px] font-bold ${kpi.isPositive ? "text-success" : "text-danger"}`}><TrendIcon className="h-3 w-3" />{kpi.change}</span></div>
          </article>
        );
      })}
    </div>
  );
}
