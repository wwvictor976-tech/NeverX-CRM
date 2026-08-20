import { Suspense } from "react";
import { PrivateLayout } from "@/components/layout/private-layout";
import { IntegrationsContent } from "./_components/integrations-content";

export default function IntegrationsPage() {
  return (
    <PrivateLayout
      title="Integrações"
      subtitle="Conecte as fontes da sua operação à visão unificada do CRM."
    >
      <Suspense fallback={<div className="card-surface flex min-h-[420px] items-center justify-center text-xs text-muted-foreground">A carregar integrações...</div>}><IntegrationsContent /></Suspense>
    </PrivateLayout>
  );
}
