"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight, Calendar, Check, ChevronRight, CircleDollarSign, Clock3, Copy, Globe2, Mail, MessageSquare, Package, Phone, Plus, ShoppingBag, Smartphone, Tag, TrendingUp, UserCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformLogo } from "@/components/platform-logo";
import { campaigns, conversations, formatCurrency, orders } from "@/lib/crm-data";
import type { CustomerProfile, OrderStatus } from "@/lib/crm-domain";

type TabType = "overview" | "orders" | "relations" | "activity";

type CustomerDetailsSheetProps = {
  customer: CustomerProfile | null;
  isOpen?: boolean;
  onClose: () => void;
  onStartConversation: (channel: "email" | "whatsapp" | "outro") => void;
};

const statusConfig: Record<CustomerProfile["status"], { label: string; tone: string; dot: string }> = {
  VIP: { label: "Cliente VIP", tone: "bg-purple-500/10 text-purple-700 border-purple-500/20", dot: "bg-purple-500" },
  RECOMPRA_PENDENTE: { label: "Recompra pendente", tone: "bg-amber-500/10 text-amber-700 border-amber-500/20", dot: "bg-amber-500" },
  NOVO: { label: "Novo cliente", tone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", dot: "bg-emerald-500" },
  EM_RISCO: { label: "Em risco", tone: "bg-rose-500/10 text-rose-700 border-rose-500/20", dot: "bg-rose-500" },
};

const orderStatusStyles: Record<OrderStatus, string> = {
  Entregue: "border-success/20 bg-success/5 text-success",
  "Em trânsito": "border-blue-500/20 bg-blue-500/5 text-blue-700",
  Processando: "border-accent/25 bg-accent/5 text-accent",
  Cancelado: "border-danger/20 bg-danger/5 text-danger",
};

export function CustomerDetailsSheet({ customer, isOpen = false, onClose, onStartConversation }: CustomerDetailsSheetProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const customerOrders = useMemo(() => customer ? orders.filter((order) => order.customerId === customer.id) : [], [customer]);
  const customerConversations = useMemo(() => customer ? conversations.filter((conversation) => conversation.customerId === customer.id) : [], [customer]);
  const customerCampaigns = useMemo(() => customer ? campaigns.filter((campaign) => campaign.customerIds.includes(customer.id)) : [], [customer]);

  if (!isOpen || !customer) return null;

  const status = statusConfig[customer.status];
  const copyValue = (value: string, field: string) => {
    void navigator.clipboard?.writeText(value);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 1800);
  };
  const sourceLogo = customer.channelLogo;
  const SourceFallback = customer.sourcePlatform === "pdv" ? Smartphone : Globe2;

  return <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="customer-sheet-title">
    <button type="button" aria-label="Fechar perfil" onClick={onClose} className="fixed inset-0 cursor-default bg-foreground/25 backdrop-blur-[2px]" />
    <aside className="relative z-10 flex h-full w-full max-w-3xl flex-col border-l border-border bg-card shadow-2xl">
      <header className="shrink-0 border-b border-border-subtle bg-card px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-center gap-3 sm:gap-4"><div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-base font-black text-accent ring-1 ring-accent/20 sm:h-14 sm:w-14 sm:text-lg">{customer.initials}<span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ring-2 ring-card ${status.dot}`} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 id="customer-sheet-title" className="truncate text-lg font-extrabold tracking-tight text-foreground sm:text-xl">{customer.name}</h2><span className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold ${status.tone}`}><span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />{status.label}</span></div><div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground"><span className="font-semibold text-foreground">{customer.id}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1">{sourceLogo ? <PlatformLogo platform={sourceLogo} size="xs" framed={false} /> : <SourceFallback className="h-3 w-3" />} {customer.sourceLabel}</span></div></div></div><button type="button" onClick={onClose} aria-label="Fechar perfil" className="rounded-xl border border-border-subtle p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><X className="h-4 w-4" /></button></div>
        <div className="mobile-scroll-row mt-4 border-t border-border-subtle pt-3"><Button size="sm" variant="accent" onClick={() => onStartConversation("whatsapp")} className="h-8 shrink-0 gap-1.5 text-xs"><MessageSquare className="h-3.5 w-3.5" /> WhatsApp</Button><Button size="sm" variant="outline" onClick={() => onStartConversation("email")} className="h-8 shrink-0 gap-1.5 text-xs"><Mail className="h-3.5 w-3.5" /> E-mail</Button><Button size="sm" variant="outline" onClick={() => onStartConversation("outro")} className="h-8 shrink-0 gap-1.5 text-xs"><Globe2 className="h-3.5 w-3.5" /> Outro canal</Button><Button size="sm" variant="ghost" onClick={() => copyValue(JSON.stringify(customer, null, 2), "profile")} className="h-8 shrink-0 gap-1.5 text-xs">{copiedField === "profile" ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />} {copiedField === "profile" ? "Perfil copiado" : "Copiar perfil"}</Button></div>
      </header>

      <div className="grid shrink-0 grid-cols-2 gap-px border-b border-border-subtle bg-border-subtle sm:grid-cols-4"><CustomerMetric label="LTV histórico" value={customer.ltv} /><CustomerMetric label="Ticket médio" value={customer.averageTicket} /><CustomerMetric label="Pedidos" value={`${customer.orders}`} helper="compras" /><CustomerMetric label="Última compra" value={customer.lastPurchase} /></div>

      <nav className="shrink-0 overflow-x-auto border-b border-border-subtle bg-card px-3 sm:px-5" aria-label="Secções do perfil"><div className="flex min-w-max gap-1">{([{ id: "overview", label: "Resumo", icon: UserCheck }, { id: "orders", label: `Pedidos (${customerOrders.length})`, icon: ShoppingBag }, { id: "relations", label: "Relações", icon: LinkIcon }, { id: "activity", label: "Timeline", icon: Activity }] as const).map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-xs font-bold transition-colors ${activeTab === id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}</div></nav>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === "overview" ? <div className="space-y-6"><SheetSection eyebrow="Identidade e contacto" title="Dados principais"><div className="grid gap-3 sm:grid-cols-2"><InfoCard icon={Mail} label="E-mail" value={customer.email} action={() => copyValue(customer.email, "email")} copied={copiedField === "email"} /><InfoCard icon={Phone} label="Telefone" value={customer.phone} action={() => copyValue(customer.phone, "phone")} copied={copiedField === "phone"} /><InfoCard icon={Globe2} label="Localização" value={`${customer.address.city} · ${customer.address.state}`} helper={`${customer.address.country} · ${customer.address.postalCode}`} /><InfoCard icon={Calendar} label="Cliente desde" value={customer.createdAt} helper={`Última interação: ${customer.lastInteraction}`} /></div></SheetSection><SheetSection eyebrow="Saúde da relação" title="Ciclo de vida"><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-accent/20 bg-accent/5 p-4"><div className="flex items-center justify-between"><p className="text-xs font-bold text-foreground">Próxima recompra</p><Clock3 className="h-4 w-4 text-accent" /></div><p className="mt-3 text-lg font-extrabold text-foreground">{customer.repurchaseDate}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Estimativa baseada no intervalo de compras identificado.</p></div><div className="rounded-2xl border border-border-subtle bg-card p-4"><div className="flex items-center justify-between"><p className="text-xs font-bold text-foreground">Responsável</p><UserCheck className="h-4 w-4 text-muted-foreground" /></div><p className="mt-3 text-sm font-extrabold text-foreground">{customer.assignedTo}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Acompanha este relacionamento no workspace.</p></div></div></SheetSection><SheetSection eyebrow="Segmentação" title="Tags e grupos" action={<button type="button" className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"><Plus className="h-3 w-3" /> Adicionar tag</button>}><div className="flex flex-wrap gap-2">{[...customer.segments, ...customer.tags].map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-muted/40 px-2.5 py-1.5 text-[11px] font-bold text-muted-foreground"><Tag className="h-3 w-3" />{tag}</span>)}</div></SheetSection><SheetSection eyebrow="Observações" title="Nota interna"><div className="rounded-2xl border border-border-subtle bg-muted/20 p-4"><p className="text-xs leading-relaxed text-foreground">{customer.notes}</p></div></SheetSection></div> : null}

        {activeTab === "orders" ? <div className="space-y-4"><SheetSection eyebrow="Histórico de compras" title="Pedidos ligados ao cliente" description="A relação é feita pelo customerId oficial deste perfil."><div className="space-y-3">{customerOrders.length ? customerOrders.map((order) => <Link href={`/pedidos?pedido=${encodeURIComponent(order.id)}`} key={order.id} className="group flex items-center gap-3 rounded-2xl border border-border-subtle bg-card p-4 transition-colors hover:border-accent/40 hover:bg-muted/20"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><Package className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-extrabold text-foreground">{order.id}</p><span className={`rounded-lg border px-2 py-1 text-[9px] font-bold ${orderStatusStyles[order.status]}`}>{order.status}</span></div><p className="mt-1 truncate text-[11px] text-muted-foreground">{order.sourceLabel} · {order.items} {order.items === 1 ? "item" : "itens"} · {order.createdAt}</p><p className="mt-1 text-[10px] text-muted-foreground">Tracking: {order.tracking}</p></div><div className="text-right"><p className="text-sm font-extrabold text-foreground">{formatCurrency(order.total)}</p><ChevronRight className="ml-auto mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" /></div></Link>) : <EmptyRelation icon={ShoppingBag} title="Nenhum pedido ligado" description="Os pedidos sincronizados para este customerId aparecerão aqui." />}</div></SheetSection></div> : null}

        {activeTab === "relations" ? <div className="space-y-6"><SheetSection eyebrow="Atendimento" title="Conversas associadas"><div className="space-y-3">{customerConversations.length ? customerConversations.map((conversation) => <Link href={`/conversas?cliente=${conversation.customerId}`} key={conversation.id} className="group flex items-center gap-3 rounded-2xl border border-border-subtle bg-card p-4 hover:border-accent/40"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><MessageSquare className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-xs font-extrabold text-foreground">{conversation.ticket}</p><span className="text-[10px] text-muted-foreground">{conversation.channelLabel}</span></div><p className="mt-1 truncate text-[11px] text-muted-foreground">{conversation.preview}</p></div><span className="text-[10px] font-bold text-accent">Abrir</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link>) : <EmptyRelation icon={MessageSquare} title="Nenhuma conversa associada" description="As conversas que usarem este customerId aparecerão aqui." />}</div></SheetSection><SheetSection eyebrow="Campanhas" title="Participação e alcance"><div className="space-y-3">{customerCampaigns.length ? customerCampaigns.map((campaign) => <div key={campaign.id} className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-card p-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><TrendingUp className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-foreground">{campaign.name}</p><p className="mt-1 text-[11px] text-muted-foreground">{campaign.channel} · {campaign.status} · {campaign.updatedAt}</p></div><p className="text-xs font-extrabold text-foreground">{campaign.revenue ? formatCurrency(campaign.revenue) : "—"}</p></div>) : <EmptyRelation icon={TrendingUp} title="Nenhuma campanha ligada" description="A participação em campanhas será relacionada pelo customerId." />}</div></SheetSection><SheetSection eyebrow="Financeiro" title="Resumo do cliente"><div className="grid gap-3 sm:grid-cols-3"><StatBlock icon={CircleDollarSign} label="Total comprado" value={formatCurrency(customer.financial.totalSpent)} /><StatBlock icon={ShoppingBag} label="Pedidos" value={String(customer.financial.orderCount)} /><StatBlock icon={TrendingUp} label="Reembolsos" value={formatCurrency(customer.financial.refunds)} /></div></SheetSection></div> : null}

        {activeTab === "activity" ? <div className="space-y-4"><SheetSection eyebrow="Histórico completo" title="Timeline do relacionamento" description="Actividades de pedidos, conversas, campanhas e notas associadas ao perfil."><div className="relative space-y-5 border-l border-border pl-5">{customer.activities.map((activity) => <div key={activity.id} className="relative"><span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-card" /><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-extrabold text-foreground">{activity.title}</p><span className="text-[10px] font-semibold text-muted-foreground">{activity.occurredAt}</span></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{activity.detail}</p><span className="mt-2 inline-flex rounded-md bg-muted px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{activity.type}</span></div>)}</div></SheetSection></div> : null}
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border-subtle bg-card p-4 sm:px-6"><div className="hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex"><ShieldIcon /> ID oficial utilizado em pedidos, conversas e campanhas</div><div className="ml-auto flex items-center gap-2"><Button variant="outline" size="sm" onClick={onClose}>Fechar</Button><Button variant="accent" size="sm" onClick={() => onStartConversation("whatsapp")}><MessageSquare className="h-3.5 w-3.5" /> Iniciar atendimento</Button></div></footer>
    </aside>
  </div>;
}

function CustomerMetric({ label, value, helper }: { label: string; value: string; helper?: string }) { return <div className="bg-card px-3 py-3 sm:px-5"><p className="page-kicker truncate">{label}</p><p className="mt-1 truncate text-sm font-extrabold text-foreground sm:text-base">{value}</p>{helper ? <p className="mt-0.5 text-[10px] text-muted-foreground">{helper}</p> : null}</div>; }
function SheetSection({ eyebrow, title, description, action, children }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode; children: React.ReactNode }) { return <section className="space-y-3"><div className="flex items-end justify-between gap-3"><div><p className="page-kicker">{eyebrow}</p><h3 className="mt-1 text-sm font-extrabold tracking-tight text-foreground">{title}</h3>{description ? <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{description}</p> : null}</div>{action ? <div className="shrink-0">{action}</div> : null}</div>{children}</section>; }
function InfoCard({ icon: Icon, label, value, helper, action, copied }: { icon: typeof Mail; label: string; value: string; helper?: string; action?: () => void; copied?: boolean }) { return <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border-subtle bg-muted/20 p-3"><div className="brand-chip text-muted-foreground"><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-[10px] font-semibold text-muted-foreground">{label}</p><p className="truncate text-xs font-bold text-foreground">{value}</p>{helper ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{helper}</p> : null}</div>{action ? <button type="button" onClick={action} aria-label={`Copiar ${label}`} className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground">{copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}</button> : null}</div>; }
function EmptyRelation({ icon: Icon, title, description }: { icon: typeof ShoppingBag; title: string; description: string }) { return <div className="rounded-2xl border border-dashed border-border-subtle bg-muted/10 p-6 text-center"><Icon className="mx-auto h-7 w-7 text-muted-foreground/50" /><p className="mt-2 text-xs font-bold text-foreground">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{description}</p></div>; }
function StatBlock({ icon: Icon, label, value }: { icon: typeof CircleDollarSign; label: string; value: string }) { return <div className="rounded-2xl border border-border-subtle bg-muted/20 p-3"><Icon className="h-4 w-4 text-accent" /><p className="mt-3 text-[10px] font-semibold text-muted-foreground">{label}</p><p className="mt-1 text-sm font-extrabold text-foreground">{value}</p></div>; }
function LinkIcon({ className }: { className?: string }) { return <ArrowUpRight className={className} />; }
function ShieldIcon() { return <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-success/10 text-success">✓</span>; }
