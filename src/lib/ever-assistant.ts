import { campaigns, conversations, formatCurrency, orders } from "./crm-data";
import { getDashboardMetrics, getSalesChannelMetrics } from "./crm-selectors";
import type { CampaignRecord, ConversationRecord, CustomerProfile, OrderRecord } from "./crm-domain";

export type EverAction = {
  label: string;
  href: string;
};

export type EverReply = {
  text: string;
  actions?: EverAction[];
};

export type EverWorkspaceContext = {
  customers: CustomerProfile[];
  campaigns: CampaignRecord[];
  conversations: ConversationRecord[];
  orders: OrderRecord[];
};

export type EverDataSource = {
  getWorkspaceContext: () => EverWorkspaceContext;
  reply: (message: string, context: EverWorkspaceContext) => EverReply;
};

function buildWorkspaceContext(customers: CustomerProfile[], workspaceCampaigns: CampaignRecord[] = campaigns): EverWorkspaceContext {
  return { customers, campaigns: workspaceCampaigns, conversations, orders };
}

export function getEverWorkspaceContext(customers: CustomerProfile[], workspaceCampaigns: CampaignRecord[] = campaigns) {
  return buildWorkspaceContext(customers, workspaceCampaigns);
}

export function getEverReply(message: string, context: EverWorkspaceContext): EverReply {
  const query = message.trim().toLowerCase();
  const metrics = getDashboardMetrics();
  const channelMetrics = getSalesChannelMetrics().sort((first, second) => second.revenue - first.revenue);
  const openConversations = context.conversations.filter((conversation) => conversation.status !== "resolvida");
  const pendingConversations = context.conversations.filter((conversation) => conversation.status === "aguardando");
  const trackedOrders = context.orders.filter((order) => order.status !== "Cancelado");
  const customersAtRisk = context.customers.filter((customer) => customer.status === "EM_RISCO");
  const activeCampaigns = context.campaigns.filter((campaign) => campaign.status === "Ativa");
  const draftCampaigns = context.campaigns.filter((campaign) => campaign.status === "Rascunho");

  if (/^(oi|olá|ola|bom dia|boa tarde|boa noite)\b/.test(query)) {
    return {
      text: `Olá. Eu sou o Ever, seu copiloto de operação. Posso ler os sinais do workspace e apontar o próximo movimento em vendas, clientes, atendimento ou campanhas.`,
      actions: [
        { label: "Resumo da operação", href: "/dashboard" },
        { label: "Priorizar atendimento", href: "/conversas" },
      ],
    };
  }

  if (/receita|faturamento|venda|vendas|faturou|faturamento/.test(query)) {
    const topChannel = channelMetrics[0];
    return {
      text: `A receita confirmada no snapshot atual é ${formatCurrency(metrics.revenue)}, com ${metrics.orders} pedidos atribuídos e ticket médio de ${formatCurrency(metrics.averageTicket)}. ${topChannel ? `${topChannel.label} lidera a receita ligada com ${topChannel.share} do total.` : "Ainda não há canais com receita atribuída."}`,
      actions: [
        { label: "Abrir Dashboard", href: "/dashboard" },
        { label: "Ver Financeiro", href: "/financeiro" },
        { label: "Analisar canais", href: "/relatorios" },
      ],
    };
  }

  if (/cliente|clientes|base|vip|risco|recompra/.test(query)) {
    const priorityCustomer = [...context.customers].sort((first, second) => second.totalSpent - first.totalSpent)[0];
    return {
      text: `A base tem ${context.customers.length} perfis conectados. ${customersAtRisk.length ? `${customersAtRisk.length} cliente${customersAtRisk.length > 1 ? "s estão" : " está"} em risco e merece${customersAtRisk.length > 1 ? "m" : ""} uma ação de retenção.` : "Não há clientes marcados em risco no recorte atual."} ${priorityCustomer ? `O maior valor acumulado é ${priorityCustomer.name}, com ${formatCurrency(priorityCustomer.totalSpent)} em compras.` : ""}`,
      actions: [
        { label: "Abrir Clientes", href: "/clientes" },
        { label: "Ver perfis em risco", href: "/clientes?segmento=risco" },
        { label: "Planejar recompra", href: "/jornadas" },
      ],
    };
  }

  if (/conversa|conversas|atendimento|sla|ticket|tickets|fila/.test(query)) {
    const urgent = openConversations.find((conversation) => conversation.priority === "Alta");
    return {
      text: `A fila tem ${openConversations.length} tickets abertos, sendo ${pendingConversations.length} aguardando resposta. ${urgent ? `O ticket ${urgent.ticket}, de ${urgent.name}, é a prioridade mais alta e tem SLA de ${urgent.sla.toLowerCase()}.` : "Não há prioridade alta aberta agora."}`,
      actions: [
        { label: "Abrir inbox", href: "/conversas" },
        ...(urgent ? [{ label: `Atender ${urgent.name}`, href: `/conversas?cliente=${urgent.customerId}&canal=${urgent.channel}` }] : []),
      ],
    };
  }

  if (/pedido|pedidos|entrega|logística|logistica|tracking/.test(query)) {
    const inTransit = trackedOrders.filter((order) => order.status === "Em trânsito").length;
    const processing = trackedOrders.filter((order) => order.status === "Processando").length;
    return {
      text: `Existem ${trackedOrders.length} pedidos não cancelados. ${inTransit} estão em trânsito e ${processing} em processamento. O valor total identificado é ${formatCurrency(trackedOrders.reduce((sum, order) => sum + order.total, 0))}.`,
      actions: [
        { label: "Abrir Pedidos", href: "/pedidos" },
        { label: "Ver integrações", href: "/integracoes" },
      ],
    };
  }

  if (/campanha|campanhas|jornada|automação|automacao|segmento/.test(query)) {
    return {
      text: `O workspace tem ${context.campaigns.length} campanhas, com ${activeCampaigns.length} ativas e ${draftCampaigns.length} em rascunho. A próxima oportunidade é trabalhar os clientes prontos para recompra e medir o retorno por canal.`,
      actions: [
        { label: "Abrir Campanhas", href: "/campanhas" },
        { label: "Ver Jornadas", href: "/jornadas" },
        { label: "Configurar Automação", href: "/automacoes" },
      ],
    };
  }

  return {
    text: `Posso analisar receita, pedidos, clientes, risco, recompra, conversas, SLA, campanhas e canais. Escreva uma pergunta operacional, como “quais tickets devo priorizar?” ou “como estão as vendas por canal?”.`,
    actions: [
      { label: "Resumo da operação", href: "/dashboard" },
      { label: "Clientes em foco", href: "/clientes" },
      { label: "Fila de atendimento", href: "/conversas" },
    ],
  };
}

export function createLocalEverDataSource(customers: CustomerProfile[], workspaceCampaigns: CampaignRecord[] = campaigns): EverDataSource {
  return {
    getWorkspaceContext: () => getEverWorkspaceContext(customers, workspaceCampaigns),
    reply: (message, context) => getEverReply(message, context),
  };
}
