import { CircleDollarSign, HeartPulse, Repeat2, Users } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";
import { customerProfiles, formatCurrency } from "@/lib/crm-data";
import type { CustomerProfile } from "@/lib/crm-domain";

export function CustomersKpis({ customers = customerProfiles }: { customers?: CustomerProfile[] }) {
  const total = customers.length;
  const averageLtv = total ? customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / total : 0;
  const readyToRepurchase = customers.filter((customer) => customer.status === "RECOMPRA_PENDENTE").length;
  const atRisk = customers.filter((customer) => customer.status === "EM_RISCO").length;
  const kpis = [
    { label: "Base total de clientes", value: String(total), helper: "perfis com ID oficial", icon: Users },
    { label: "LTV médio", value: formatCurrency(averageLtv), helper: "valor histórico por cliente", icon: CircleDollarSign },
    { label: "Janela de recompra", value: String(readyToRepurchase), helper: "prontos para contato", icon: Repeat2 },
    { label: "Clientes em risco", value: String(atRisk), helper: "sem compra há 90+ dias", icon: HeartPulse },
  ];
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi, index) => <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} icon={kpi.icon} accent={index === 0} />)}</div>;
}
