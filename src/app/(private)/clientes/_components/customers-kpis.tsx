import { CircleDollarSign, HeartPulse, Repeat2, Users } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";
import { customerProfiles, formatCurrency } from "@/lib/crm-data";

export function CustomersKpis() {
  const total = customerProfiles.length;
  const averageLtv = total ? customerProfiles.reduce((sum, customer) => sum + customer.totalSpent, 0) / total : 0;
  const readyToRepurchase = customerProfiles.filter((customer) => customer.status === "RECOMPRA_PENDENTE").length;
  const atRisk = customerProfiles.filter((customer) => customer.status === "EM_RISCO").length;
  const kpis = [{ label: "Base total de clientes", value: String(total), helper: "perfis com ID oficial", trend: "+12,4%", icon: Users }, { label: "LTV médio", value: formatCurrency(averageLtv), helper: "valor por cliente", trend: "+8,7%", icon: CircleDollarSign }, { label: "Janela de recompra", value: String(readyToRepurchase), helper: "prontos para contacto", trend: "+16,2%", icon: Repeat2 }, { label: "Clientes em risco", value: String(atRisk), helper: "sem compra há 90+ dias", trend: "-4,1%", icon: HeartPulse }];
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi, index) => <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} trend={kpi.trend} icon={kpi.icon} accent={index === 0} />)}</div>;
}
