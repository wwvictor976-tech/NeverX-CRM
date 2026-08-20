"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CreditCard, Database, ExternalLink, Mail, MessageSquare, PlugZap, Settings2, Store, X } from "lucide-react";
import { PlatformLogo, type PlatformLogoKey } from "@/components/platform-logo";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type IntegrationCategory = "vendas" | "relacionamento" | "operacao";
type IntegrationId = "ecommerce" | "nuvemshop" | "mercadolivre" | "shopify" | "shein" | "shopee" | "whatsapp" | "email" | "erp" | "pdv";

type Integration = {
  id: IntegrationId;
  category: IntegrationCategory;
  name: string;
  description: string;
  helper: string;
  icon: React.ElementType;
  iconClass: string;
  logo?: PlatformLogoKey;
  fields: string[];
};

const integrations: Integration[] = [
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

const categoryLabels: Record<IntegrationCategory, { title: string; description: string }> = {
  vendas: { title: "Canais de venda", description: "Fontes que originam clientes, pedidos e receita." },
  relacionamento: { title: "Canais de relacionamento", description: "Pontos de contacto para atendimento e comunicação." },
  operacao: { title: "Operação e dados", description: "Sistemas que complementam a visão de jornada do cliente." },
};

export function IntegrationsContent() {
  const [connected, setConnected] = useState<Set<IntegrationId>>(new Set());
  const [selectedId, setSelectedId] = useState<IntegrationId | null>(null);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const selectedIntegration = integrations.find((integration) => integration.id === selectedId) ?? null;
  const normalizedSearch = search.trim().toLowerCase();
  const visibleIntegrations = useMemo(() => integrations.filter((integration) => !normalizedSearch || `${integration.name} ${integration.description} ${integration.helper}`.toLowerCase().includes(normalizedSearch)), [normalizedSearch]);

  const handleOpen = (integration: Integration) => {
    setSelectedId(integration.id);
    setFeedback(null);
    setFormValues({});
  };

  const handleClose = () => {
    setSelectedId(null);
    setFeedback(null);
  };

  const handleConnect = () => {
    if (!selectedIntegration) return;
    setConnected((current) => {
      const next = new Set(current);
      if (next.has(selectedIntegration.id)) next.delete(selectedIntegration.id);
      else next.add(selectedIntegration.id);
      return next;
    });
    setFeedback(connected.has(selectedIntegration.id) ? "Conta desligada neste protótipo." : "Conta conectada neste protótipo. A sincronização real será activada quando a API estiver configurada.");
  };

  const renderCategory = (category: IntegrationCategory) => {
    const items = visibleIntegrations.filter((integration) => integration.category === category);
    if (!items.length) return null;
    const meta = categoryLabels[category];
    return (
      <section key={category} className="space-y-3">
        <div><h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{meta.title}</h3><p className="mt-1 text-xs text-muted-foreground">{meta.description}</p></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((integration) => {
            const Icon = integration.icon;
            const isConnected = connected.has(integration.id);
            return (
              <article key={integration.id} className={`card-surface group flex min-h-52 flex-col p-5 ${isConnected ? "border-success/30" : ""}`}>
                <div className="flex items-start justify-between gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-muted/40">{integration.logo ? <PlatformLogo platform={integration.logo} size="md" framed={false} /> : <Icon className={`h-5 w-5 ${integration.iconClass}`} />}</div><span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-bold ${isConnected ? "border-success/20 bg-success/5 text-success" : "border-border-subtle bg-muted/30 text-muted-foreground"}`}><span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-success" : "bg-muted-foreground/50"}`} />{isConnected ? "Conectado" : "Não conectado"}</span></div>
                <div className="mt-4 flex-1"><h4 className="text-sm font-bold text-foreground">{integration.name}</h4><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{integration.description}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{integration.helper}</p></div>
                <div className="mt-4 flex items-center justify-between gap-2"><button type="button" onClick={() => handleOpen(integration)} className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground transition-colors hover:text-foreground"><Settings2 className="h-3.5 w-3.5" /> Configurar</button><Button variant={isConnected ? "outline" : "accent"} size="sm" onClick={() => handleOpen(integration)} className="h-8 text-xs font-bold">{isConnected ? "Gerir conta" : "Conectar conta"}</Button></div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-7 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground"><PlugZap className="h-3.5 w-3.5 text-accent" /> Fontes da operação</div><h2 className="text-[1.85rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl">Central de conexões</h2><p className="mt-1 max-w-2xl text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">Escolha os canais que fazem parte da sua operação. Cada integração ficará preparada para relacionar pedidos, dados e conversas ao mesmo cliente.</p></div><div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> {connected.size} activas</div></div>

      <div className="data-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent"><PlugZap className="h-4 w-4" /></div><div><p className="text-xs font-bold text-foreground">Origens de dados</p><p className="text-[11px] text-muted-foreground">Conecte canais para relacionar pedidos, clientes e conversas no mesmo perfil.</p></div></div><div className="relative w-full sm:w-64"><SearchIcon /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filtrar integrações..." className="auth-input h-9 pl-9 text-xs" /></div></div>

      <div className="space-y-8">{renderCategory("vendas")}{renderCategory("relacionamento")}{renderCategory("operacao")}</div>

      <Modal
        open={!!selectedIntegration}
        onClose={handleClose}
        title={selectedIntegration ? `Conectar ${selectedIntegration.name}` : "Conectar integração"}
        description={selectedIntegration?.description}
        footer={selectedIntegration ? <><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant={connected.has(selectedIntegration.id) ? "danger" : "accent"} size="sm" onClick={handleConnect}>{connected.has(selectedIntegration.id) ? <><X className="h-3.5 w-3.5" /> Desconectar conta</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Conectar conta</>}</Button></> : null}
      >
        {selectedIntegration ? <div className="space-y-4"><div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm">{selectedIntegration.logo ? <PlatformLogo platform={selectedIntegration.logo} size="sm" framed={false} /> : <selectedIntegration.icon className={`h-5 w-5 ${selectedIntegration.iconClass}`} />}</div><div><p className="text-xs font-bold text-foreground">{selectedIntegration.name}</p><p className="text-[11px] text-muted-foreground">{selectedIntegration.helper}</p></div></div><div className="grid gap-3">{selectedIntegration.fields.map((field) => { const key = `${selectedIntegration.id}-${field}`; return <label key={field} className="space-y-1.5 text-xs font-semibold text-foreground">{field}<input value={formValues[key] ?? ""} onChange={(event) => setFormValues((current) => ({ ...current, [key]: event.target.value }))} className="auth-input" placeholder={`Informe ${field.toLowerCase()}`} /></label>; })}</div><div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground"><ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />A autenticação segura será concluída quando o provedor estiver configurado para esta conta.</div>{feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}</div> : null}
      </Modal>
    </div>
  );
}

function SearchIcon() {
  return <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}
