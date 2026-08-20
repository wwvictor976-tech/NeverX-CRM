"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CheckCheck, ChevronDown, Clock3, Globe2, Mail, MessageSquare, MoreHorizontal, Package, Paperclip, Phone, Search, Send, ShieldCheck, SlidersHorizontal, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { PlatformLogo, type PlatformLogoKey } from "@/components/platform-logo";
import { PageIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { orders } from "@/lib/crm-data";

type Channel = "email" | "whatsapp" | "outro";
type TicketStatus = "aguardando" | "atendimento" | "resolvida";
type QueueFilter = "Todos" | "Não lidos" | "Em atendimento" | "Resolvidas";

type Conversation = {
  id: string;
  ticket: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  channel: Channel;
  channelLabel: string;
  preview: string;
  time: string;
  status: TicketStatus;
  priority: "Alta" | "Normal" | "Baixa";
  tags: string[];
  assigned: string;
  sla: string;
  messages: { id: number; author: "cliente" | "lojista"; text: string; time: string }[];
};

const conversations: Conversation[] = [
  { id: "ana-souza", ticket: "#TCK-10429", name: "Ana Souza", initials: "AS", email: "ana.souza@email.com", phone: "+55 (11) 99845-1020", channel: "whatsapp", channelLabel: "WhatsApp", preview: "Olá! Gostaria de acompanhar a entrega do meu pedido.", time: "10:42", status: "aguardando", priority: "Alta", tags: ["VIP", "Mercado Livre"], assigned: "Victor Nunes", sla: "Responder em 18 min", messages: [{ id: 1, author: "cliente", text: "Olá! Gostaria de acompanhar a entrega do meu pedido #4029.", time: "10:40" }, { id: 2, author: "lojista", text: "Olá, Ana. Vou verificar a atualização para você.", time: "10:41" }, { id: 3, author: "cliente", text: "Obrigada! Fico no aguardo.", time: "10:42" }] },
  { id: "rafael-mendes", ticket: "#TCK-10428", name: "Rafael Mendes", initials: "RM", email: "rafael.mendes@email.com", phone: "+55 (21) 98722-4410", channel: "whatsapp", channelLabel: "WhatsApp", preview: "A cafeteira chegou direitinho, obrigado pelo atendimento.", time: "09:18", status: "atendimento", priority: "Normal", tags: ["Recorrente", "Shopee"], assigned: "Victor Nunes", sla: "Dentro do SLA", messages: [{ id: 1, author: "lojista", text: "Olá, Rafael. Como podemos ajudar hoje?", time: "09:10" }, { id: 2, author: "cliente", text: "A cafeteira chegou direitinho, obrigado pelo atendimento.", time: "09:18" }] },
  { id: "camila-lima", ticket: "#TCK-10427", name: "Camila Lima", initials: "CL", email: "camila.lima@email.com", phone: "+55 (31) 99182-7704", channel: "email", channelLabel: "E-mail", preview: "Tenho uma dúvida sobre os produtos do meu pedido.", time: "Ontem", status: "atendimento", priority: "Normal", tags: ["Novo cliente", "Nuvemshop"], assigned: "Marina Alves", sla: "Responder hoje", messages: [{ id: 1, author: "cliente", text: "Tenho uma dúvida sobre os produtos do meu pedido #4031.", time: "Ontem, 16:22" }] },
  { id: "joao-teixeira", ticket: "#TCK-10426", name: "João Teixeira", initials: "JT", email: "joao.teixeira@email.com", phone: "+55 (41) 99671-3250", channel: "outro", channelLabel: "Outro canal", preview: "Interação recebida através do PDV.", time: "12 ago", status: "resolvida", priority: "Baixa", tags: ["Em risco", "PDV"], assigned: "Equipe de loja", sla: "Resolvido", messages: [{ id: 1, author: "cliente", text: "Interação recebida através do PDV.", time: "12 ago" }, { id: 2, author: "lojista", text: "Registo recebido. Vamos manter o histórico associado ao seu perfil.", time: "12 ago" }] },
];

const channelOptions: { id: Channel; label: string; icon?: LucideIcon; logo?: PlatformLogoKey }[] = [
  { id: "email", label: "E-mail", icon: Mail },
  { id: "whatsapp", label: "WhatsApp", logo: "whatsapp" },
  { id: "outro", label: "Outro canal", icon: Globe2 },
];

const queueFilters: { label: string; value: QueueFilter; count: number }[] = [
  { label: "Todos", value: "Todos", count: conversations.length },
  { label: "Não lidos", value: "Não lidos", count: conversations.filter((conversation) => conversation.status === "aguardando").length },
  { label: "Em atendimento", value: "Em atendimento", count: conversations.filter((conversation) => conversation.status === "atendimento").length },
  { label: "Resolvidas", value: "Resolvidas", count: conversations.filter((conversation) => conversation.status === "resolvida").length },
];

const statusLabels: Record<TicketStatus, string> = { aguardando: "Aguardando resposta", atendimento: "Em atendimento", resolvida: "Resolvida" };
const statusTones: Record<TicketStatus, "success" | "warning" | "info"> = { aguardando: "warning", atendimento: "info", resolvida: "success" };
const priorityTones: Record<Conversation["priority"], "success" | "warning" | "danger"> = { Alta: "danger", Normal: "warning", Baixa: "success" };
const orderCurrency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ConversationsContent() {
  const searchParams = useSearchParams();
  const requestedCustomer = searchParams.get("cliente");
  const requestedChannel = searchParams.get("canal") as Channel | null;
  const initialConversation = conversations.find((conversation) => conversation.id === requestedCustomer) ?? conversations[0];
  const initialChannel = channelOptions.some((channel) => channel.id === requestedChannel) ? requestedChannel as Channel : initialConversation.channel;
  const [selectedId, setSelectedId] = useState(initialConversation.id);
  const [activeChannel, setActiveChannel] = useState<Channel>(initialChannel);
  const [query, setQuery] = useState("");
  const [queue, setQueue] = useState<QueueFilter>("Todos");
  const [composer, setComposer] = useState("");
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>(initialConversation.status);
  const [sentMessages, setSentMessages] = useState<{ text: string; time: string }[]>([]);
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const selectedOrder = orders.find((order) => order.customerId === selectedConversation.id);
  const activeChannelOption = channelOptions.find((channel) => channel.id === activeChannel) ?? channelOptions[0];

  const filteredConversations = useMemo(() => conversations.filter((conversation) => {
    const matchesSearch = `${conversation.name} ${conversation.preview} ${conversation.ticket} ${conversation.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesQueue = queue === "Todos" || (queue === "Não lidos" && conversation.status === "aguardando") || (queue === "Em atendimento" && conversation.status === "atendimento") || (queue === "Resolvidas" && conversation.status === "resolvida");
    return matchesSearch && matchesQueue;
  }), [query, queue]);

  const selectConversation = (conversation: Conversation) => {
    setSelectedId(conversation.id);
    setActiveChannel(conversation.channel);
    setTicketStatus(conversation.status);
    setSentMessages([]);
    setComposer("");
  };

  const handleSend = () => {
    const text = composer.trim();
    if (!text) return;
    setSentMessages((current) => [...current, { text, time: "agora" }]);
    setComposer("");
    setTicketStatus("atendimento");
  };

  const markResolved = () => setTicketStatus((current) => current === "resolvida" ? "atendimento" : "resolvida");

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 pb-0">
      <PageIntro
        eyebrow="Central de atendimento"
        title="Conversas"
        description="Acompanhe tickets, responda clientes e mantenha o contexto da relação num único espaço de trabalho."
        meta={<div className="flex flex-wrap items-center gap-2"><StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" /> {conversations.filter((conversation) => conversation.status !== "resolvida").length} tickets em aberto</StatusPill><StatusPill tone="danger">{conversations.filter((conversation) => conversation.priority === "Alta").length} prioridade alta</StatusPill></div>}
      />

      <div className="data-surface flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border-subtle bg-card p-3 sm:p-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="auth-input h-10 pl-9 text-xs" placeholder="Buscar por cliente, ticket ou mensagem..." /></div>
            <div className="hidden items-center gap-1.5 rounded-xl border border-border-subtle bg-muted/30 px-3 py-2 text-[10px] font-semibold text-muted-foreground sm:flex"><SlidersHorizontal className="h-3.5 w-3.5" /> Filtros da fila</div>
          </div>
          <div className="mobile-scroll-row mt-3 rounded-xl border border-border bg-background p-1">
            {queueFilters.map((filter) => <button key={filter.value} type="button" onClick={() => setQueue(filter.value)} className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold transition-colors ${queue === filter.value ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span>{filter.label}</span><span className={`rounded-md px-1.5 py-0.5 text-[9px] ${queue === filter.value ? "bg-white/10 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{filter.count}</span></button>)}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[170px_minmax(0,1fr)] overflow-hidden lg:grid-cols-[250px_minmax(0,1fr)] lg:grid-rows-1 xl:grid-cols-[280px_minmax(0,1fr)_250px]">
          <aside className="min-h-0 overflow-y-auto border-b border-border-subtle overscroll-contain lg:max-h-none lg:border-b-0 lg:border-r">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-subtle bg-card px-4 py-3"><div><p className="page-kicker">Fila de atendimento</p><p className="mt-1 text-xs font-bold text-foreground">{filteredConversations.length} tickets visíveis</p></div><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground"><Clock3 className="h-3 w-3" /> SLA</span></div>
            <div className="divide-y divide-border-subtle">
              {filteredConversations.map((conversation) => {
                const isSelected = conversation.id === selectedConversation.id;
                const channelOption = channelOptions.find((channel) => channel.id === conversation.channel) ?? channelOptions[0];
                return <button key={conversation.id} type="button" onClick={() => selectConversation(conversation)} className={`w-full border-l-2 p-3 text-left transition-colors ${isSelected ? "border-l-accent bg-accent/5" : "border-l-transparent hover:bg-muted/40"}`}><div className="flex items-start gap-3"><div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{conversation.initials}{conversation.status !== "resolvida" ? <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" /> : null}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div className="flex min-w-0 flex-wrap items-center gap-1.5"><p className="truncate text-xs font-bold text-foreground">{conversation.name}</p><StatusPill tone={priorityTones[conversation.priority]}>{conversation.priority}</StatusPill></div><span className="shrink-0 text-[10px] text-muted-foreground">{conversation.time}</span></div><p className="mt-1 truncate text-[11px] text-muted-foreground">{conversation.preview}</p><div className="mt-2 flex items-center justify-between gap-2"><span className="inline-flex min-w-0 items-center gap-1 text-[10px] font-semibold text-muted-foreground">{channelOption.logo ? <PlatformLogo platform={channelOption.logo} size="xs" framed={false} /> : channelOption.icon ? <channelOption.icon className="h-3 w-3 text-accent" /> : null}<span className="truncate">{conversation.channelLabel}</span></span><span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-muted-foreground"><Clock3 className="h-3 w-3" /> {conversation.sla.replace("Responder ", "").replace(" em ", " ")}</span></div></div></div></button>;
              })}
              {filteredConversations.length === 0 ? <div className="p-6 text-center text-xs text-muted-foreground">Nenhum ticket encontrado.</div> : null}
            </div>
          </aside>

          <section className="flex min-h-0 min-w-0 flex-col border-b border-border-subtle lg:border-b-0 xl:border-r">
            <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-4 sm:px-6"><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">{selectedConversation.initials}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-bold text-foreground">{selectedConversation.name}</h3><span className="text-[10px] font-semibold text-muted-foreground">{selectedConversation.ticket}</span></div><div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground"><span className="truncate">{selectedConversation.email}</span><span className="hidden sm:inline">·</span><span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {selectedConversation.phone}</span></div></div></div><div className="flex items-center gap-1.5"><StatusPill tone={statusTones[ticketStatus]}>{statusLabels[ticketStatus]}</StatusPill><button type="button" onClick={markResolved} className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground"><CheckCheck className="h-3 w-3" /> {ticketStatus === "resolvida" ? "Reabrir" : "Resolver"}</button><button type="button" aria-label="Mais opções do ticket" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div></header>

            <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border-subtle bg-muted/20 px-4 py-3 sm:px-6"><span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Responder por</span>{channelOptions.map(({ id, label, icon: Icon, logo }) => <button key={id} type="button" onClick={() => setActiveChannel(id)} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${activeChannel === id ? "border-accent bg-accent/10 text-accent" : "border-border-subtle bg-card text-muted-foreground hover:text-foreground"}`}>{logo ? <PlatformLogo platform={logo} size="xs" framed={false} /> : Icon ? <Icon className="h-3.5 w-3.5" /> : null}{label}</button>)}</div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border-subtle px-4 py-2.5 sm:px-6"><StatusPill tone="neutral"><UserCheck className="mr-1 h-3 w-3" /> {selectedConversation.assigned}</StatusPill>{selectedOrder ? <StatusPill tone="info"><Package className="mr-1 h-3 w-3" /> {selectedOrder.id}</StatusPill> : null}<StatusPill tone={ticketStatus === "aguardando" ? "warning" : "neutral"}><Clock3 className="mr-1 h-3 w-3" /> {selectedConversation.sla}</StatusPill></div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-background/40 p-4 sm:p-6" aria-live="polite"><div className="flex items-center justify-between gap-3"><span className="rounded-full border border-border-subtle bg-card px-3 py-1 text-[10px] font-semibold text-muted-foreground">Histórico do ticket</span><span className="text-[10px] text-muted-foreground">{selectedConversation.messages.length + sentMessages.length} mensagens</span></div>{selectedConversation.messages.map((message) => <div key={message.id} className={`flex ${message.author === "lojista" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] sm:max-w-[72%]`}><p className={`mb-1 px-1 text-[10px] font-semibold ${message.author === "lojista" ? "text-right text-muted-foreground" : "text-muted-foreground"}`}>{message.author === "lojista" ? "Você" : selectedConversation.name}</p><div className={`rounded-2xl px-4 py-3 ${message.author === "lojista" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border-subtle bg-card text-foreground"}`}><p className="text-xs leading-relaxed">{message.text}</p><div className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${message.author === "lojista" ? "text-primary-foreground/70" : "text-muted-foreground"}`}><span>{message.time}</span>{message.author === "lojista" ? <CheckCheck className="h-3 w-3" /> : null}</div></div></div></div>)}{selectedOrder ? <div className="rounded-xl border border-accent/20 bg-accent/5 p-3"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent"><ShieldCheck className="h-3.5 w-3.5" /> Pedido associado</div><div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs"><span className="font-semibold text-foreground">{selectedOrder.id} · {selectedOrder.sourceLabel} · {selectedOrder.status}</span><span className="font-bold text-foreground">{orderCurrency.format(selectedOrder.total)}</span></div><Link href="/pedidos" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-accent hover:underline">Ver detalhe do pedido <ArrowUpRight className="h-3 w-3" /></Link></div> : null}{sentMessages.map((message, index) => <div key={`sent-${index}`} className="flex justify-end"><div className="max-w-[88%] sm:max-w-[72%]"><p className="mb-1 px-1 text-right text-[10px] font-semibold text-muted-foreground">Você</p><div className="rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground"><p className="text-xs leading-relaxed">{message.text}</p><div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/70"><span>{message.time}</span><CheckCheck className="h-3 w-3" /></div></div></div></div>)}</div>

            <div className="shrink-0 border-t border-border-subtle bg-card p-4 sm:p-5"><div className="mb-2 flex items-center justify-between gap-3"><div><p className="page-kicker">Resposta</p><p className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">{activeChannelOption.logo ? <PlatformLogo platform={activeChannelOption.logo} size="xs" framed={false} /> : activeChannelOption.icon ? <activeChannelOption.icon className="h-3.5 w-3.5 text-accent" /> : null} Responder via {activeChannelOption.label}</p></div><span className="hidden text-[10px] text-muted-foreground sm:inline">Enter envia</span></div><div className="flex items-end gap-2"><button type="button" aria-label="Anexar arquivo" className="mb-1 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Paperclip className="h-4 w-4" /></button><textarea value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSend(); } }} placeholder="Escreva uma resposta para este ticket..." className="auth-input min-h-11 flex-1 resize-none py-3" rows={1} /><Button variant="accent" size="icon" aria-label="Enviar mensagem" onClick={handleSend}><Send className="h-4 w-4" /></Button></div><p className="mt-2 text-[10px] text-muted-foreground">Shift + Enter para nova linha</p></div>
          </section>

          <aside className="hidden min-h-0 overflow-y-auto overscroll-contain bg-muted/10 p-4 sm:p-5 lg:col-span-2 lg:block lg:max-h-none xl:col-span-1"><div className="flex items-center gap-2"><div className="brand-chip h-8 w-8 text-accent"><UserCheck className="h-3.5 w-3.5" /></div><div><p className="page-kicker">Contexto do cliente</p><p className="mt-1 text-xs font-bold text-foreground">Perfil e próximos passos</p></div></div><div className="mt-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">{selectedConversation.initials}</div><div className="min-w-0"><p className="truncate text-sm font-bold text-foreground">{selectedConversation.name}</p><p className="truncate text-[11px] text-muted-foreground">Cliente desde 2024</p></div></div><div className="mt-4 flex flex-wrap gap-1.5">{selectedConversation.tags.map((tag) => <span key={tag} className="rounded-lg border border-border-subtle bg-card px-2 py-1 text-[10px] font-bold text-muted-foreground">{tag}</span>)}</div><div className="mt-5 space-y-3 border-t border-border-subtle pt-4"><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Estado</span><StatusPill tone={statusTones[ticketStatus]}>{statusLabels[ticketStatus]}</StatusPill></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Prioridade</span><StatusPill tone={priorityTones[selectedConversation.priority]}>{selectedConversation.priority}</StatusPill></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Responsável</span><span className="font-semibold text-foreground">{selectedConversation.assigned}</span></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">SLA</span><span className="inline-flex items-center gap-1 font-semibold text-foreground"><Clock3 className="h-3 w-3 text-accent" /> {selectedConversation.sla}</span></div></div>{selectedOrder ? <div className="mt-5 border-t border-border-subtle pt-4"><p className="page-kicker">Último pedido</p><div className="mt-3 rounded-xl border border-border-subtle bg-card p-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-foreground">{selectedOrder.id}</p><span className="text-[10px] font-bold text-accent">{selectedOrder.sourceLabel}</span></div><p className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-foreground">{orderCurrency.format(selectedOrder.total)}</p><p className="mt-1 text-[10px] text-muted-foreground">{selectedOrder.items} itens · {selectedOrder.status}</p></div></div> : null}<div className="mt-5 space-y-2"><Link href="/clientes" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-bold text-foreground hover:bg-muted"><UserCheck className="h-3.5 w-3.5 text-muted-foreground" /> Abrir perfil 360º</Link>{selectedOrder ? <Link href="/pedidos" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-bold text-foreground hover:bg-muted"><Package className="h-3.5 w-3.5 text-muted-foreground" /> Abrir pedidos</Link> : null}</div></aside>
        </div>
      </div>
    </div>
  );
}
