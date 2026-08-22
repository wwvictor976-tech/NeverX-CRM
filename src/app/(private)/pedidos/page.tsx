import { Suspense } from "react";
import { PrivateLayout } from "@/components/layout/private-layout";
import { OrdersContent } from "./_components/orders-content";

export default function OrdersPage() {
  return <PrivateLayout title="Pedidos" subtitle="Origem, cliente, pagamento e entrega num só lugar."><Suspense fallback={<div className="card-surface flex min-h-[420px] items-center justify-center text-xs text-muted-foreground">A carregar pedidos...</div>}><OrdersContent /></Suspense></PrivateLayout>;
}
