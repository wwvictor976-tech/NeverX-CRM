"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BellRing, Check, CheckCircle2, ChevronRight, CircleDashed, Clock3, Mail, MessageSquare, MoreHorizontal, Play, Plus, Settings2, ShoppingBag, UserCheck, Users } from "lucide-react";
import { EmptyState, MetricCard, PageFrame, PageIntro, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { automations as seedAutomations } from "@/lib/crm-data";
import type { AutomationRecord } from "@/lib/crm-domain";

type AutomationFilter = "Todas" | AutomationRecord["status"];
const statusFilters: AutomationFilter[] = ["Todas", "Ativa", "Pausada", "Rascunho"];
const toneByStatus = { Ativa: "success", Pausada: "warning", Rascunho: "neutral" } as const;
const iconByChannel = { WhatsApp: MessageSquare, "E-mail": Mail, Interno: BellRing } as const;

export function AutomationsContent() {
  const [records, setRecords] = useState<AutomationRecord[]>(() => [...seedAutomations]);
  const [filter, setFilter] = useState<AutomationFilter>("Todas");
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [channel, setChannel] = useState<AutomationRecord["channel"]>("WhatsApp");

  const filtered = useMemo(() => records.filter((automation) => filter === "Todas" || automation.status === filter), [filter, records]);
  const active = records.filter((automation) => automation.status === "Ativa").length;
  const runs = records.reduce((sum, automation) => sum + automation.runs, 0);
  const channels = new Set(records.map((automation) => automation.channel)).size;

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const toggleStatus = (automation: AutomationRecord) => {
    const nextStatus = automation.status === "Ativa" ? "Pausada" : "Ativa";
    setRecords((current) => current.map((item) => item.id === automation.id ? { ...item, status: nextStatus } : item));
    setSelectedAutomation((current) => current ? { ...current, status: nextStatus } : current);
    showFeedback(`${automation.name} ${nextStatus === "Ativa" ? "foi ativada" : "foi pausada"}.`);
  };

  const testAutomation = (automation: AutomationRecord) => {
    setRecords((current) => current.map((item) => item.id === automation.id ? { ...item, runs: item.runs + 1, lastRun: "agora" } : item));
    setSelectedAutomation((current) => current ? { ...current, runs: current.runs + 1, lastRun: "agora" } : current);
    showFeedback(`Teste executado para ${automation.name}.`);
  };

  const createAutomation = () => {
    const created: AutomationRecord = { recordType: "automation", id: `AUT-${Date.now()}`, name: name.trim() || "Nova automação", description: "Regra criada a partir do workspace e pronta para revisão.", status: "Rascunho", trigger: trigger.trim() || "Evento manual", channel, runs: 0, lastRun: "Ainda não executada", owner: "Victor Nunes" };
    setRecords((current) => [created, ...current]);
    setCreateOpen(false);
    setName("");
    setTrigger("");
    showFeedback(`${created.name} foi criada como rascunho.`);
  };

  return <PageFrame><PageIntro eyebrow="Regras operacionais" title="Automações" description="Transforme eventos de pedidos, conversas e clientes em ações consistentes para a equipe." action={<Button variant="accent" size="sm" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" /> Nova automação</Button>} meta={<StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />{active} regras ativas</StatusPill>} />
    {feedback ? <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success"><Check className="h-4 w-4" />{feedback}</div> : null}
    <section className="space-y-3"><SectionIntro eyebrow="Leitura executiva" title="Saúde da operação" description="Regras ativas, cobertura de canais e volume de execuções." /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Regras ativas" value={String(active)} helper="em acompanhamento" icon={CircleDashed} accent /><MetricCard label="Execuções" value={runs.toLocaleString("pt-BR")} helper="nas regras registradas" icon={CheckCircle2} /><MetricCard label="Canais cobertos" value={String(channels)} helper="WhatsApp, e-mail e interno" icon={MessageSquare} /><MetricCard label="Disparo principal" value="Pedidos" helper="evento mais utilizado" icon={ShoppingBag} /></div></section>
    <section className="space-y-3"><SectionIntro eyebrow="Regras" title="Automações configuradas" description="Abra uma regra para revisar o gatilho, testar uma execução ou alterar o estado." /><div className="toolbar-surface flex gap-1 overflow-x-auto p-2">{statusFilters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold ${filter === item ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item === "Todas" ? item : `${item}s`}<span className="ml-1.5 opacity-60">{item === "Todas" ? records.length : records.filter((record) => record.status === item).length}</span></button>)}</div><div className="data-surface divide-y divide-border-subtle overflow-hidden">{filtered.map((automation) => { const ChannelIcon = iconByChannel[automation.channel]; return <article key={automation.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/20 sm:p-5 lg:flex-row lg:items-center"><button type="button" onClick={() => setSelectedAutomation(automation)} className="flex min-w-0 flex-1 items-start gap-3 text-left"><div className="brand-chip bg-accent/10 text-accent"><Settings2 className="h-4 w-4" /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-extrabold text-foreground">{automation.name}</h3><StatusPill tone={toneByStatus[automation.status]}>{automation.status}</StatusPill></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{automation.description}</p><div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1"><BellRing className="h-3 w-3" />{automation.trigger}</span><span className="inline-flex items-center gap-1"><ChannelIcon className="h-3 w-3" />{automation.channel}</span><span className="inline-flex items-center gap-1"><UserCheck className="h-3 w-3" />{automation.owner}</span></div></div></button><div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-3 sm:flex sm:items-center sm:border-t-0 sm:pt-0"><div><p className="page-kicker">Execuções</p><p className="mt-1 text-xs font-extrabold text-foreground">{automation.runs.toLocaleString("pt-BR")}</p></div><div><p className="page-kicker">Última execução</p><p className="mt-1 text-xs font-extrabold text-foreground">{automation.lastRun}</p></div><Link href="/configuracoes" className="inline-flex items-center justify-center gap-1 rounded-lg border border-border px-2.5 py-2 text-[10px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground">Configurar <ChevronRight className="h-3 w-3" /></Link><button type="button" aria-label={`Abrir ações de ${automation.name}`} onClick={() => setSelectedAutomation(automation)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div></article>; })}</div>{filtered.length === 0 ? <EmptyState icon={CircleDashed} title="Nenhuma automação encontrada" description="Altere o filtro para rever as regras configuradas." /> : null}</section>
    <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Nova automação" description="Crie uma regra operacional para revisão da equipe." footer={<><Button variant="ghost" size="sm" onClick={() => setCreateOpen(false)}>Cancelar</Button><Button variant="accent" size="sm" onClick={createAutomation}><Check className="h-3.5 w-3.5" /> Salvar rascunho</Button></>}><div className="space-y-4"><label className="block space-y-1.5 text-xs font-semibold text-foreground">Nome da regra<input value={name} onChange={(event) => setName(event.target.value)} className="auth-input" placeholder="Ex.: Avisar pedido em atraso" /></label><label className="block space-y-1.5 text-xs font-semibold text-foreground">Gatilho<input value={trigger} onChange={(event) => setTrigger(event.target.value)} className="auth-input" placeholder="Ex.: Pedido sem atualização há 24h" /></label><label className="block space-y-1.5 text-xs font-semibold text-foreground">Canal de ação<select value={channel} onChange={(event) => setChannel(event.target.value as AutomationRecord["channel"])} className="auth-input"><option value="WhatsApp">WhatsApp</option><option value="E-mail">E-mail</option><option value="Interno">Alerta interno</option></select></label><div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground"><Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> O rascunho ficará disponível para revisão antes de qualquer execução.</div></div></Modal>
    <Modal open={Boolean(selectedAutomation)} onClose={() => setSelectedAutomation(null)} title={selectedAutomation?.name ?? "Detalhe da automação"} description={selectedAutomation?.description} footer={selectedAutomation ? <><Button variant="ghost" size="sm" onClick={() => setSelectedAutomation(null)}>Fechar</Button>{selectedAutomation.status !== "Rascunho" ? <Button variant="outline" size="sm" onClick={() => toggleStatus(selectedAutomation)}>{selectedAutomation.status === "Ativa" ? "Pausar regra" : "Ativar regra"}</Button> : null}<Button variant="accent" size="sm" onClick={() => testAutomation(selectedAutomation)}><Play className="h-3.5 w-3.5" /> Testar agora</Button></> : null}><div className="space-y-4">{selectedAutomation ? <><div className="grid gap-2 sm:grid-cols-3"><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Estado</p><div className="mt-2"><StatusPill tone={toneByStatus[selectedAutomation.status]}>{selectedAutomation.status}</StatusPill></div></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Execuções</p><p className="mt-2 text-lg font-extrabold text-foreground">{selectedAutomation.runs.toLocaleString("pt-BR")}</p></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Responsável</p><p className="mt-2 text-sm font-extrabold text-foreground">{selectedAutomation.owner}</p></div></div><div className="rounded-xl border border-border-subtle bg-background p-4"><p className="page-kicker">Regra</p><div className="mt-3 space-y-2 text-xs"><p><span className="text-muted-foreground">Quando:</span> <strong>{selectedAutomation.trigger}</strong></p><p><span className="text-muted-foreground">Ação:</span> <strong>{selectedAutomation.channel}</strong></p><p><span className="text-muted-foreground">Última execução:</span> <strong>{selectedAutomation.lastRun}</strong></p></div></div></> : null}</div></Modal>
  </PageFrame>;
}
