import { PrivateLayout } from "@/components/layout/private-layout";
import { ReportsContent } from "./_components/reports-content";

export default function ReportsPage() {
  return <PrivateLayout title="Relatórios" subtitle="Indicadores, performance e oportunidades da sua operação."><ReportsContent /></PrivateLayout>;
}
