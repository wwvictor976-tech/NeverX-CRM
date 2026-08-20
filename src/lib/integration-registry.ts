import { CreditCard, Database, Mail, MessageSquare, Store, type LucideIcon } from "lucide-react";
import type { PlatformLogoKey } from "@/components/platform-logo";

export type IntegrationCategory = "vendas" | "relacionamento" | "operacao";
export type IntegrationId = "ecommerce" | "nuvemshop" | "mercadolivre" | "shopify" | "shein" | "shopee" | "whatsapp" | "email" | "erp" | "pdv";

export type IntegrationDefinition = {
  id: IntegrationId;
  category: IntegrationCategory;
  name: string;
  description: string;
  helper: string;
  icon: LucideIcon;
  iconClass: string;
  logo?: PlatformLogoKey;
  fields: string[];
};

export const integrationRegistry: IntegrationDefinition[] = [
  { id: "ecommerce", category: "vendas", name: "E-commerce próprio", description: "Sincronize clientes, pedidos e origem de compra da sua loja.", helper: "API da sua plataforma", icon: Store, iconClass: "text-accent", fields: ["Nome da loja", "URL da loja", "Chave de API"] },
  { id: "nuvemshop", category: "vendas", name: "Nuvemshop", description: "Conecte a loja Nuvemshop ao perfil unificado do consumidor.", helper: "Nuvemshop Developers API", icon: Store, iconClass: "text-accent", logo: "nuvemshop", fields: ["URL da loja", "Token de acesso"] },
  { id: "mercadolivre", category: "vendas", name: "Mercado Livre", description: "Traga vendas e clientes do maior marketplace da operação.", helper: "OAuth do Mercado Livre", icon: Store, iconClass: "text-[#FFE600]", logo: "mercadolivre", fields: ["Conta vendedora", "Ambiente de conexão"] },
  { id: "shopify", category: "vendas", name: "Shopify", description: "Conecte a loja Shopify ao perfil unificado do consumidor.", helper: "Shopify Admin API", icon: Store, iconClass: "text-[#95BF47]", logo: "shopify", fields: ["Domínio da loja", "Token de acesso"] },
  { id: "shein", category: "vendas", name: "SHEIN", description: "Associe os pedidos do marketplace aos clientes do CRM.", helper: "Conta de vendedor SHEIN", icon: Store, iconClass: "text-foreground", logo: "shein", fields: ["ID da loja", "Chave de integração"] },
  { id: "shopee", category: "vendas", name: "Shopee", description: "Centralize pedidos, canais de origem e histórico de compra.", helper: "Shopee Open Platform", icon: Store, iconClass: "text-[#EE4D2D]", logo: "shopee", fields: ["Partner ID", "Shop ID", "Chave secreta"] },
  { id: "whatsapp", category: "relacionamento", name: "WhatsApp Business", description: "Prepare o atendimento e o histórico de mensagens no CRM.", helper: "WhatsApp Business Platform", icon: MessageSquare, iconClass: "text-[#25D366]", logo: "whatsapp", fields: ["Número de telefone", "ID do WhatsApp Business", "Token de acesso"] },
  { id: "email", category: "relacionamento", name: "E-mail", description: "Conecte o canal para comunicação transacional e relacionamento.", helper: "SMTP ou provedor de e-mail", icon: Mail, iconClass: "text-blue-500", fields: ["Provedor", "E-mail de envio", "Chave ou senha"] },
  { id: "erp", category: "operacao", name: "ERP / Gateway", description: "Deixe a operação preparada para dados financeiros e logísticos.", helper: "API do sistema operacional", icon: Database, iconClass: "text-violet-500", fields: ["Sistema", "URL da API", "Chave de acesso"] },
  { id: "pdv", category: "operacao", name: "PDV", description: "Relacione compras presenciais ao histórico digital do cliente.", helper: "Ponto de venda físico", icon: CreditCard, iconClass: "text-emerald-500", fields: ["Unidade", "Código do PDV"] },
];

export const integrationCategoryLabels: Record<IntegrationCategory, { title: string; description: string }> = {
  vendas: { title: "Canais de venda", description: "Fontes que originam clientes, pedidos e receita." },
  relacionamento: { title: "Canais de relacionamento", description: "Pontos de contacto para atendimento e comunicação." },
  operacao: { title: "Operação e dados", description: "Sistemas que complementam a visão da jornada do cliente." },
};

export const orderIntegrationMap = {
  "mercado-livre": "mercadolivre",
  shopee: "shopee",
  nuvemshop: "nuvemshop",
  shein: "shein",
  ecommerce: "ecommerce",
  app: "pdv",
} as const satisfies Record<string, IntegrationId>;
