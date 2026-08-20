import { CircleDollarSign, HeartPulse, Repeat2, Users } from "lucide-react";
import { MetricCard } from "@/components/layout/page-structure";

const kpis = [
  { label: "Base total de clientes", value: "2.847", helper: "clientes cadastrados", trend: "+12,4%", icon: Users },
  { label: "LTV médio", value: "R$ 1.284,60", helper: "valor por cliente", trend: "+8,7%", icon: CircleDollarSign },
  { label: "Janela de recompra", value: "386", helper: "prontos este mês", trend: "+16,2%", icon: Repeat2 },
  { label: "Clientes em risco", value: "72", helper: "sem compra há 90+ dias", trend: "-4,1%", icon: HeartPulse },
];

export function CustomersKpis() {
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi, index) => <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} trend={kpi.trend} icon={kpi.icon} accent={index === 0} />)}</div>;
}
