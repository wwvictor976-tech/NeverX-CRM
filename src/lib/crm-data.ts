export type OrderStatus = "Entregue" | "Em trânsito" | "Processando" | "Cancelado";

export type OrderRecord = {
  id: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerEmail: string;
  source: "mercado-livre" | "shopee" | "nuvemshop" | "ecommerce" | "shein" | "app";
  sourceLabel: string;
  sourceType: "Marketplace" | "Loja própria" | "Aplicativo";
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: number;
  payment: string;
  shipping: string;
  tracking: string;
  products: { name: string; quantity: number; price: number }[];
};

export const orders: OrderRecord[] = [
  { id: "#NX-4029", customerId: "ana-souza", customerName: "Ana Souza", customerInitials: "AS", customerEmail: "ana.souza@email.com", source: "mercado-livre", sourceLabel: "Mercado Livre", sourceType: "Marketplace", createdAt: "Hoje, 10:40", status: "Em trânsito", total: 459.9, items: 2, payment: "Cartão de crédito", shipping: "Mercado Envios", tracking: "MLB-9084421", products: [{ name: "Kit organização premium", quantity: 1, price: 319.9 }, { name: "Refil organizador", quantity: 1, price: 140 }] },
  { id: "#NX-4028", customerId: "rafael-mendes", customerName: "Rafael Mendes", customerInitials: "RM", customerEmail: "rafael.mendes@email.com", source: "shopee", sourceLabel: "Shopee", sourceType: "Marketplace", createdAt: "Hoje, 09:18", status: "Entregue", total: 299.9, items: 1, payment: "Pix", shipping: "Shopee Entrega", tracking: "SPX-771204", products: [{ name: "Cafeteira compacta", quantity: 1, price: 299.9 }] },
  { id: "#NX-4027", customerId: "camila-lima", customerName: "Camila Lima", customerInitials: "CL", customerEmail: "camila.lima@email.com", source: "nuvemshop", sourceLabel: "Nuvemshop", sourceType: "Loja própria", createdAt: "Ontem, 16:22", status: "Processando", total: 234.0, items: 3, payment: "Pix", shipping: "Jadlog", tracking: "NX-234901", products: [{ name: "Organizador de cabos", quantity: 2, price: 98 }, { name: "Etiqueta térmica", quantity: 1, price: 136 }] },
  { id: "#NX-4026", customerId: "joao-teixeira", customerName: "João Teixeira", customerInitials: "JT", customerEmail: "joao.teixeira@email.com", source: "app", sourceLabel: "Aplicativo próprio", sourceType: "Aplicativo", createdAt: "12 ago, 14:05", status: "Cancelado", total: 576.0, items: 4, payment: "Cartão de crédito", shipping: "Retirada no PDV", tracking: "PDV-1184", products: [{ name: "Kit home office", quantity: 1, price: 576 }] },
  { id: "#NX-4025", customerId: "marina-barbosa", customerName: "Marina Barbosa", customerInitials: "MB", customerEmail: "marina.barbosa@email.com", source: "shein", sourceLabel: "SHEIN", sourceType: "Marketplace", createdAt: "18 ago, 11:40", status: "Entregue", total: 899.0, items: 5, payment: "Pix", shipping: "Shein Logistics", tracking: "SHE-553190", products: [{ name: "Linha home premium", quantity: 5, price: 899 }] },
  { id: "#NX-4024", customerId: "juliana-santos", customerName: "Juliana Santos", customerInitials: "JS", customerEmail: "juliana.santos@email.com", source: "nuvemshop", sourceLabel: "Nuvemshop", sourceType: "Loja própria", createdAt: "16 ago, 13:20", status: "Entregue", total: 459.9, items: 2, payment: "Cartão de crédito", shipping: "Correios", tracking: "NX-221480", products: [{ name: "Kit organização premium", quantity: 1, price: 459.9 }] },
];

export type CampaignRecord = {
  id: string;
  name: string;
  channel: "E-mail" | "WhatsApp" | "Outro canal";
  audience: string;
  status: "Activa" | "Rascunho" | "Agendada" | "Concluída";
  updatedAt: string;
  sent: number;
  openRate: string;
  clickRate: string;
  revenue: number;
};

export const campaigns: CampaignRecord[] = [
  { id: "cmp-recompra-agosto", name: "Recompra de agosto", channel: "WhatsApp", audience: "386 clientes prontos", status: "Activa", updatedAt: "Actualizada hoje", sent: 386, openRate: "78,4%", clickRate: "22,8%", revenue: 18420 },
  { id: "cmp-vip-lancamento", name: "Lançamento linha premium", channel: "E-mail", audience: "124 clientes VIP", status: "Agendada", updatedAt: "18 ago 2026", sent: 124, openRate: "—", clickRate: "—", revenue: 0 },
  { id: "cmp-inativos", name: "Reativação de inativos", channel: "E-mail", audience: "72 clientes em risco", status: "Concluída", updatedAt: "15 ago 2026", sent: 72, openRate: "64,2%", clickRate: "12,5%", revenue: 7260 },
  { id: "cmp-primeira-compra", name: "Boas-vindas primeira compra", channel: "Outro canal", audience: "48 novos clientes", status: "Rascunho", updatedAt: "Editada há 2 dias", sent: 0, openRate: "—", clickRate: "—", revenue: 0 },
];

export const reportChannels = [
  { label: "Mercado Livre", logo: "mercadolivre" as const, orders: 1240, revenue: 68450, share: "38%", color: "bg-amber-500" },
  { label: "Nuvemshop", logo: "nuvemshop" as const, orders: 890, revenue: 48600, share: "27%", color: "bg-foreground" },
  { label: "Shopee", logo: "shopee" as const, orders: 620, revenue: 28800, share: "16%", color: "bg-orange-500" },
  { label: "Aplicativo próprio", orders: 410, revenue: 21600, share: "12%", color: "bg-blue-500" },
  { label: "SHEIN", logo: "shein" as const, orders: 280, revenue: 12600, share: "7%", color: "bg-pink-500" },
];

export const reportSegments = [
  { label: "VIP", customers: 124, revenue: 48200, conversion: "42,8%", trend: "+12,4%" },
  { label: "Prontos para recompra", customers: 386, revenue: 36480, conversion: "34,6%", trend: "+8,7%" },
  { label: "Novos clientes", customers: 742, revenue: 21890, conversion: "18,2%", trend: "+16,2%" },
  { label: "Em risco", customers: 72, revenue: 6840, conversion: "6,4%", trend: "-4,1%" },
];

export const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
