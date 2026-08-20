import { PrivateLayout } from "@/components/layout/private-layout";
import { OrdersContent } from "./_components/orders-content";

export default function OrdersPage() {
  return <PrivateLayout title="Pedidos" subtitle="Origem, cliente, pagamento e entrega num só lugar."><OrdersContent /></PrivateLayout>;
}
