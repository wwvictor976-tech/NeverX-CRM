import { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  ExternalLink,
  Mail,
  Package,
  Phone,
  Plus,
  Send,
  Tag,
  X,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
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
      <button
        type="button"
        aria-label="Fechar detalhes do cliente"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/35 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
      />

      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-border-subtle bg-card shadow-xl animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border-subtle bg-card/95 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Visão 360° do Cliente
              </p>
              <h2 className="text-base font-bold text-foreground">
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

        <div className="flex-1 space-y-7 overflow-y-auto p-5">
          <section className="space-y-4 rounded-2xl border border-border-subtle bg-background/50 p-4">
            <div className="flex items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-lg font-bold text-accent">
                {customer.initials}
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-border-subtle bg-card text-[10px]">
                  <ChannelIcon className={`h-3 w-3 ${customer.channelColor}`} />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-bold text-foreground">
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

            <div className="grid grid-cols-1 gap-2 border-t border-border-subtle/60 pt-3 sm:grid-cols-2">
              <a
                href={`mailto:${customer.email}`}
                className="flex min-w-0 items-center gap-2 truncate rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-muted"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="truncate">{customer.email}</span>
              </a>

              <a
                href={`tel:${customer.phone}`}
                className="flex min-w-0 items-center gap-2 truncate rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-muted"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="truncate">{customer.phone}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${customer.phone?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-semibold text-white transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <SiWhatsapp className="h-4 w-4" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
          </section>

          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags & Categorização
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
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
                  className={`rounded-xl border p-3 transition-colors ${
                    item.highlight
                      ? "border-accent/25 bg-accent/10"
                      : "border-border-subtle bg-background/60"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p
                    className={`mt-1.5 text-sm font-bold tracking-tight ${
                      item.highlight ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Histórico Multicanal de Pedidos
              </h3>
              <span className="text-[10px] font-semibold text-muted-foreground">
                {customer.history.length} registros
              </span>
            </div>

            <div className="relative space-y-3 before:absolute before:bottom-2 before:left-3.5 before:top-2 before:w-px before:bg-border-subtle">
              {customer.history.map((item, idx) => (
                <div key={item.title + idx} className="relative flex items-start gap-3 pl-1">
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-card text-accent">
                    <Package className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background/60 p-3 transition-colors hover:border-border">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-foreground">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Engajamento & Anotações
            </h3>

            <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-background/60 p-2.5">
                <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                <div>
                  <p className="text-[11px] font-semibold text-foreground">WhatsApp Enviado</p>
                  <p className="text-[10px] text-muted-foreground">Há 2 dias</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-background/60 p-2.5">
                <span className="flex h-2 w-2 rounded-full bg-accent" />
                <div>
                  <p className="text-[11px] font-semibold text-foreground">E-mail Aberto</p>
                  <p className="text-[10px] text-muted-foreground">Há 5 dias</p>
                </div>
              </div>
            </div>

            <div className="relative space-y-2">
              <textarea
                aria-label="Anotações internas"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escreva uma anotação sobre as preferências do cliente..."
                className="min-h-24 w-full resize-none rounded-xl border border-input bg-background/60 p-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-ring"
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={!note.trim() || isSavingNote}
                  size="sm"
                  className="h-8 rounded-xl px-3 text-xs font-semibold"
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
                </Button>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-border-subtle bg-card p-4 text-center text-[11px] text-muted-foreground">
          Sincronização Ativa • <span className="font-bold text-foreground">ID #{customer.id || "CLI-8921"}</span>
        </div>
      </aside>
    </div>
  );
}
