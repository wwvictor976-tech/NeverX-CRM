import { campaigns, conversations, customerProfiles, financialEntries, orders, reportChannels } from "./crm-data";
import type { ChannelId } from "./crm-domain";

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

export const getDashboardMetrics = (): DashboardMetrics => {
  const confirmedRevenue = financialEntries.filter((entry) => entry.type === "revenue" && entry.status === "confirmed").reduce((total, entry) => total + entry.amount, 0);
  const trackedOrders = orders.filter((order) => order.status !== "Cancelado");
  const answeredConversations = conversations.filter((conversation) => conversation.status !== "aguardando").length;
  return {
    revenue: confirmedRevenue,
    orders: trackedOrders.length,
    customers: customerProfiles.length,
    newCustomers: customerProfiles.filter((customer) => customer.status === "NOVO").length,
    products: trackedOrders.reduce((total, order) => total + order.items, 0),
    openConversations: conversations.filter((conversation) => conversation.status !== "resolvida").length,
    pendingConversations: conversations.filter((conversation) => conversation.status === "aguardando").length,
    responseRate: conversations.length ? Math.round((answeredConversations / conversations.length) * 1000) / 10 : 0,
    campaigns: campaigns.length,
    campaignRevenue: campaigns.reduce((total, campaign) => total + campaign.revenue, 0),
    averageTicket: trackedOrders.length ? confirmedRevenue / trackedOrders.length : 0,
  };
};

export const getConversationChannelMetrics = () => {
  const counts: Record<ChannelId, number> = { whatsapp: 0, email: 0, outro: 0 };
  conversations.forEach((conversation) => { counts[conversation.channel] += 1; });
  const total = conversations.length || 1;
  return [
    { name: "WhatsApp", percentage: Math.round((counts.whatsapp / total) * 100), value: `${counts.whatsapp} conversas`, color: "#25D366", logo: "whatsapp" as const },
    { name: "E-mail", percentage: Math.round((counts.email / total) * 100), value: `${counts.email} conversas`, color: "#3B82F6" },
    { name: "Outros", percentage: Math.round((counts.outro / total) * 100), value: `${counts.outro} conversas`, color: "#C09B32" },
  ].filter((channel) => channel.percentage > 0);
};

export const getSalesChannelMetrics = () => {
  const bySource = new Map<string, { orders: number; revenue: number }>();
  orders.filter((order) => order.status !== "Cancelado").forEach((order) => {
    const current = bySource.get(order.sourceLabel) ?? { orders: 0, revenue: 0 };
    bySource.set(order.sourceLabel, { orders: current.orders + 1, revenue: current.revenue + order.total });
  });
  const totalRevenue = Array.from(bySource.values()).reduce((total, value) => total + value.revenue, 0) || 1;
  const canonical = reportChannels.map((channel) => {
    const value = bySource.get(channel.label) ?? { orders: 0, revenue: 0 };
    return { ...channel, orders: value.orders, revenue: value.revenue, share: `${Math.round((value.revenue / totalRevenue) * 100)}%` };
  }).filter((channel) => channel.orders > 0);
  return canonical.length ? canonical : reportChannels;
};

export const getRevenueTrend = () => orders.filter((order) => order.status === "Entregue" || order.status === "Em trânsito").map((order, index) => ({ id: order.id, label: order.createdAt.split(",")[0], value: order.total, index }));
