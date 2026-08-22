import {
  automations,
  campaigns,
  conversations,
  customerProfiles,
  financialEntries,
  journeys,
  orders,
  reportChannels,
  reportSegments,
} from "./crm-data";
import type {
  CampaignRecord,
  AutomationRecord,
  ChannelReport,
  ConversationRecord,
  CustomerProfile,
  FinancialEntry,
  JourneyRecord,
  OrderRecord,
} from "./crm-domain";

export type CrmSnapshot = {
  customers: CustomerProfile[];
  orders: OrderRecord[];
  conversations: ConversationRecord[];
  campaigns: CampaignRecord[];
  journeys: JourneyRecord[];
  automations: AutomationRecord[];
  financialEntries: FinancialEntry[];
  reportChannels: ChannelReport[];
  reportSegments: { label: string; customers: number; revenue: number; conversion: string; trend: string }[];
};

export type DataResult<T> = {
  data: T;
  source: "mock" | "api";
  fetchedAt: string;
};

export interface CrmDataSource {
  getSnapshot(): DataResult<CrmSnapshot>;
  getCustomer(reference: string): DataResult<CustomerProfile | undefined>;
  getOrder(id: string): DataResult<OrderRecord | undefined>;
  getConversation(id: string): DataResult<ConversationRecord | undefined>;
}

const snapshot: CrmSnapshot = {
  customers: customerProfiles,
  orders,
  conversations,
  campaigns,
  journeys,
  automations,
  financialEntries,
  reportChannels,
  reportSegments,
};

const result = <T,>(data: T): DataResult<T> => ({ data, source: "mock", fetchedAt: new Date().toISOString() });

export const mockCrmDataSource: CrmDataSource = {
  getSnapshot: () => result(snapshot),
  getCustomer: (reference) => result(snapshot.customers.find((customer) => customer.id === reference || customer.slug === reference)),
  getOrder: (id) => result(snapshot.orders.find((order) => order.id === id)),
  getConversation: (id) => result(snapshot.conversations.find((conversation) => conversation.id === id)),
};

/**
 * Ponto único de troca para a futura API. Os componentes devem consumir este contrato,
 * não conhecer endpoints nem a origem física dos dados.
 */
export const crmDataSource: CrmDataSource = mockCrmDataSource;
