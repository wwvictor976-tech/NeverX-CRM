"use client";

import { useEffect, useState, useCallback } from "react";
import {
  X,
  Mail,
  Phone,
  ShoppingBag,
  Tag,
  Clock,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Calendar,
  CreditCard,
  UserCheck,
  ChevronRight,
  Activity,
  Plus,
  Globe2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformLogo } from "@/components/platform-logo";
import type { Customer } from "./customers-content";

export interface CustomerDetailsSheetProps {
  customer: Customer | null;
  isOpen?: boolean;
  onClose: () => void;
  onStartConversation: (channel: "email" | "whatsapp" | "outro") => void;
}

type TabType = "overview" | "orders" | "activity";

const statusConfigMap: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
  VIP: {
    label: "Cliente VIP",
    badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    dotClass: "bg-purple-500",
  },
  RECOMPRA_PENDENTE: {
    label: "Recompra Pendente",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  NOVO: {
    label: "Novo Cliente",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  EM_RISCO: {
    label: "Em Risco Churn",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    dotClass: "bg-rose-500",
  },
};

export function CustomerDetailsSheet({
  customer,
  isOpen = false,
  onClose,
  onStartConversation,
}: CustomerDetailsSheetProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Trava o scroll do body quando o sheet está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fechar no ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = useCallback((text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  if (!isOpen || !customer) return null;

  const ChannelIcon = customer.channelIcon;
  const statusInfo = statusConfigMap[customer.status] || {
    label: customer.status,
    badgeClass: "bg-muted text-muted-foreground border-border",
    dotClass: "bg-muted-foreground",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop de Alta Fidelidade */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Container Principal do Sheet */}
      <aside className="relative z-50 flex h-full w-full max-w-2xl flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right sm:max-w-3xl">
        
        {/* TOP HEADER */}
        <div className="flex flex-col border-b border-border bg-card/50 p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 font-mono text-lg font-black text-accent ring-1 ring-accent/30 shadow-inner">
                  {customer.initials}
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full ring-2 ring-card ${statusInfo.dotClass}`}
                  title={statusInfo.label}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {customer.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase ${statusInfo.badgeClass}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dotClass}`} />
                    {statusInfo.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => handleCopy(customer.cpf, "cpf")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <span>CPF: {customer.cpf}</span>
                    {copiedField === "cpf" ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-60" />
                    )}
                  </button>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    {customer.channelLogo ? <PlatformLogo platform={customer.channelLogo} size="xs" framed={false} /> : ChannelIcon ? <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                    <span>{customer.channel}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border/50 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-5 flex items-center gap-2 pt-2 border-t border-border/40">
            <Button
              size="sm"
              className="h-8 gap-1.5 rounded-xl bg-accent text-accent-foreground font-semibold text-xs shadow-sm hover:opacity-90"
              onClick={() => onStartConversation("whatsapp")}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 rounded-xl text-xs font-semibold border-border/70"
              onClick={() => onStartConversation("email")}
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span>E-mail</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 rounded-xl text-xs font-semibold border-border/70"
              onClick={() => onStartConversation("outro")}
            >
              <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Outro canal</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1.5 rounded-xl text-xs font-semibold"
              onClick={() => handleCopy(JSON.stringify(customer, null, 2), "all")}
            >
              {copiedField === "all" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Copiar JSON</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-4 gap-2 border-b border-border bg-muted/20 px-6 py-3.5">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">LTV Histórico</span>
            <p className="text-base font-black text-foreground">{customer.ltv}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ticket Médio</span>
            <p className="text-base font-black text-foreground">{customer.averageTicket}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pedidos</span>
            <p className="text-base font-black text-foreground">{customer.orders} compras</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Última Compra</span>
            <p className="text-xs font-bold text-foreground">{customer.lastPurchase}</p>
          </div>
        </div>

        {/* SEGMENTED CONTROL TABS */}
        <div className="flex border-b border-border bg-card px-6 pt-2">
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Visão Geral", icon: UserCheck },
              { id: "orders", label: `Pedidos (${customer.history?.length || 0})`, icon: ShoppingBag },
              { id: "activity", label: "Timeline CRM", icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Informações Cadastrais */}
              <div className="space-y-2.5">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Dados Primários de Contato
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="group relative flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground">E-mail Corporativo/Pessoal</p>
                        <p className="text-xs font-bold text-foreground">{customer.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(customer.email, "email")}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      {copiedField === "email" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
                    </button>
                  </div>

                  <div className="group relative flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground">Telefone Principal</p>
                        <p className="text-xs font-bold text-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(customer.phone, "phone")}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      {copiedField === "phone" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Inteligência do Cliente & Recompra */}
              <div className="space-y-2.5">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Previsões e Ciclo de Vida
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-card p-3.5 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">Previsão de Recompra</span>
                      <Clock className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <p className="text-sm font-bold text-foreground">{customer.repurchaseDate}</p>
                    <p className="text-[10px] text-muted-foreground">Baseado no histórico de intervalo de compras</p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-card p-3.5 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">Recorrência Estimada</span>
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <p className="text-sm font-bold text-foreground">A cada ~22 dias</p>
                    <p className="text-[10px] text-muted-foreground">Frequência acima da média da categoria</p>
                  </div>
                </div>
              </div>

              {/* Tags de Segmentação */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    Tags & Segmentos do Cliente
                  </h3>
                  <button type="button" className="flex items-center gap-1 text-[11px] font-bold text-accent hover:underline">
                    <Plus className="h-3 w-3" />
                    <span>Adicionar Tag</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-1 text-xs font-bold text-foreground shadow-2xs"
                    >
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Histórico de Pedidos Registrados
                </h3>
              </div>

              {customer.history && customer.history.length > 0 ? (
                <div className="space-y-3">
                  {customer.history.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-2xs transition-all hover:border-border hover:shadow-md"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-foreground">{item.title}</p>
                            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                              Entregue
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.detail}</p>
                          {item.date && (
                            <p className="text-[10px] font-medium text-muted-foreground/80 flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-foreground">{item.value}</p>
                        <button type="button" className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Detalhes</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center bg-muted/10">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-2 text-xs font-semibold text-foreground">Nenhum pedido recente registrado</p>
                  <p className="text-[11px] text-muted-foreground">Os novos pedidos sincronizados aparecerão aqui automaticamente.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-3">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Linha do Tempo de Interações (CRM)
              </h3>
              
              <div className="relative border-l-2 border-border/60 pl-4 ml-2 space-y-6 my-2">
                <div className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-card" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">Aviso de Recompra Enviado</span>
                      <span className="text-[10px] text-muted-foreground">há 2 dias</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Disparo automático de mensagem via WhatsApp com cupom de recompra de 10% OFF.</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-card" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">Pedido Entregue (#4029)</span>
                      <span className="text-[10px] text-muted-foreground">há 3 dias</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Entrega confirmada pela transportadora no endereço de São Paulo.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STICKY FOOTER */}
        <div className="flex items-center justify-between border-t border-border bg-card p-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-xl border-border/80 text-xs font-semibold"
          >
            Fechar (Esc)
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="gap-2 rounded-xl bg-accent text-accent-foreground font-bold text-xs shadow-md hover:opacity-95"
              onClick={() => onStartConversation("whatsapp")}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Iniciar Atendimento</span>
            </Button>
          </div>
        </div>

      </aside>
    </div>
  );
}