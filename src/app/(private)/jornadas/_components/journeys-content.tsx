"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock3, GitBranch, MoreHorizontal, Pause, Play, Plus, Route, Users } from "lucide-react";
import { EmptyState, MetricCard, PageFrame, PageIntro, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { journeys as seedJourneys } from "@/lib/crm-data";
import type { JourneyRecord } from "@/lib/crm-domain";

type JourneyFilter = "Todas" | JourneyRecord["status"];
const filters: JourneyFilter[] = ["Todas", "Ativa", "Pausada", "Rascunho"];
const toneByStatus = { Ativa: "success", Pausada: "warning", Rascunho: "neutral" } as const;

function conversionValue(value: string) {
  return Number(value.replace(",", ".").replace("%", "")) || 0;
}

export function JourneysContent() {
  const [records, setRecords] = useState<JourneyRecord[]>(() => [...seedJourneys]);
  const [filter, setFilter] = useState<JourneyFilter>("Todas");
  const [selectedJourney, setSelectedJourney] = useState<JourneyRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");
  const [trigger, setTrigger] = useState("");

  const filtered = useMemo(() => records.filter((journey) => filter === "Todas" || journey.status === filter), [filter, records]);
  const active = records.filter((journey) => journey.status === "Ativa").length;
  const enrolled = records.reduce((sum, journey) => sum + journey.enrolled, 0);
  const steps = records.reduce((sum, journey) => sum + journey.steps, 0);
  const activeJourneys = records.filter((journey) => journey.status === "Ativa");
  const averageConversion = activeJourneys.length ? activeJourneys.reduce((sum, journey) => sum + conversionValue(journey.conversion), 0) / activeJourneys.length : 0;

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const toggleJourney = (journey: JourneyRecord) => {
    const nextStatus = journey.status === "Ativa" ? "Pausada" : "Ativa";
    setRecords((current) => current.map((item) => item.id === journey.id ? { ...item, status: nextStatus, lastUpdated: "Atualizada agora" } : item));
    setSelectedJourney((current) => current ? { ...current, status: nextStatus, lastUpdated: "Atualizada agora" } : current);
    showFeedback(`${journey.name} ${nextStatus === "Ativa" ? "foi ativada" : "foi pausada"}.`);
  };

  const createJourney = () => {
    const created: JourneyRecord = { recordType: "journey", id: `JRN-${Date.now()}`, name: name.trim() || "Nova jornada", description: "Jornada criada a partir do workspace e pronta para revisão.", status: "Rascunho", audience: audience.trim() || "Segmento a definir", enrolled: 0, conversion: "—", lastUpdated: "Criada agora", trigger: trigger.trim() || "Evento manual", steps: 1 };
    setRecords((current) => [created, ...current]);
    setCreateOpen(false);
    setName("");
    setAudience("");
    setTrigger("");
    showFeedback(`${created.name} foi criada como rascunho.`);
  };

  return <PageFrame><PageIntro eyebrow="Jornadas do cliente" title="Jornadas" description="Desenhe experiências consistentes para acompanhar clientes desde a compra até a recompra." action={<Button variant="accent" size="sm" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" /> Nova jornada</Button>} meta={<StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />{active} jornadas ativas</StatusPill>} />
    {feedback ? <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success"><Check className="h-4 w-4" />{feedback}</div> : null}
    <section className="space-y-3"><SectionIntro eyebrow="Leitura executiva" title="Saúde das jornadas" description="Pessoas inscritas, conversão e etapas configuradas por lifecycle." /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Jornadas ativas" value={String(active)} helper="em execução" icon={Route} accent /><MetricCard label="Clientes inscritos" value={enrolled.toLocaleString("pt-BR")} helper="em todos os percursos" icon={Users} /><MetricCard label="Etapas configuradas" value={String(steps)} helper="pontos de contato" icon={GitBranch} /><MetricCard label="Conversão média" value={`${averageConversion.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`} helper="entre jornadas ativas" icon={ArrowRight} /></div></section>
    <section className="space-y-3"><SectionIntro eyebrow="Operação" title="Percursos configurados" description="Abra uma jornada para revisar o gatilho, as etapas e os estados de ativação." /><div className="toolbar-surface flex gap-1 overflow-x-auto p-2">{filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold ${filter === item ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item === "Todas" ? item : `${item}s`}<span className="ml-1.5 opacity-60">{item === "Todas" ? records.length : records.filter((record) => record.status === item).length}</span></button>)}</div><div className="grid gap-4 lg:grid-cols-2">{filtered.map((journey) => <article key={journey.id} className="data-surface p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><button type="button" onClick={() => setSelectedJourney(journey)} className="flex min-w-0 items-start gap-3 text-left"><div className="brand-chip bg-accent/10 text-accent"><Route className="h-4 w-4" /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-extrabold text-foreground">{journey.name}</h3><StatusPill tone={toneByStatus[journey.status]}>{journey.status}</StatusPill></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{journey.description}</p></div></button><button type="button" aria-label={`Abrir ações de ${journey.name}`} onClick={() => setSelectedJourney(journey)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></button></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"><JourneyStat label="Público" value={journey.audience} /><JourneyStat label="Inscritos" value={journey.enrolled.toLocaleString("pt-BR")} /><JourneyStat label="Conversão" value={journey.conversion} /><JourneyStat label="Etapas" value={String(journey.steps)} /></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-3"><span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground"><Clock3 className="h-3 w-3" />{journey.trigger} · {journey.lastUpdated}</span><Link href="/campanhas" className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline">Ver campanhas <ArrowRight className="h-3 w-3" /></Link></div></article>)}</div>{filtered.length === 0 ? <EmptyState icon={Route} title="Nenhuma jornada encontrada" description="Altere o filtro para voltar a ver os percursos configurados." /> : null}</section>
    <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Nova jornada" description="Crie uma jornada de lifecycle para revisão da equipe." footer={<><Button variant="ghost" size="sm" onClick={() => setCreateOpen(false)}>Cancelar</Button><Button variant="accent" size="sm" onClick={createJourney}><Check className="h-3.5 w-3.5" /> Salvar rascunho</Button></>}><div className="space-y-4"><label className="block space-y-1.5 text-xs font-semibold text-foreground">Nome da jornada<input value={name} onChange={(event) => setName(event.target.value)} className="auth-input" placeholder="Ex.: Pós-venda premium" /></label><label className="block space-y-1.5 text-xs font-semibold text-foreground">Público inicial<input value={audience} onChange={(event) => setAudience(event.target.value)} className="auth-input" placeholder="Ex.: Clientes VIP" /></label><label className="block space-y-1.5 text-xs font-semibold text-foreground">Gatilho de entrada<input value={trigger} onChange={(event) => setTrigger(event.target.value)} className="auth-input" placeholder="Ex.: Pedido entregue" /></label><div className="rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground">A jornada será criada com uma etapa inicial e poderá ser ampliada com campanhas e automações.</div></div></Modal>
    <Modal open={Boolean(selectedJourney)} onClose={() => setSelectedJourney(null)} title={selectedJourney?.name ?? "Detalhe da jornada"} description={selectedJourney?.description} footer={selectedJourney ? <><Button variant="ghost" size="sm" onClick={() => setSelectedJourney(null)}>Fechar</Button>{selectedJourney.status !== "Rascunho" ? <Button variant="outline" size="sm" onClick={() => toggleJourney(selectedJourney)}>{selectedJourney.status === "Ativa" ? <><Pause className="h-3.5 w-3.5" /> Pausar jornada</> : <><Play className="h-3.5 w-3.5" /> Ativar jornada</>}</Button> : null}<Link href="/campanhas" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 text-xs font-bold text-primary-foreground"><ArrowRight className="h-3.5 w-3.5" /> Ver campanhas</Link></> : null}><div className="space-y-4">{selectedJourney ? <><div className="grid gap-2 sm:grid-cols-3"><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Estado</p><div className="mt-2"><StatusPill tone={toneByStatus[selectedJourney.status]}>{selectedJourney.status}</StatusPill></div></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Inscritos</p><p className="mt-2 text-lg font-extrabold text-foreground">{selectedJourney.enrolled.toLocaleString("pt-BR")}</p></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Conversão</p><p className="mt-2 text-lg font-extrabold text-foreground">{selectedJourney.conversion}</p></div></div><div className="rounded-xl border border-border-subtle bg-background p-4 text-xs"><p className="page-kicker">Entrada e percurso</p><div className="mt-3 space-y-2"><p><span className="text-muted-foreground">Público:</span> <strong>{selectedJourney.audience}</strong></p><p><span className="text-muted-foreground">Gatilho:</span> <strong>{selectedJourney.trigger}</strong></p><p><span className="text-muted-foreground">Etapas:</span> <strong>{selectedJourney.steps}</strong></p><p><span className="text-muted-foreground">Atualização:</span> <strong>{selectedJourney.lastUpdated}</strong></p></div></div></> : null}</div></Modal>
  </PageFrame>;
}

function JourneyStat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">{label}</p><p className="mt-2 truncate text-xs font-extrabold text-foreground">{value}</p></div>; }
