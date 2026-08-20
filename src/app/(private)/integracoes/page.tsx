import { PrivateLayout } from "@/components/layout/private-layout";
import { IntegrationsContent } from "./_components/integrations-content";

export default function IntegrationsPage() {
  return (
    <PrivateLayout
      title="Integrações"
      subtitle="Conecte as fontes da sua operação à visão unificada do CRM."
    >
      <IntegrationsContent />
    </PrivateLayout>
  );
}
