import { DollarSign, MessageSquareText, Repeat, ShoppingBag, TrendingUp, UserPlus } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";

interface KpiItem {
  title: string;
  value: string;
  change: string;
  icon: typeof DollarSign;
  emphasis?: boolean;
}

const kpis: KpiItem[] = [
  { title: "Receita gerada", value: "R$ 128.560,00", change: "+12,5%", icon: DollarSign, emphasis: true },
  { title: "Novos clientes", value: "1.482", change: "+8,3%", icon: UserPlus },
  { title: "Taxa de recompra", value: "34,6%", change: "+5,7%", icon: Repeat },
  { title: "Produtos comprados", value: "3.842", change: "+14,2%", icon: ShoppingBag },
  { title: "Taxa de respostas", value: "94,8%", change: "+2,1%", icon: MessageSquareText },
];

export function KpiGrid() {
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">{kpis.map((kpi) => <MetricCard key={kpi.title} label={kpi.title} value={kpi.value} helper="vs. mês anterior" trend={kpi.change} icon={kpi.icon} accent={kpi.emphasis} />)}</div>;
}
