"use client";

import { useState } from "react";
import { Calendar, Download, Tag, Trash2, UserPlus } from "lucide-react";
import { CampaignModal } from "@/components/campaigns/campaign-modal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { CampaignRecord, CustomerProfile, CustomerStatus, IntegrationId } from "@/lib/crm-domain";

export type CustomerAction = "export" | "campaign" | "new" | "tag" | "delete" | null;

type CustomerSource = { id: IntegrationId; label: string; logo?: CustomerProfile["channelLogo"] };

const customerSources: CustomerSource[] = [
  { id: "ecommerce", label: "E-commerce próprio" },
  { id: "nuvemshop", label: "Nuvemshop", logo: "nuvemshop" },
  { id: "mercadolivre", label: "Mercado Livre", logo: "mercadolivre" },
  { id: "shein", label: "SHEIN", logo: "shein" },
  { id: "shopee", label: "Shopee", logo: "shopee" },
  { id: "pdv", label: "PDV" },
];

const statusByLabel: Record<string, CustomerStatus> = { "Novo cliente": "NOVO", VIP: "VIP", "Recompra pendente": "RECOMPRA_PENDENTE", "Em risco": "EM_RISCO" };

function createOfficialCustomerId() {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8).toUpperCase() : String(Date.now()).slice(-8);
  return `CUS-${suffix}`;
}

function createSlug(name: string, id: string) {
  const slug = name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return slug || `cliente-${id.toLowerCase()}`;
}

function escapeCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function CustomerActionModals({ action, selectedCustomers, visibleCustomers, onClose, onCustomerCreated, onTagSaved, onCustomersDeleted, onCampaignSaved }: { action: CustomerAction; selectedCustomers: CustomerProfile[]; visibleCustomers: CustomerProfile[]; onClose: () => void; onCustomerCreated?: (customer: CustomerProfile) => void; onTagSaved?: (tag: string) => void; onCustomersDeleted?: () => void; onCampaignSaved?: (campaign: CampaignRecord) => void }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState<IntegrationId>("ecommerce");
  const [segment, setSegment] = useState("Novo cliente");
  const [tags, setTags] = useState("");
  const [newTag, setNewTag] = useState("");

  const audience = selectedCustomers.length ? selectedCustomers : visibleCustomers;
  const resetNewCustomer = () => { setName(""); setEmail(""); setPhone(""); setSource("ecommerce"); setSegment("Novo cliente"); setTags(""); setError(null); };
  const handleClose = () => { setFeedback(null); setError(null); setNewTag(""); resetNewCustomer(); onClose(); };

  const handleCreateCustomer = () => {
    if (!name.trim() || !email.trim()) { setError("Informe pelo menos o nome e o e-mail para criar o perfil."); return; }
    if (!email.includes("@")) { setError("Informe um e-mail válido para criar o perfil."); return; }
    const id = createOfficialCustomerId();
    const sourceInfo = customerSources.find((item) => item.id === source) ?? customerSources[0];
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    const customer: CustomerProfile = {
      recordType: "customer", id, slug: createSlug(name, id), initials, name: name.trim(), email: email.trim(), phone: phone.trim() || "Não informado", cpf: "Não informado", channel: sourceInfo.label, sourcePlatform: source, sourceLabel: sourceInfo.label, channelLogo: sourceInfo.logo, ltv: "R$ 0,00", averageTicket: "R$ 0,00", orders: 0, totalSpent: 0, lastPurchase: "Sem compra", lastInteraction: "Ainda não", daysSincePurchase: "—", repurchaseDate: "A definir", createdAt: "Hoje", status: statusByLabel[segment], tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), segments: [segment], assignedTo: "Victor Nunes", notes: "Perfil criado manualmente. Completar dados quando a fonte for sincronizada.", address: { street: "Não informado", number: "—", neighborhood: "—", city: "—", state: "—", country: "Brasil", postalCode: "—" }, financial: { totalSpent: 0, orderCount: 0, averageTicket: 0, refunds: 0, currency: "BRL" }, history: [], conversationIds: [], campaignIds: [], activities: [{ id: `ACT-${Date.now()}`, type: "sistema", title: "Perfil criado", detail: "Cadastro manual preparado para sincronização.", occurredAt: "Agora" }],
    };
    onCustomerCreated?.(customer);
    setFeedback(`Perfil criado com o ID oficial ${id}.`);
  };

  const handleExport = () => {
    const rows = [["customerId", "nome", "email", "telefone", "origem", "status", "ltv", "pedidos", "última_compra"], ...audience.map((customer) => [customer.id, customer.name, customer.email, customer.phone, customer.sourceLabel, customer.status, customer.ltv, customer.orders, customer.lastPurchase])];
    const csv = rows.map((row) => row.map((value) => escapeCsv(value)).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `neverx-clientes-${selectedCustomers.length ? "selecionados" : "filtrados"}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    setFeedback(`${audience.length} ${audience.length === 1 ? "perfil exportado" : "perfis exportados"} com IDs oficiais.`);
  };

  const handleTag = () => {
    const normalizedTag = newTag.trim();
    if (!normalizedTag) { setError("Digite uma tag antes de aplicar."); return; }
    onTagSaved?.(normalizedTag);
    setFeedback(`Tag “${normalizedTag}” adicionada a ${selectedCustomers.length} ${selectedCustomers.length === 1 ? "cliente" : "clientes"}.`);
    setNewTag("");
  };

  return <>
    <Modal open={action === "export"} onClose={handleClose} title="Exportar clientes" description="Exporte a seleção atual ou todos os perfis visíveis com os IDs oficiais e os principais campos da base." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleExport}><Download className="h-3.5 w-3.5" />Baixar CSV</Button></>}><div className="space-y-4"><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-accent/30 bg-accent/5 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Escopo</p><p className="mt-1 text-lg font-black text-foreground">{audience.length}</p><p className="text-[11px] text-muted-foreground">{selectedCustomers.length ? "clientes selecionados" : "perfis visíveis"}</p></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Formato</p><p className="mt-1 text-lg font-black text-foreground">CSV</p><p className="text-[11px] text-muted-foreground">Inclui customerId oficial</p></div></div><div className="rounded-xl border border-dashed border-border-subtle p-3 text-xs leading-relaxed text-muted-foreground">Serão incluídos ID oficial, nome, contato, origem, status, LTV, pedidos e última compra.</div>{feedback ? <p role="status" className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}</div></Modal>

    <CampaignModal open={action === "campaign"} onClose={handleClose} audience={{ count: audience.length, label: selectedCustomers.length ? "clientes selecionados" : "clientes filtrados" }} customerIds={audience.map((customer) => customer.id)} onSaved={onCampaignSaved} />

    <Modal open={action === "tag"} onClose={handleClose} title="Adicionar tag" description="Organize os clientes selecionados para segmentar ações e campanhas futuras." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleTag}><Tag className="h-3.5 w-3.5" />Aplicar tag</Button></>}><div className="space-y-4"><div className="rounded-xl border border-accent/25 bg-accent/5 p-3 text-xs text-foreground"><strong>{selectedCustomers.length}</strong> {selectedCustomers.length === 1 ? "cliente selecionado" : "clientes selecionados"}</div><label className="block space-y-1.5 text-xs font-semibold text-foreground">Nova tag<input value={newTag} onChange={(event) => { setNewTag(event.target.value); setError(null); }} className="auth-input" placeholder="Ex.: campanha de inverno" autoFocus /></label>{error ? <p role="alert" className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs font-semibold text-danger">{error}</p> : null}{feedback ? <p role="status" className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}</div></Modal>

    <Modal open={action === "delete"} onClose={handleClose} title="Remover clientes selecionados" description="Esta ação remove apenas os perfis da lista local demonstrativa. Em produção, será substituída por uma operação autenticada da API." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="danger" size="sm" onClick={onCustomersDeleted}><Trash2 className="h-3.5 w-3.5" />Remover perfis</Button></>}><div className="space-y-4"><div className="rounded-xl border border-danger/20 bg-danger/5 p-4"><p className="text-sm font-bold text-foreground">{selectedCustomers.length} {selectedCustomers.length === 1 ? "perfil será removido" : "perfis serão removidos"}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Pedidos, conversas e campanhas existentes não são apagados nesta demonstração, mas deixarão de aparecer a partir desta listagem.</p></div><p className="text-xs text-muted-foreground">Revise a seleção antes de confirmar. Esta operação não pode ser desfeita nesta sessão.</p></div></Modal>

    <Modal open={action === "new"} onClose={handleClose} title="Novo cliente" description="Crie um perfil CustomerProfile com ID oficial para relacionar pedidos, conversas, campanhas e financeiro." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleCreateCustomer}><UserPlus className="h-3.5 w-3.5" />Criar perfil</Button></>}><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">Nome completo<input value={name} onChange={(event) => { setName(event.target.value); setError(null); }} className="auth-input" placeholder="Nome do cliente" autoFocus /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">E-mail<input value={email} onChange={(event) => { setEmail(event.target.value); setError(null); }} type="email" className="auth-input" placeholder="cliente@email.com" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} className="auth-input" placeholder="(00) 00000-0000" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Origem do perfil<select value={source} onChange={(event) => setSource(event.target.value as IntegrationId)} className="auth-input">{customerSources.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Segmento inicial<select value={segment} onChange={(event) => setSegment(event.target.value)} className="auth-input"><option>Novo cliente</option><option>VIP</option><option>Recompra pendente</option><option>Em risco</option></select></label><label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">Tags<div className="relative"><Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={tags} onChange={(event) => setTags(event.target.value)} className="auth-input pl-9" placeholder="Ex.: primeira compra, São Paulo" /></div></label><div className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground sm:col-span-2"><Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0" />O perfil recebe um ID oficial agora e fica pronto para receber pedidos e conversas de integrações.</div>{error ? <p role="alert" className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-xs font-semibold text-danger sm:col-span-2">{error}</p> : null}{feedback ? <p role="status" className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success sm:col-span-2">{feedback}</p> : null}</div></Modal>
  </>;
}
