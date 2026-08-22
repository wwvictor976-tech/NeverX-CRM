import { DollarSign, MessageSquareText, Package, Repeat, ShoppingBag, UserPlus } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";
import { formatCurrency } from "@/lib/crm-data";
import { getDashboardMetrics } from "@/lib/crm-selectors";

export function KpiGrid() {
  const metrics = getDashboardMetrics();
  const kpis = [
    { title: "Receita confirmada", value: formatCurrency(metrics.revenue), change: "+12,5%", icon: DollarSign, emphasis: true },
    { title: "Novos clientes", value: String(metrics.newCustomers), change: "+8,3%", icon: UserPlus },
    { title: "Conversas pendentes", value: String(metrics.pendingConversations), change: "", icon: MessageSquareText },
    { title: "Pedidos rastreados", value: String(metrics.orders), change: "+9,8%", icon: ShoppingBag },
    { title: "Ticket médio", value: formatCurrency(metrics.averageTicket), change: "+5,7%", icon: Repeat },
  ];
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">{kpis.map((kpi) => <MetricCard key={kpi.title} label={kpi.title} value={kpi.value} helper={kpi.change ? "vs. período anterior" : "a acompanhar"} trend={kpi.change || undefined} icon={kpi.icon} accent={kpi.emphasis} />)}</div>;
}
