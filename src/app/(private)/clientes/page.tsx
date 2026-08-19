// src/app/(private)/clientes/page.tsx
import { PrivateLayout } from "@/components/layout/private-layout";
import { CustomersContent } from "./_components/customers-content"; // Importação com chaves { }

export default function CustomersPage() {
  return (
    <PrivateLayout
      title="Clientes"
      subtitle="Gerencie seus relacionamentos e acompanhe a saúde da sua base."
    >
      <CustomersContent />
    </PrivateLayout>
  );
}