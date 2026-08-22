import { PrivateLayout } from "@/components/layout/private-layout";
import { AutomationsContent } from "./_components/automations-content";

export default function AutomationsPage() {
  return <PrivateLayout title="Automações" subtitle="Regras operacionais ligadas a pedidos, conversas e clientes."><AutomationsContent /></PrivateLayout>;
}
