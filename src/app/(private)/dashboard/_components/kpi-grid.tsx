import { DollarSign, MessageSquareText, Repeat, ShoppingBag, TrendingUp, UserPlus } from "lucide-react";

interface KpiItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  emphasis?: boolean;
}

const kpis: KpiItem[] = [
  { title: "Receita gerada", value: "R$ 128.560,00", change: "+12,5%", isPositive: true, icon: DollarSign, emphasis: true },
  { title: "Novos clientes", value: "1.482", change: "+8,3%", isPositive: true, icon: UserPlus },
  { title: "Taxa de recompra", value: "34,6%", change: "+5,7%", isPositive: true, icon: Repeat },
  { title: "Produtos comprados", value: "3.842", change: "+14,2%", isPositive: true, icon: ShoppingBag },
  { title: "Taxa de respostas", value: "94,8%", change: "+2,1%", isPositive: true, icon: MessageSquareText },
];

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <article key={kpi.title} className={`card-surface group p-4 sm:p-5 ${kpi.emphasis ? "border-l-2 border-l-accent" : ""}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{kpi.title}</p>
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
            </div>
            <p className="mt-4 truncate text-[1.35rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-2xl">{kpi.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px]">
              <span className={`font-bold ${kpi.isPositive ? "text-success" : "text-danger"}`}><TrendingUp className="mr-0.5 inline h-3 w-3" />{kpi.change}</span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
