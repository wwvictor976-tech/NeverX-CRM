"use client";

import { DollarSign, MessageSquareText, Repeat, ShoppingBag, UserPlus } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";
import { formatCurrency } from "@/lib/crm-data";
import { getDashboardMetrics } from "@/lib/crm-selectors";
import { useDashboard } from "./dashboard-context";

export function KpiGrid() {
  const { range, isRefreshing } = useDashboard();
  const metrics = getDashboardMetrics(range);
  const periodHelper = range.key === "today" ? "no dia selecionado" : "no período selecionado";
  const kpis = [
    { title: "Receita confirmada", value: formatCurrency(metrics.revenue), change: "", helper: `total ${periodHelper}`, icon: DollarSign, emphasis: true },
    { title: "Clientes com atividade", value: String(metrics.customers), change: "", helper: periodHelper, icon: UserPlus },
    { title: "Conversas pendentes", value: String(metrics.pendingConversations), change: "", helper: "a acompanhar pela equipe", icon: MessageSquareText },
    { title: "Pedidos rastreados", value: String(metrics.orders), change: "", helper: periodHelper, icon: ShoppingBag },
    { title: "Ticket médio", value: formatCurrency(metrics.averageTicket), change: "", helper: "por pedido confirmado", icon: Repeat },
  ];

  return (
    <div className={`grid grid-cols-1 gap-3 transition-opacity duration-200 md:grid-cols-2 xl:grid-cols-5 ${isRefreshing ? "opacity-60" : "opacity-100"}`} aria-busy={isRefreshing}>
      {kpis.map((kpi) => (
        <MetricCard key={kpi.title} label={kpi.title} value={kpi.value} helper={kpi.helper} trend={kpi.change || undefined} icon={kpi.icon} accent={kpi.emphasis} />
      ))}
    </div>
  );
}
