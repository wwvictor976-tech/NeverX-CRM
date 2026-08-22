"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, ChevronRight, Clock3, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useCrmWorkspace } from "@/components/crm/crm-workspace-context";
import { createLocalEverDataSource, type EverAction } from "@/lib/ever-assistant";

interface EverPanelProps {
  open: boolean;
  onClose: () => void;
}

type EverMessage = {
  id: string;
  role: "ever" | "user";
  text: string;
  actions?: EverAction[];
};

const starterMessage: EverMessage = {
  id: "ever-welcome",
  role: "ever",
  text: "Olá. Eu sou o Ever, seu copiloto de operação. Posso ler os sinais do workspace e apontar o próximo movimento em vendas, clientes, atendimento ou campanhas.",
  actions: [
    { label: "Resumo da operação", href: "/dashboard" },
    { label: "Priorizar atendimento", href: "/conversas" },
  ],
};

const suggestedPrompts = [
  "Quais tickets devo priorizar?",
  "Como estão as vendas por canal?",
  "Quais clientes precisam de atenção?",
];

export function EverPanel({ open, onClose }: EverPanelProps) {
  const { customers, campaigns } = useCrmWorkspace();
  const ever = useMemo(() => createLocalEverDataSource(customers, campaigns), [campaigns, customers]);
  const [messages, setMessages] = useState<EverMessage[]>([starterMessage]);
  const [composer, setComposer] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => composerRef.current?.focus(), 120);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const sendMessage = (value = composer) => {
    const text = value.trim();
    if (!text || isThinking) return;
    const context = ever.getWorkspaceContext();
    const reply = ever.reply(text, context);
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text },
    ]);
    setComposer("");
    setIsThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: `ever-${Date.now()}`, role: "ever", text: reply.text, actions: reply.actions }]);
      setIsThinking(false);
    }, 420);
  };

  if (!open) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 z-[68] cursor-default bg-foreground/25 backdrop-blur-[2px]" onClick={onClose} aria-label="Fechar Ever" />
      <aside className="fixed inset-y-0 right-0 z-[69] flex w-full max-w-[440px] flex-col border-l border-border bg-card shadow-[-24px_0_64px_-28px_rgba(20,22,25,0.4)] animate-in slide-in-from-right duration-200" role="dialog" aria-modal="true" aria-labelledby="ever-title">
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-4 py-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-foreground text-primary-foreground"><Sparkles className="h-4 w-4 text-accent" /><span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-card" /></div>
            <div className="min-w-0"><div className="flex items-center gap-2"><h2 id="ever-title" className="text-sm font-extrabold tracking-tight text-foreground">Ever</h2><span className="rounded-full bg-success/10 px-2 py-1 text-[9px] font-bold text-success">Online</span></div><p className="mt-1 truncate text-[11px] text-muted-foreground">Copiloto inteligente do seu workspace</p></div>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar Ever" className="rounded-xl border border-border-subtle p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><X className="h-4 w-4" /></button>
        </header>

        <div className="flex shrink-0 items-center gap-3 border-b border-border-subtle bg-muted/20 px-4 py-3 sm:px-5"><div className="brand-chip text-accent"><Bot className="h-4 w-4" /></div><p className="text-[11px] leading-relaxed text-muted-foreground">O Ever usa o contexto disponível no CRM para sugerir próximos passos. Confirme decisões antes de executá-las.</p></div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
          {messages.map((message) => <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] ${message.role === "user" ? "items-end" : "items-start"}`}><div className={`flex items-center gap-1.5 px-1 text-[10px] font-bold ${message.role === "user" ? "justify-end text-muted-foreground" : "text-accent"}`}>{message.role === "ever" ? <><Sparkles className="h-3 w-3" /> Ever</> : "Você"}</div><div className={`mt-1 rounded-2xl px-4 py-3 text-xs leading-relaxed ${message.role === "user" ? "rounded-br-md bg-foreground text-primary-foreground" : "rounded-bl-md border border-border-subtle bg-background text-foreground"}`}>{message.text}</div>{message.actions?.length ? <div className="mt-2 flex flex-wrap gap-1.5">{message.actions.map((action) => <Link key={action.href + action.label} href={action.href} onClick={onClose} className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-card px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-foreground">{action.label}<ArrowUpRight className="h-3 w-3 text-accent" /></Link>)}</div> : null}</div></div>)}
          {isThinking ? <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground"><span className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent/10 text-accent"><Sparkles className="h-3.5 w-3.5 animate-pulse" /></span>O Ever está analisando o workspace...</div> : null}
        </div>

        <div className="shrink-0 border-t border-border-subtle bg-card px-4 py-3 sm:px-5"><div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">{suggestedPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={isThinking} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-subtle bg-muted/30 px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"><MessageCircle className="h-3 w-3 text-accent" />{prompt}</button>)}</div><div className="rounded-2xl border border-border bg-background p-2 transition-colors focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/10"><textarea ref={composerRef} value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={2} className="w-full resize-none border-0 bg-transparent px-2 py-1.5 text-xs leading-relaxed text-foreground outline-none placeholder:text-muted-foreground" placeholder="Pergunte ao Ever sobre a operação..." aria-label="Mensagem para o Ever" /><div className="flex items-center justify-between gap-2 px-2 pt-1"><span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Clock3 className="h-3 w-3" /> Enter envia · Shift + Enter quebra linha</span><button type="button" onClick={() => sendMessage()} disabled={!composer.trim() || isThinking} className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-primary-foreground transition-all hover:bg-foreground/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Enviar mensagem para o Ever"><Send className="h-3.5 w-3.5" /></button></div></div><p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">Ever opera com dados do workspace atual. A conexão com um modelo generativo seguro entra pela camada de serviço/API.</p></div>
      </aside>
    </>
  );
}
