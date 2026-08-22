export type CustomerId = string;
export type OrderId = string;
export type ConversationId = string;
export type CampaignId = string;
export type IntegrationId = "ecommerce" | "nuvemshop" | "mercadolivre" | "shopify" | "shein" | "shopee" | "whatsapp" | "email" | "erp" | "pdv";
export type ChannelId = "email" | "whatsapp" | "outro";

export type CustomerStatus = "VIP" | "RECOMPRA_PENDENTE" | "NOVO" | "EM_RISCO";
export type OrderStatus = "Entregue" | "Em trânsito" | "Processando" | "Cancelado";
export type CampaignStatus = "Ativa" | "Pausada" | "Rascunho" | "Agendada" | "Concluída";
export type ConversationStatus = "aguardando" | "atendimento" | "resolvida";
export type ConversationPriority = "Alta" | "Normal" | "Baixa";

export type Address = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type CustomerHistoryItem = {
  title: string;
  detail: string;
  value: string;
  date?: string;
};

export type CustomerActivity = {
  id: string;
  type: "pedido" | "conversa" | "campanha" | "nota" | "sistema";
  title: string;
  detail: string;
  occurredAt: string;
};

export type CustomerFinancialSummary = {
  totalSpent: number;
  orderCount: number;
  averageTicket: number;
  refunds: number;
  currency: "BRL" | "USD" | "EUR";
};

export type CustomerProfile = {
  recordType: "customer";
  id: CustomerId;
  slug: string;
  initials: string;
  name: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  cpf: string;
  channel: string;
  sourcePlatform: IntegrationId;
  sourceLabel: string;
  channelLogo?: "whatsapp" | "mercadolivre" | "nuvemshop" | "shopee" | "shein" | "shopify" | "instagram";
  ltv: string;
  averageTicket: string;
  orders: number;
  totalSpent: number;
  lastPurchase: string;
  lastInteraction: string;
  daysSincePurchase: string;
  repurchaseDate: string;
  createdAt: string;
  status: CustomerStatus;
  tags: string[];
  segments: string[];
  assignedTo: string;
  notes: string;
  address: Address;
  financial: CustomerFinancialSummary;
  history: CustomerHistoryItem[];
  conversationIds: ConversationId[];
  campaignIds: CampaignId[];
  activities: CustomerActivity[];
};

export type OrderProduct = { name: string; quantity: number; price: number };

export type OrderRecord = {
  recordType: "order";
  id: OrderId;
  platformOrderId: string;
  customerId: CustomerId;
  customerName: string;
  customerInitials: string;
  customerEmail: string;
  source: "mercado-livre" | "shopee" | "nuvemshop" | "ecommerce" | "shein" | "app";
  sourceIntegrationId: IntegrationId;
  sourceLabel: string;
  sourceType: "Marketplace" | "Loja própria" | "Aplicativo";
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: number;
  payment: string;
  shipping: string;
  tracking: string;
  products: OrderProduct[];
};

export type ConversationMessage = {
  id: number;
  author: "cliente" | "lojista";
  text: string;
  time: string;
};

export type ConversationRecord = {
  recordType: "conversation";
  id: ConversationId;
  ticket: string;
  customerId: CustomerId;
  name: string;
  initials: string;
  email: string;
  phone: string;
  channel: ChannelId;
  channelLabel: string;
  preview: string;
  time: string;
  status: ConversationStatus;
  priority: ConversationPriority;
  tags: string[];
  assignedTo: string;
  sla: string;
  messages: ConversationMessage[];
  createdAt: string;
  lastMessageAt: string;
};

export type CampaignRecord = {
  recordType: "campaign";
  id: CampaignId;
  name: string;
  channel: "E-mail" | "WhatsApp" | "Outro canal";
  audience: string;
  status: CampaignStatus;
  updatedAt: string;
  sent: number;
  openRate: string;
  clickRate: string;
  revenue: number;
  customerIds: CustomerId[];
};

export type FinancialEntry = {
  recordType: "financial-entry";
  id: string;
  customerId?: CustomerId;
  orderId?: OrderId;
  type: "revenue" | "refund" | "fee";
  amount: number;
  currency: "BRL";
  status: "confirmed" | "pending" | "cancelled";
  occurredAt: string;
};

export type ChannelReport = {
  label: string;
  logo?: "whatsapp" | "mercadolivre" | "nuvemshop" | "shopee" | "shein" | "shopify" | "instagram";
  orders: number;
  revenue: number;
  share: string;
  color: string;
};

export type JourneyRecord = {
  recordType: "journey";
  id: string;
  name: string;
  description: string;
  status: "Ativa" | "Rascunho" | "Pausada";
  audience: string;
  enrolled: number;
  conversion: string;
  lastUpdated: string;
  trigger: string;
  steps: number;
};

export type AutomationRecord = {
  recordType: "automation";
  id: string;
  name: string;
  description: string;
  status: "Ativa" | "Rascunho" | "Pausada";
  trigger: string;
  channel: "WhatsApp" | "E-mail" | "Interno";
  runs: number;
  lastRun: string;
  owner: string;
};
