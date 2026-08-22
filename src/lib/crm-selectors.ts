import { campaigns, conversations, customerProfiles, financialEntries, orders, reportChannels } from "./crm-data";
import type { ChannelId, CustomerProfile, OrderRecord } from "./crm-domain";

export type DashboardPeriodKey = "today" | "7d" | "30d" | "90d" | "custom";

export type DashboardDateRange = {
  key: DashboardPeriodKey;
  label: string;
  startDate: string;
  endDate: string;
};

export type DashboardMetrics = {
  revenue: number;
  orders: number;
  customers: number;
  newCustomers: number;
  products: number;
  openConversations: number;
  pendingConversations: number;
  responseRate: number;
  campaigns: number;
  campaignRevenue: number;
  averageTicket: number;
};

export type RevenueTrendPoint = {
  id: string;
  label: string;
  value: number;
  index: number;
};

/**
 * A fonte mock usa datas relativas para preservar a sensação de operação ao vivo.
 * O ponto de referência acompanha o dataset demonstrativo (22 de Agosto de 2026).
 */
export const DASHBOARD_REFERENCE_DATE = "2026-08-22";

const monthNumbers: Record<string, string> = {
  jan: "01",
  fev: "02",
  mar: "03",
  abr: "04",
  mai: "05",
  jun: "06",
  jul: "07",
  ago: "08",
  set: "09",
  out: "10",
  nov: "11",
  dez: "12",
};

function addDays(dateString: string, amount: number) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function formatShortDate(dateString: string) {
  const [, month, day] = dateString.split("-");
  return `${day}/${month}`;
}

export function parseMockDate(value: string | undefined) {
  if (!value) return null;
  const normalized = value.toLowerCase().trim();
  if (normalized.includes("hoje")) return DASHBOARD_REFERENCE_DATE;
  if (normalized.includes("ontem")) return addDays(DASHBOARD_REFERENCE_DATE, -1);

  const relativeDays = normalized.match(/h[aá]\s+(\d+)\s+dias?/);
  if (relativeDays) return addDays(DASHBOARD_REFERENCE_DATE, -Number(relativeDays[1]));

  const dateMatch = normalized.match(/(\d{1,2})\s+(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)(?:\s+(\d{4}))?/);
  if (!dateMatch) return null;

  const day = dateMatch[1].padStart(2, "0");
  const month = monthNumbers[dateMatch[2]];
  const year = dateMatch[3] ?? DASHBOARD_REFERENCE_DATE.slice(0, 4);
  return `${year}-${month}-${day}`;
}

export function getDashboardDateRange(
  key: Exclude<DashboardPeriodKey, "custom">,
): DashboardDateRange {
  const endDate = DASHBOARD_REFERENCE_DATE;
  const ranges: Record<Exclude<DashboardPeriodKey, "custom">, { label: string; days: number }> = {
    today: { label: "Hoje", days: 1 },
    "7d": { label: "Últimos 7 dias", days: 7 },
    "30d": { label: "Últimos 30 dias", days: 30 },
    "90d": { label: "Últimos 90 dias", days: 90 },
  };
  const selected = ranges[key];
  return {
    key,
    label: selected.label,
    startDate: addDays(endDate, -(selected.days - 1)),
    endDate,
  };
}

export function getCustomDashboardDateRange(startDate: string, endDate: string): DashboardDateRange {
  return {
    key: "custom",
    label: `${formatDateLabel(startDate)} — ${formatDateLabel(endDate)}`,
    startDate,
    endDate,
  };
}

export function isDateInDashboardRange(value: string | undefined, range?: DashboardDateRange) {
  if (!range) return true;
  const parsedDate = parseMockDate(value);
  if (!parsedDate) return true;
  return parsedDate >= range.startDate && parsedDate <= range.endDate;
}

function filterOrders(range?: DashboardDateRange) {
  return orders.filter((order) => isDateInDashboardRange(order.createdAt, range));
}

function filterConversations(range?: DashboardDateRange) {
  return conversations.filter((conversation) => isDateInDashboardRange(conversation.lastMessageAt, range));
}

function filterFinancialEntries(range?: DashboardDateRange) {
  return financialEntries.filter((entry) => isDateInDashboardRange(entry.occurredAt, range));
}

export const getDashboardMetrics = (range?: DashboardDateRange): DashboardMetrics => {
  const scopedOrders = filterOrders(range);
  const trackedOrders = scopedOrders.filter((order) => order.status !== "Cancelado");
  const scopedConversations = filterConversations(range);
  const scopedFinancialEntries = filterFinancialEntries(range);
  const confirmedRevenue = scopedFinancialEntries
    .filter((entry) => entry.type === "revenue" && entry.status === "confirmed")
    .reduce((total, entry) => total + entry.amount, 0);
  const confirmedOrders = trackedOrders.filter((order) => order.status !== "Processando");
  const activeCustomerIds = new Set([
    ...trackedOrders.map((order) => order.customerId),
    ...scopedConversations.map((conversation) => conversation.customerId),
  ]);
  const scopedCustomers = range
    ? customerProfiles.filter((customer) => activeCustomerIds.has(customer.id))
    : customerProfiles;
  const scopedCampaigns = range
    ? campaigns.filter((campaign) => isDateInDashboardRange(campaign.updatedAt, range))
    : campaigns;
  const answeredConversations = scopedConversations.filter((conversation) => conversation.status !== "aguardando").length;

  return {
    revenue: confirmedRevenue,
    orders: trackedOrders.length,
    customers: scopedCustomers.length,
    newCustomers: customerProfiles.filter((customer) => isDateInDashboardRange(customer.createdAt, range)).length,
    products: trackedOrders.reduce((total, order) => total + order.items, 0),
    openConversations: scopedConversations.filter((conversation) => conversation.status !== "resolvida").length,
    pendingConversations: scopedConversations.filter((conversation) => conversation.status === "aguardando").length,
    responseRate: scopedConversations.length ? Math.round((answeredConversations / scopedConversations.length) * 1000) / 10 : 0,
    campaigns: scopedCampaigns.length,
    campaignRevenue: scopedCampaigns.reduce((total, campaign) => total + campaign.revenue, 0),
    averageTicket: confirmedOrders.length ? confirmedRevenue / confirmedOrders.length : 0,
  };
};

export const getConversationChannelMetrics = (range?: DashboardDateRange) => {
  const counts: Record<ChannelId, number> = { whatsapp: 0, email: 0, outro: 0 };
  filterConversations(range).forEach((conversation) => {
    counts[conversation.channel] += 1;
  });
  const total = filterConversations(range).length || 1;
  return [
    { name: "WhatsApp", percentage: Math.round((counts.whatsapp / total) * 100), value: `${counts.whatsapp} conversas`, color: "#25D366", logo: "whatsapp" as const },
    { name: "E-mail", percentage: Math.round((counts.email / total) * 100), value: `${counts.email} conversas`, color: "#3B82F6" },
    { name: "Outros", percentage: Math.round((counts.outro / total) * 100), value: `${counts.outro} conversas`, color: "#C09B32" },
  ].filter((channel) => channel.percentage > 0);
};

export const getSalesChannelMetrics = (range?: DashboardDateRange) => {
  const bySource = new Map<string, { orders: number; revenue: number }>();
  filterOrders(range)
    .filter((order) => order.status !== "Cancelado")
    .forEach((order) => {
      const current = bySource.get(order.sourceLabel) ?? { orders: 0, revenue: 0 };
      bySource.set(order.sourceLabel, { orders: current.orders + 1, revenue: current.revenue + order.total });
    });
  const totalRevenue = Array.from(bySource.values()).reduce((total, value) => total + value.revenue, 0) || 1;
  const canonical = reportChannels
    .map((channel) => {
      const value = bySource.get(channel.label) ?? { orders: 0, revenue: 0 };
      return { ...channel, orders: value.orders, revenue: value.revenue, share: `${Math.round((value.revenue / totalRevenue) * 100)}%` };
    })
    .filter((channel) => channel.orders > 0);

  return canonical.length
    ? canonical
    : reportChannels.map((channel) => ({ ...channel, orders: 0, revenue: 0, share: "0%" }));
};

export const getRevenueTrend = (range?: DashboardDateRange): RevenueTrendPoint[] => {
  const byDate = new Map<string, number>();
  filterOrders(range)
    .filter((order) => order.status === "Entregue" || order.status === "Em trânsito")
    .forEach((order) => {
      const date = parseMockDate(order.createdAt) ?? order.createdAt;
      byDate.set(date, (byDate.get(date) ?? 0) + order.total);
    });

  return Array.from(byDate.entries())
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .map(([date, value], index) => ({
      id: `TREND-${date}`,
      label: date === DASHBOARD_REFERENCE_DATE ? "Hoje" : formatShortDate(date),
      value,
      index,
    }));
};

export function getDashboardCustomers(range?: DashboardDateRange): CustomerProfile[] {
  const scopedOrders = filterOrders(range).filter((order) => order.status !== "Cancelado");
  const scopedConversations = filterConversations(range);
  const activeCustomerIds = new Set([
    ...scopedOrders.map((order) => order.customerId),
    ...scopedConversations.map((conversation) => conversation.customerId),
  ]);
  return customerProfiles
    .filter((customer) => !range || activeCustomerIds.has(customer.id))
    .sort((first, second) => second.totalSpent - first.totalSpent)
    .slice(0, 3);
}

export function getDashboardConversations(range?: DashboardDateRange) {
  return filterConversations(range).slice(0, 3);
}

export { formatShortDate };
