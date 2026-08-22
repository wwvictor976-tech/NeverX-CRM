"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BellRing, CheckCircle2, ChevronRight, CircleDashed, Mail, MessageSquare, Plus, Settings2, ShoppingBag, UserCheck } from "lucide-react";
import { EmptyState, MetricCard, PageFrame, PageIntro, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { automations } from "@/lib/crm-data";

type AutomationFilter = "Todas" | "Ativa" | "Pausada" | "Rascunho";
const toneByStatus = { Ativa: "success", Pausada: "warning", Rascunho: "neutral" } as const;
const iconByChannel = { WhatsApp: MessageSquare, "E-mail": Mail, Interno: BellRing } as const;

export function AutomationsContent() {
  const [filter, setFilter] = useState<AutomationFilter>("Todas");
  const [feedback, setFeedback] = useState<string | null>(null);
  const filtered = useMemo(() => automations.filter((automation) => filter === "Todas" || automation.status === filter), [filter]);
  const active = automations.filter((automation) => automation.status === "Ativa").length;
  const runs = automations.reduce((sum, automation) => sum + automation.runs, 0);

  return (
    <PageFrame>
      <PageIntro
        eyebrow="Regras operacionais"
        title="Automações"
        description="Transforme eventos de pedidos, conversas e clientes em acções consistentes para a equipa."
        action={<Button variant="accent" size="sm" onClick={() => setFeedback("Nova automação preparada para configuração.")}><Plus className="h-3.5 w-3.5" /> Nova automação</Button>}
        meta={<StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />{active} regras activas</StatusPill>}
      />
      {feedback ? <div className="rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success">{feedback}</div> : null}
      <section className="space-y-3">
        <SectionIntro eyebrow="Leitura executiva" title="Saúde da operação" description="Regras activas, execuções e cobertura de atendimento." />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Regras activas" value={String(active)} helper="a monitorizar eventos" trend="+1 este mês" icon={CircleDashed} accent />
          <MetricCard label="Execuções" value={String(runs)} helper="nesta janela" icon={CheckCircle2} />
          <MetricCard label="Canais cobertos" value="3" helper="WhatsApp, e-mail e interno" icon={MessageSquare} />
          <MetricCard label="Origem operacional" value="Pedidos" helper="evento mais utilizado" icon={ShoppingBag} />
        </div>
      </section>
      <section className="space-y-3">
        <SectionIntro eyebrow="Regras" title="Automações configuradas" description="Cada regra pode chamar uma campanha, criar um ticket ou informar a equipa." />
        <div className="toolbar-surface flex gap-1 overflow-x-auto p-2">
          {(["Todas", "Ativa", "Pausada", "Rascunho"] as AutomationFilter[]).map((item) => (
            <button type="button" key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold ${filter === item ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              {item === "Todas" ? item : `${item}s`}
            </button>
          ))}
        </div>
        <div className="data-surface divide-y divide-border-subtle overflow-hidden">
          {filtered.map((automation) => {
            const ChannelIcon = iconByChannel[automation.channel];
            return (
              <article key={automation.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/20 sm:p-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="brand-chip bg-accent/10 text-accent"><Settings2 className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-extrabold text-foreground">{automation.name}</h3><StatusPill tone={toneByStatus[automation.status]}>{automation.status}</StatusPill></div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{automation.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1"><BellRing className="h-3 w-3" />{automation.trigger}</span><span className="inline-flex items-center gap-1"><ChannelIcon className="h-3 w-3" />{automation.channel}</span><span className="inline-flex items-center gap-1"><UserCheck className="h-3 w-3" />{automation.owner}</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-3 sm:flex sm:items-center sm:border-t-0 sm:pt-0">
                  <div><p className="page-kicker">Execuções</p><p className="mt-1 text-xs font-extrabold text-foreground">{automation.runs}</p></div>
                  <div><p className="page-kicker">Última execução</p><p className="mt-1 text-xs font-extrabold text-foreground">{automation.lastRun}</p></div>
                  <Link href="/configuracoes" className="inline-flex items-center justify-center gap-1 rounded-lg border border-border px-2.5 py-2 text-[10px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground">Configurar <ChevronRight className="h-3 w-3" /></Link>
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 ? <EmptyState icon={CircleDashed} title="Nenhuma automação encontrada" description="Altere o filtro para rever as regras configuradas." /> : null}
      </section>
    </PageFrame>
  );
}
