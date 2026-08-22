import { PrivateLayout } from "@/components/layout/private-layout";
import { FinanceContent } from "./_components/finance-content";

export default function FinancePage() {
  return <PrivateLayout title="Financeiro" subtitle="Receita, pedidos e reembolsos ligados ao relacionamento com os clientes."><FinanceContent /></PrivateLayout>;
}
