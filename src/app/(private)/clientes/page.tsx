// src/app/(private)/clientes/page.tsx
import { Suspense } from "react";
import { PrivateLayout } from "@/components/layout/private-layout";
import { CustomersContent } from "./_components/customers-content"; // Importação com chaves { }

export default function CustomersPage() {
  return (
    <PrivateLayout
      title="Clientes"
      subtitle="Gerencie seus relacionamentos e acompanhe a saúde da sua base."
    >
      <Suspense fallback={<div className="card-surface flex min-h-[420px] items-center justify-center text-xs text-muted-foreground">A carregar clientes...</div>}><CustomersContent /></Suspense>
    </PrivateLayout>
  );
}