"use client";

import { 
  DollarSign, 
  UserPlus, 
  Repeat, 
  ShoppingBag, 
  MessageSquareText, 
  TrendingUp 
} from "lucide-react";

interface KpiItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const kpis: KpiItem[] = [
  {
    title: "Receita gerada",
    value: "R$ 128.560,00",
    change: "+12,5%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "Novos clientes",
    value: "1.482",
    change: "+8,3%",
    isPositive: true,
    icon: UserPlus,
  },
  {
    title: "Taxa de recompra",
    value: "34,6%",
    change: "+5,7%",
    isPositive: true,
    icon: Repeat,
  },
  {
    title: "Produtos comprados",
    value: "3.842",
    change: "+14,2%",
    isPositive: true,
    icon: ShoppingBag,
  },
  {
    title: "Taxa de respostas",
    value: "94,8%",
    change: "+2,1%",
    isPositive: true,
    icon: MessageSquareText,
  },
];

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.title}
            className="group rounded-2xl border border-border-subtle bg-card p-4.5 shadow-card transition-all duration-200 hover:border-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {kpi.title}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-2.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {kpi.value}
              </h3>
            </div>

            <div className="mt-2 flex items-center gap-1 text-[11px]">
              <span
                className={`flex items-center font-semibold ${
                  kpi.isPositive ? "text-success" : "text-danger"
                }`}
              >
                <TrendingUp className="mr-0.5 h-3 w-3" />
                {kpi.change}
              </span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}