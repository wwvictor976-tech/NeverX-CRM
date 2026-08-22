"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, Clock3, Copy, Filter, Mail, Megaphone, MoreHorizontal, Pause, Play, Plus, Send, Tag, Users } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import { PageIntro, MetricCard, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CampaignModal } from "@/components/campaigns/campaign-modal";
import { type CampaignRecord, formatCurrency } from "@/lib/crm-data";
import { useCrmWorkspace } from "@/components/crm/crm-workspace-context";

type CampaignFilter = "Todas" | CampaignRecord["status"];

const statusFilters: { label: string; value: CampaignFilter }[] = [
  { label: "Todas", value: "Todas" },
  { label: "Ativas", value: "Ativa" },
  { label: "Pausadas", value: "Pausada" },
  { label: "Agendadas", value: "Agendada" },
  { label: "Rascunhos", value: "Rascunho" },
  { label: "Concluídas", value: "Concluída" },
];

const statusStyles: Record<CampaignRecord["status"], "success" | "warning" | "neutral" | "info"> = {
  Ativa: "success",
  Pausada: "warning",
  Agendada: "info",
  Rascunho: "neutral",
  Concluída: "info",
};

function audienceCount(campaign: CampaignRecord) {
  const declaredCount = Number(campaign.audience.match(/\d+/)?.[0] ?? 0);
  return declaredCount || campaign.customerIds.length;
}

function customerCountLabel(count: number) {
  return `${count.toLocaleString("pt-BR")} ${count === 1 ? "cliente" : "clientes"}`;
}

export function CampaignsContent() {
  const { campaigns, addCampaign, updateCampaign } = useCrmWorkspace();
  const [activeStatus, setActiveStatus] = useState<CampaignFilter>("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignRecord | null>(null);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = useMemo(() => campaigns.filter((campaign) => {
    const matchesStatus = activeStatus === "Todas" || campaign.status === activeStatus;
    const matchesSearch = `${campaign.name} ${campaign.audience} ${campaign.channel}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  }), [activeStatus, campaigns, search]);

  const activeCount = campaigns.filter((campaign) => campaign.status === "Ativa").length;
  const sentCount = campaigns.reduce((total, campaign) => total + campaign.sent, 0);
  const revenue = campaigns.reduce((total, campaign) => total + campaign.revenue, 0);
  const audience = campaigns.reduce((total, campaign) => total + audienceCount(campaign), 0);
  const topCampaign = [...campaigns].sort((first, second) => second.revenue - first.revenue)[0];

  const handleCampaignSaved = (campaign: CampaignRecord) => {
    addCampaign(campaign);
    setModalOpen(false);
    setFeedback(`${campaign.name} foi salva como rascunho.`);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const toggleCampaign = (campaign: CampaignRecord) => {
    const nextStatus = campaign.status === "Ativa" ? "Pausada" : "Ativa";
    updateCampaign(campaign.id, (current) => ({ ...current, status: nextStatus, updatedAt: "Atualizada agora" }));
    setSelectedCampaign((current) => current ? { ...current, status: nextStatus, updatedAt: "Atualizada agora" } : current);
    setFeedback(`${campaign.name} ${nextStatus === "Ativa" ? "foi ativada" : "foi pausada"}.`);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const duplicateCampaign = (campaign: CampaignRecord) => {
    const copy: CampaignRecord = { ...campaign, id: `CMP-${Date.now()}`, name: `${campaign.name} · cópia`, status: "Rascunho", updatedAt: "Criada agora", sent: 0, openRate: "—", clickRate: "—", revenue: 0 };
    addCampaign(copy);
    setSelectedCampaign(null);
    setFeedback("Uma cópia foi criada como rascunho.");
    window.setTimeout(() => setFeedback(null), 2600);
  };

  return (
    <div className="page-frame">
      <PageIntro eyebrow="Ativação e relacionamento" title="Campanhas" description="Planeje comunicações segmentadas, acompanhe resultados e mantenha cada ativação ligada ao cliente." action={<Button variant="accent" size="sm" onClick={() => setModalOpen(true)} className="h-9 text-xs font-semibold"><Plus className="h-3.5 w-3.5" /> Nova campanha</Button>} />

      <section className="space-y-3" aria-labelledby="campaigns-summary"><SectionIntro eyebrow="Leitura executiva" title="Impacto das ativações" description="Métricas calculadas a partir das campanhas e audiências disponíveis no workspace." /><div id="campaigns-summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Receita influenciada" value={formatCurrency(revenue)} helper="atribuída às campanhas" icon={Megaphone} accent /><MetricCard label="Campanhas ativas" value={String(activeCount)} helper="em acompanhamento" icon={CheckCircle2} /><MetricCard label="Público acumulado" value={audience.toLocaleString("pt-BR")} helper="clientes nas audiências" icon={Users} /><MetricCard label="Mensagens enviadas" value={sentCount.toLocaleString("pt-BR")} helper="nas ativações registradas" icon={Send} /></div></section>

      {feedback ? <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success"><Check className="h-4 w-4" />{feedback}</div> : null}

      <section className="space-y-3" aria-labelledby="campaigns-list"><SectionIntro eyebrow="Ativações" title="Campanhas em operação" description="Filtre por estado ou encontre uma campanha pelo nome e canal." /><div className="data-surface overflow-hidden" id="campaigns-list"><div className="flex flex-col gap-4 border-b border-border-subtle p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between"><div className="mobile-scroll-row rounded-xl border border-border bg-background p-1">{statusFilters.map((status) => <button key={status.value} type="button" onClick={() => setActiveStatus(status.value)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors ${activeStatus === status.value ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{status.label}<span className="ml-1.5 opacity-60">{status.value === "Todas" ? campaigns.length : campaigns.filter((campaign) => campaign.status === status.value).length}</span></button>)}</div><div className="relative w-full lg:w-72"><Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="auth-input h-9 pl-9 text-xs" placeholder="Filtrar campanhas..." /></div></div><div className="divide-y divide-border-subtle">{filtered.map((campaign) => { const count = audienceCount(campaign); return <article key={campaign.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-5 lg:flex-row lg:items-center"><button type="button" onClick={() => setSelectedCampaign(campaign)} className="flex min-w-0 flex-1 items-start gap-3 text-left"><div className="brand-chip h-10 w-10 border-accent/20 bg-accent/10">{campaign.channel === "E-mail" ? <Mail className="h-4 w-4 text-accent" /> : campaign.channel === "WhatsApp" ? <PlatformLogo platform="whatsapp" size="sm" framed={false} /> : <Tag className="h-4 w-4 text-accent" />}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-bold text-foreground">{campaign.name}</h3><StatusPill tone={statusStyles[campaign.status]}>{campaign.status}</StatusPill></div><p className="mt-1 text-[11px] text-muted-foreground">{campaign.audience} · {campaign.updatedAt}</p><div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1">{campaign.channel === "WhatsApp" ? <PlatformLogo platform="whatsapp" size="xs" framed={false} /> : campaign.channel === "E-mail" ? <Mail className="h-3 w-3" /> : <Send className="h-3 w-3" />} {campaign.channel}</span><span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {count ? customerCountLabel(count) : "Audiência não informada"}</span></div></div></button><div className="grid grid-cols-3 gap-4 border-t border-border-subtle pt-3 sm:flex sm:items-center sm:border-t-0 sm:pt-0"><div><p className="page-kicker">Abertura</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.openRate}</p></div><div><p className="page-kicker">Cliques</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.clickRate}</p></div><div><p className="page-kicker">Receita</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.revenue ? formatCurrency(campaign.revenue) : "—"}</p></div><button type="button" aria-label={`Abrir ações da campanha ${campaign.name}`} onClick={() => setSelectedCampaign(campaign)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></div></article>; })}{filtered.length === 0 ? <div className="p-10 text-center"><p className="text-sm font-bold text-foreground">Nenhuma campanha encontrada</p><p className="mt-1 text-xs text-muted-foreground">Ajuste o filtro ou crie uma nova campanha.</p></div> : null}</div><div className="flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-3 text-[11px] text-muted-foreground sm:px-5"><span>{filtered.length} de {campaigns.length} campanhas visíveis</span><span className="hidden sm:inline">Clique em uma campanha para ver detalhes e ações.</span></div></div></section>

      <section className="grid gap-4 xl:grid-cols-3" aria-labelledby="campaigns-next"><article className="data-surface p-4 sm:p-5 xl:col-span-2"><div className="flex items-center justify-between gap-3"><div><p className="page-kicker">Maior oportunidade</p><h3 id="campaigns-next" className="mt-1 text-base font-bold tracking-tight">{topCampaign?.name ?? "Nenhuma campanha criada"}</h3></div>{topCampaign ? <StatusPill tone={statusStyles[topCampaign.status]}>{topCampaign.status}</StatusPill> : null}</div>{topCampaign ? <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Público</p><p className="mt-2 text-lg font-extrabold">{customerCountLabel(audienceCount(topCampaign))}</p><p className="mt-1 text-[10px] text-muted-foreground">clientes vinculados</p></div><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Canal</p><p className="mt-2 text-lg font-extrabold">{topCampaign.channel}</p><p className="mt-1 text-[10px] text-muted-foreground">canal de ativação</p></div><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Receita</p><p className="mt-2 text-lg font-extrabold">{formatCurrency(topCampaign.revenue)}</p><p className="mt-1 text-[10px] text-muted-foreground">atribuída à campanha</p></div></div> : <p className="mt-4 text-xs text-muted-foreground">Crie uma campanha para começar a acompanhar alcance e retorno.</p>}</article><aside className="data-surface p-4 sm:p-5"><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent"><Clock3 className="h-4 w-4" /></div><div><p className="text-xs font-bold text-foreground">Próximo movimento</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Crie um rascunho com audiência selecionada ou revise uma ativação pausada antes de enviar.</p></div></div><Button variant="outline" size="sm" onClick={() => setModalOpen(true)} className="mt-4 h-9 w-full text-xs font-semibold"><Copy className="h-3.5 w-3.5" /> Criar campanha</Button></aside></section>

      <CampaignModal open={modalOpen} onClose={() => setModalOpen(false)} audience={{ count: 0, label: "clientes selecionados" }} onSaved={handleCampaignSaved} />
      <Modal open={Boolean(selectedCampaign)} onClose={() => setSelectedCampaign(null)} title={selectedCampaign?.name ?? "Detalhe da campanha"} description={selectedCampaign ? `${selectedCampaign.channel} · ${selectedCampaign.audience}` : undefined} footer={selectedCampaign ? <><Button variant="ghost" size="sm" onClick={() => setSelectedCampaign(null)}>Fechar</Button>{selectedCampaign.status !== "Concluída" && <Button variant={selectedCampaign.status === "Ativa" ? "outline" : "accent"} size="sm" onClick={() => toggleCampaign(selectedCampaign)}>{selectedCampaign.status === "Ativa" ? <><Pause className="h-3.5 w-3.5" /> Pausar campanha</> : <><Play className="h-3.5 w-3.5" /> Ativar campanha</>}</Button>}</> : null}><div className="space-y-4">{selectedCampaign ? <><div className="grid gap-2 sm:grid-cols-3"><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Status</p><div className="mt-2"><StatusPill tone={statusStyles[selectedCampaign.status]}>{selectedCampaign.status}</StatusPill></div></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Público</p><p className="mt-2 text-lg font-extrabold text-foreground">{customerCountLabel(audienceCount(selectedCampaign))}</p></div><div className="rounded-xl border border-border-subtle bg-muted/20 p-3"><p className="page-kicker">Receita</p><p className="mt-2 text-lg font-extrabold text-foreground">{formatCurrency(selectedCampaign.revenue)}</p></div></div><div className="rounded-xl border border-border-subtle bg-background p-4"><p className="page-kicker">Performance registrada</p><div className="mt-3 grid grid-cols-3 gap-3"><div><p className="text-[10px] text-muted-foreground">Enviados</p><p className="mt-1 text-sm font-extrabold text-foreground">{selectedCampaign.sent.toLocaleString("pt-BR")}</p></div><div><p className="text-[10px] text-muted-foreground">Abertura</p><p className="mt-1 text-sm font-extrabold text-foreground">{selectedCampaign.openRate}</p></div><div><p className="text-[10px] text-muted-foreground">Cliques</p><p className="mt-1 text-sm font-extrabold text-foreground">{selectedCampaign.clickRate}</p></div></div></div><div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-muted/20 p-3"><span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Users className="h-4 w-4 text-accent" /> {selectedCampaign.customerIds.length ? `${selectedCampaign.customerIds.length} perfis 360º vinculados` : "Audiência ainda não vinculada a perfis"}</span><button type="button" onClick={() => duplicateCampaign(selectedCampaign)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-2 text-[10px] font-bold text-foreground hover:bg-muted"><Copy className="h-3.5 w-3.5" /> Duplicar rascunho</button></div></> : null}</div></Modal>
    </div>
  );
}
