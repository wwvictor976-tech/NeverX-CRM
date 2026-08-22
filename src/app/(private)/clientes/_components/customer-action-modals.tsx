"use client";

import { useState } from "react";
import { Calendar, Download, Tag, UserPlus } from "lucide-react";
import { CampaignModal } from "@/components/campaigns/campaign-modal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { CustomerProfile, CustomerStatus, IntegrationId } from "@/lib/crm-domain";

export type CustomerAction = "export" | "campaign" | "new" | null;

const customerSources: { id: IntegrationId; label: string; logo?: CustomerProfile["channelLogo"] }[] = [
  { id: "ecommerce", label: "E-commerce próprio" },
  { id: "nuvemshop", label: "Nuvemshop", logo: "nuvemshop" },
  { id: "mercadolivre", label: "Mercado Livre", logo: "mercadolivre" },
  { id: "shein", label: "SHEIN", logo: "shein" },
  { id: "shopee", label: "Shopee", logo: "shopee" },
  { id: "pdv", label: "PDV" },
];

const statusByLabel: Record<string, CustomerStatus> = { "Novo cliente": "NOVO", VIP: "VIP", "Recompra pendente": "RECOMPRA_PENDENTE" };

function createOfficialCustomerId() {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8).toUpperCase() : String(Date.now()).slice(-8);
  return `CUS-${suffix}`;
}

function createSlug(name: string, id: string) {
  const slug = name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return slug || `cliente-${id.toLowerCase()}`;
}

export function CustomerActionModals({ action, selectedCount, onClose, onCustomerCreated }: { action: CustomerAction; selectedCount: number; onClose: () => void; onCustomerCreated?: (customer: CustomerProfile) => void }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState<IntegrationId>("ecommerce");
  const [segment, setSegment] = useState("Novo cliente");
  const [tags, setTags] = useState("");

  const resetNewCustomer = () => { setName(""); setEmail(""); setPhone(""); setSource("ecommerce"); setSegment("Novo cliente"); setTags(""); setError(null); };
  const handleClose = () => { setFeedback(null); setError(null); resetNewCustomer(); onClose(); };
  const handleCreateCustomer = () => {
    if (!name.trim() || !email.trim()) { setError("Informe pelo menos o nome e o e-mail para criar o perfil."); return; }
    const id = createOfficialCustomerId();
    const sourceInfo = customerSources.find((item) => item.id === source) ?? customerSources[0];
    const customer: CustomerProfile = {
      recordType: "customer", id, slug: createSlug(name, id), initials: name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(), name: name.trim(), email: email.trim(), phone: phone.trim() || "Não informado", cpf: "Não informado", channel: sourceInfo.label, sourcePlatform: source, sourceLabel: sourceInfo.label, channelLogo: sourceInfo.logo, ltv: "R$ 0,00", averageTicket: "R$ 0,00", orders: 0, totalSpent: 0, lastPurchase: "Sem compra", lastInteraction: "Ainda não", daysSincePurchase: "—", repurchaseDate: "A definir", createdAt: "Hoje", status: statusByLabel[segment], tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), segments: [segment], assignedTo: "Victor Nunes", notes: "Perfil criado manualmente. Completar dados quando a fonte for sincronizada.", address: { street: "Não informado", number: "—", neighborhood: "—", city: "—", state: "—", country: "Brasil", postalCode: "—" }, financial: { totalSpent: 0, orderCount: 0, averageTicket: 0, refunds: 0, currency: "BRL" }, history: [], conversationIds: [], campaignIds: [], activities: [{ id: `ACT-${Date.now()}`, type: "sistema", title: "Perfil criado", detail: "Cadastro manual preparado para sincronização.", occurredAt: "Agora" }],
    };
    onCustomerCreated?.(customer);
    setFeedback(`Perfil criado com o ID oficial ${id}.`);
  };

  return <><Modal open={action === "export"} onClose={handleClose} title="Exportar clientes" description="Exporte os clientes visíveis ou a seleção atual para continuar a análise noutro sistema." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={() => setFeedback("Arquivo preparado com os IDs oficiais e campos visíveis da listagem.")}><Download className="h-3.5 w-3.5" /> Preparar CSV</Button></>}><div className="space-y-4"><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-accent/30 bg-accent/5 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Escopo selecionado</p><p className="mt-1 text-lg font-black text-foreground">{selectedCount || "Todos"}</p><p className="text-[11px] text-muted-foreground">{selectedCount ? "clientes selecionados" : "clientes filtrados"}</p></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Formato</p><p className="mt-1 text-lg font-black text-foreground">CSV</p><p className="text-[11px] text-muted-foreground">Inclui customerId oficial</p></div></div><div className="rounded-xl border border-dashed border-border-subtle p-3 text-xs leading-relaxed text-muted-foreground">Serão incluídos ID oficial, nome, e-mail, telefone, canal, status, LTV, pedidos e última compra.</div>{feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}</div></Modal><CampaignModal open={action === "campaign"} onClose={handleClose} audience={{ count: selectedCount, label: "clientes selecionados" }} /><Modal open={action === "new"} onClose={handleClose} title="Novo cliente" description="Crie um perfil CustomerProfile com ID oficial para relacionar pedidos, conversas, campanhas e financeiro." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleCreateCustomer}><UserPlus className="h-3.5 w-3.5" /> Criar perfil</Button></>}><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">Nome completo<input value={name} onChange={(event) => setName(event.target.value)} className="auth-input" placeholder="Nome do cliente" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">E-mail<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="auth-input" placeholder="cliente@email.com" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} className="auth-input" placeholder="(00) 00000-0000" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Origem do perfil<select value={source} onChange={(event) => setSource(event.target.value as IntegrationId)} className="auth-input">{customerSources.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Segmento inicial<select value={segment} onChange={(event) => setSegment(event.target.value)} className="auth-input"><option>Novo cliente</option><option>VIP</option><option>Recompra pendente</option></select></label><label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">Tags<div className="relative"><Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={tags} onChange={(event) => setTags(event.target.value)} className="auth-input pl-9" placeholder="Ex.: primeira compra, São Paulo" /></div></label><div className="flex items-center gap-2 text-[11px] leading-relaxed text-muted-foreground sm:col-span-2"><Calendar className="h-3.5 w-3.5 shrink-0" /> O perfil recebe um ID oficial agora e fica pronto para receber pedidos e conversas de integrações futuras.</div>{error ? <p className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs font-semibold text-danger sm:col-span-2">{error}</p> : null}{feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success sm:col-span-2">{feedback}</p> : null}</div></Modal></>;
}
