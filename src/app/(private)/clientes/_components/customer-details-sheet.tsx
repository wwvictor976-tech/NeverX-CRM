"use client";

import { useState } from "react";
import {
  Mail,
  Package,
  Phone,
  Tag,
  X,
  Clock,
  Send,
  Plus,
  Check,
  ExternalLink,
  Calendar,
  Sparkles,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { CustomerStatusBadge } from "./customer-status-badge";
import type { Customer } from "./customers-table";

interface CustomerDetailsSheetProps {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerDetailsSheet({ customer, onClose }: CustomerDetailsSheetProps) {
  const [note, setNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  if (!customer) return null;

  const ChannelIcon = customer.channelIcon;

  const handleSaveNote = () => {
    if (!note.trim()) return;
    setIsSavingNote(true);
    setTimeout(() => {
      setIsSavingNote(false);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop com Blur e Animação suave */}
      <button
        type="button"
        aria-label="Fechar detalhes do cliente"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel Lateral */}
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-border-subtle bg-card shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border-subtle bg-card/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Visão 360° do Cliente
              </p>
              <h2 className="text-base font-extrabold text-foreground">
                Ficha de Relacionamento
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Conteúdo Rolável */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6">
          
          {/* Card de Perfil & Ações Rápidas */}
          <section className="rounded-2xl border border-border-subtle bg-background/50 p-4 space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-lg font-black text-accent shadow-xs">
                {customer.initials}
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border-subtle text-[10px]">
                  <ChannelIcon className={`h-3 w-3 ${customer.channelColor}`} />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-foreground truncate">
                    {customer.name}
                  </h3>
                  <CustomerStatusBadge status={customer.status} />
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  <span>Cliente desde Mar/2023</span>
                  <span>•</span>
                  <span className="font-semibold text-foreground">{customer.channel}</span>
                </p>
              </div>
            </div>

            {/* Contatos em Pílulas */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pt-1 border-t border-border-subtle/60">
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-2 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-muted truncate"
              >
                <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
                <span className="truncate">{customer.email}</span>
              </a>

              <a
                href={`tel:${customer.phone}`}
                className="flex items-center gap-2 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-muted truncate"
              >
                <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                <span className="truncate">{customer.phone}</span>
              </a>
            </div>

            {/* CTA Disparo Direto */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${customer.phone?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-98"
              >
                <SiWhatsapp className="h-4 w-4" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
          </section>

          {/* Tags Personalizadas */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags & Categorização
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
              >
                <Plus className="h-3 w-3" />
                <span>Adicionar</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {customer.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground"
                >
                  <Tag className="h-3 w-3 text-accent" />
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Métricas Rápidas / LTV */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Métricas de Retenção
            </h3>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { label: "LTV Total", value: customer.ltv, highlight: true },
                { label: "Ticket Médio", value: customer.averageTicket, highlight: false },
                { label: "Pedidos", value: String(customer.orders), highlight: false },
                { label: "Ciclo Médio", value: "42 dias", highlight: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border p-3 transition-all ${
                    item.highlight
                      ? "border-accent/30 bg-accent/10"
                      : "border-border-subtle bg-background"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p
                    className={`mt-1.5 text-sm font-black tracking-tight ${
                      item.highlight ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Histórico Multicanal (Timeline) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Histórico Multicanal de Pedidos
              </h3>
              <span className="text-[10px] font-bold text-muted-foreground">
                {customer.history.length} registros
              </span>
            </div>

            <div className="relative space-y-3 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border-subtle">
              {customer.history.map((item, idx) => (
                <div key={item.title + idx} className="relative flex items-start gap-3 pl-1">
                  {/* Ponto da Timeline */}
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-card text-accent shadow-2xs">
                    <Package className="h-3.5 w-3.5" />
                  </div>

                  {/* Conteúdo do Pedido */}
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background/60 p-3 transition-all hover:border-border">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                        {item.detail}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-extrabold text-foreground">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Engajamento & Anotações Internas */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Engajamento & Anotações
            </h3>

            {/* Status dos Útimos Disparos */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-background p-2.5">
                <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                <div>
                  <p className="font-semibold text-foreground text-[11px]">WhatsApp Enviado</p>
                  <p className="text-[10px] text-muted-foreground">Há 2 dias</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-background p-2.5">
                <span className="flex h-2 w-2 rounded-full bg-accent" />
                <div>
                  <p className="font-semibold text-foreground text-[11px]">E-mail Aberto</p>
                  <p className="text-[10px] text-muted-foreground">Há 5 dias</p>
                </div>
              </div>
            </div>

            {/* Textarea de Notas da Equipe */}
            <div className="relative space-y-2">
              <textarea
                aria-label="Anotações internas"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escreva uma anotação sobre as preferências do cliente..."
                className="min-h-24 w-full resize-none rounded-xl border border-input bg-background p-3 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={!note.trim() || isSavingNote}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-50"
                >
                  {noteSaved ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-success" />
                      <span>Salvo!</span>
                    </>
                  ) : isSavingNote ? (
                    <Clock className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-3 w-3" />
                      <span>Salvar Anotação</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* Sticky Footer com ID do Cliente */}
        <div className="border-t border-border-subtle bg-card p-4 text-center text-[11px] text-muted-foreground">
          Sincronização Ativa • <span className="font-bold text-foreground">ID #{customer.id || "CLI-8921"}</span>
        </div>
      </aside>
    </div>
  );
}