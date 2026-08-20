"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCheck, ChevronDown, Mail, MessageSquare, MoreHorizontal, Paperclip, Phone, Search, Send, UserRound, Globe2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Channel = "email" | "whatsapp" | "outro";

type Conversation = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  channel: Channel;
  channelLabel: string;
  preview: string;
  time: string;
  status: "aguardando" | "atendimento" | "resolvida";
  tags: string[];
  messages: { id: number; author: "cliente" | "lojista"; text: string; time: string }[];
};

const conversations: Conversation[] = [
  {
    id: "ana-souza",
    name: "Ana Souza",
    initials: "AS",
    email: "ana.souza@email.com",
    phone: "+55 (11) 99845-1020",
    channel: "whatsapp",
    channelLabel: "WhatsApp",
    preview: "Olá! Gostaria de acompanhar a entrega do meu pedido.",
    time: "10:42",
    status: "aguardando",
    tags: ["VIP", "Mercado Livre"],
    messages: [
      { id: 1, author: "cliente", text: "Olá! Gostaria de acompanhar a entrega do meu pedido #4029.", time: "10:40" },
      { id: 2, author: "lojista", text: "Olá, Ana. Vou verificar a atualização para você.", time: "10:41" },
      { id: 3, author: "cliente", text: "Obrigada! Fico no aguardo.", time: "10:42" },
    ],
  },
  {
    id: "rafael-mendes",
    name: "Rafael Mendes",
    initials: "RM",
    email: "rafael.mendes@email.com",
    phone: "+55 (21) 98722-4410",
    channel: "whatsapp",
    channelLabel: "WhatsApp",
    preview: "A cafeteira chegou direitinho, obrigado pelo atendimento.",
    time: "09:18",
    status: "atendimento",
    tags: ["recorrente", "Shopee"],
    messages: [
      { id: 1, author: "lojista", text: "Olá, Rafael. Como podemos ajudar hoje?", time: "09:10" },
      { id: 2, author: "cliente", text: "A cafeteira chegou direitinho, obrigado pelo atendimento.", time: "09:18" },
    ],
  },
  {
    id: "camila-lima",
    name: "Camila Lima",
    initials: "CL",
    email: "camila.lima@email.com",
    phone: "+55 (31) 99182-7704",
    channel: "email",
    channelLabel: "E-mail",
    preview: "Tenho uma dúvida sobre os produtos do meu pedido.",
    time: "Ontem",
    status: "atendimento",
    tags: ["novo cliente", "E-commerce"],
    messages: [
      { id: 1, author: "cliente", text: "Tenho uma dúvida sobre os produtos do meu pedido #4031.", time: "Ontem, 16:22" },
    ],
  },
  {
    id: "joao-teixeira",
    name: "João Teixeira",
    initials: "JT",
    email: "joao.teixeira@email.com",
    phone: "+55 (41) 99671-3250",
    channel: "outro",
    channelLabel: "Outro canal",
    preview: "Interação recebida através do PDV.",
    time: "12 ago",
    status: "resolvida",
    tags: ["em risco", "PDV"],
    messages: [
      { id: 1, author: "cliente", text: "Interação recebida através do PDV.", time: "12 ago" },
      { id: 2, author: "lojista", text: "Registo recebido. Vamos manter o histórico associado ao seu perfil.", time: "12 ago" },
    ],
  },
];

const channelOptions: { id: Channel; label: string; icon: typeof Mail }[] = [
  { id: "email", label: "E-mail", icon: Mail },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "outro", label: "Outro canal", icon: Globe2 },
];

const statusLabels = { aguardando: "Aguardando resposta", atendimento: "Em atendimento", resolvida: "Resolvida" };

export function ConversationsContent() {
  const searchParams = useSearchParams();
  const initialCustomer = searchParams.get("cliente");
  const initialChannel = (searchParams.get("canal") as Channel | null) ?? "whatsapp";
  const [selectedId, setSelectedId] = useState(initialCustomer ?? conversations[0].id);
  const [activeChannel, setActiveChannel] = useState<Channel>(initialChannel);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState("");
  const [sentMessages, setSentMessages] = useState<{ text: string; time: string }[]>([]);

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return conversations;
    return conversations.filter((conversation) => `${conversation.name} ${conversation.preview} ${conversation.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const ActiveChannelIcon = channelOptions.find((channel) => channel.id === activeChannel)?.icon ?? MessageSquare;

  const handleSend = () => {
    const text = composer.trim();
    if (!text) return;
    setSentMessages((current) => [...current, { text, time: "agora" }]);
    setComposer("");
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" /> Inbox contextual do CRM</div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Atendimento e relacionamento</h2>
          <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Selecione um cliente para continuar a conversa no canal escolhido.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" /> {conversations.length} conversas no protótipo</div>
      </div>

      <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-card lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border-subtle lg:border-b-0 lg:border-r">
          <div className="border-b border-border-subtle p-4">
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar conversa..." className="auth-input h-9 pl-9 text-xs" /></div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground"><span>Conversas</span><span>{filteredConversations.length}</span></div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {filteredConversations.map((conversation) => {
              const isSelected = conversation.id === selectedConversation.id;
              const ChannelIcon = channelOptions.find((channel) => channel.id === conversation.channel)?.icon ?? MessageSquare;
              return (
                <button key={conversation.id} type="button" onClick={() => { setSelectedId(conversation.id); setActiveChannel(conversation.channel); setSentMessages([]); }} className={`w-full rounded-xl p-3 text-left transition-colors ${isSelected ? "bg-accent/10 ring-1 ring-accent/20" : "hover:bg-muted/60"}`}>
                  <div className="flex items-start gap-3">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{conversation.initials}<span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" /></div>
                    <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-bold text-foreground">{conversation.name}</p><span className="shrink-0 text-[10px] text-muted-foreground">{conversation.time}</span></div><p className="mt-1 truncate text-[11px] text-muted-foreground">{conversation.preview}</p><div className="mt-2 flex items-center gap-1.5"><ChannelIcon className="h-3 w-3 text-accent" /><span className="text-[10px] font-semibold text-muted-foreground">{conversation.channelLabel}</span></div></div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">{selectedConversation.initials}</div><div className="min-w-0"><h3 className="truncate text-sm font-bold text-foreground">{selectedConversation.name}</h3><div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground"><span>{selectedConversation.email}</span><span className="hidden sm:inline">·</span><span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {selectedConversation.phone}</span></div></div></div>
            <div className="flex items-center gap-2"><span className="hidden rounded-lg bg-success/10 px-2 py-1 text-[10px] font-bold text-success sm:inline-flex">{statusLabels[selectedConversation.status]}</span><button type="button" aria-label="Mais opções" className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div>
          </header>

          <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle bg-muted/20 px-4 py-3 sm:px-6">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Canal:</span>
            {channelOptions.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveChannel(id)} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${activeChannel === id ? "border-accent bg-accent/10 text-accent" : "border-border-subtle bg-card text-muted-foreground hover:text-foreground"}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}
            <Link href={`/clientes`} className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"><UserRound className="h-3.5 w-3.5" /> Perfil 360º <ArrowLeft className="h-3.5 w-3.5 rotate-180" /></Link>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-background/40 p-4 sm:p-6">
            <div className="flex justify-center"><span className="rounded-full border border-border-subtle bg-card px-3 py-1 text-[10px] font-semibold text-muted-foreground">Histórico da conversa</span></div>
            {selectedConversation.messages.map((message) => <div key={message.id} className={`flex ${message.author === "lojista" ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${message.author === "lojista" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border-subtle bg-card text-foreground"}`}><p className="text-xs leading-relaxed">{message.text}</p><div className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${message.author === "lojista" ? "text-primary-foreground/70" : "text-muted-foreground"}`}><span>{message.time}</span>{message.author === "lojista" ? <CheckCheck className="h-3 w-3" /> : null}</div></div></div>)}
            {sentMessages.map((message, index) => <div key={`sent-${index}`} className="flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground sm:max-w-[70%]"><p className="text-xs leading-relaxed">{message.text}</p><div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/70"><span>{message.time}</span><CheckCheck className="h-3 w-3" /></div></div></div>)}
          </div>

          <div className="border-t border-border-subtle bg-card p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground"><ActiveChannelIcon className="h-3.5 w-3.5 text-accent" /> Responder via {channelOptions.find((channel) => channel.id === activeChannel)?.label}</div><button type="button" className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground">Mensagem padrão <ChevronDown className="h-3 w-3" /></button></div>
            <div className="flex items-end gap-2"><button type="button" aria-label="Anexar ficheiro" className="mb-1 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Paperclip className="h-4 w-4" /></button><textarea value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSend(); } }} placeholder="Escreva uma resposta..." className="auth-input min-h-11 flex-1 resize-none py-3" rows={1} /><Button variant="accent" size="icon" aria-label="Enviar mensagem" onClick={handleSend}><Send className="h-4 w-4" /></Button></div>
            <p className="mt-2 text-[10px] text-muted-foreground">Enter para enviar · Shift + Enter para nova linha · envio local no protótipo</p>
          </div>
        </section>
      </div>
    </div>
  );
}
