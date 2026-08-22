"use client";

import { useMemo, useState } from "react";
import { useCrmWorkspace } from "@/components/crm/crm-workspace-context";
import { CheckCircle2, Clock3, Copy, Filter, Mail, Megaphone, MoreHorizontal, Plus, Send, Tag, Users } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import { PageIntro, MetricCard, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { CampaignModal } from "@/components/campaigns/campaign-modal";
import { type CampaignRecord, formatCurrency } from "@/lib/crm-data";

type CampaignFilter = "Todas" | CampaignRecord["status"];

const statusFilters: { label: string; value: CampaignFilter }[] = [
  { label: "Todas", value: "Todas" },
  { label: "Ativas", value: "Ativa" },
  { label: "Agendadas", value: "Agendada" },
  { label: "Rascunhos", value: "Rascunho" },
  { label: "Concluídas", value: "Concluída" },
];

const statusStyles: Record<CampaignRecord["status"], string> = {
  Ativa: "success",
  Agendada: "warning",
  Rascunho: "neutral",
  Concluída: "info",
};

export function CampaignsContent() {
  const { campaigns, addCampaign } = useCrmWorkspace();
  const [activeStatus, setActiveStatus] = useState<CampaignFilter>("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => campaigns.filter((campaign) => {
    const matchesStatus = activeStatus === "Todas" || campaign.status === activeStatus;
    const matchesSearch = `${campaign.name} ${campaign.audience} ${campaign.channel}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  }), [activeStatus, campaigns, search]);

  const activeCount = campaigns.filter((campaign) => campaign.status === "Ativa").length;
  const revenue = campaigns.reduce((total, campaign) => total + campaign.revenue, 0);

  const handleCampaignSaved = (campaign: CampaignRecord) => {
    addCampaign(campaign);
    setModalOpen(false);
  };

  return (
    <div className="page-frame">
      <PageIntro
        eyebrow="Ativação e relacionamento"
        title="Campanhas"
        description="Planeje comunicações segmentadas, acompanhe resultados e mantenha cada ativação ligada ao cliente."
        action={<Button variant="accent" size="sm" onClick={() => setModalOpen(true)} className="h-9 text-xs font-semibold"><Plus className="h-3.5 w-3.5" /> Nova campanha</Button>}
      />

      <section className="space-y-3" aria-labelledby="campaigns-summary">
        <SectionIntro eyebrow="Leitura executiva" title="Resumo das campanhas" description="Acompanhe impacto, alcance e retorno das ativações." />
        <div id="campaigns-summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Receita influenciada" value={formatCurrency(revenue)} helper="vs. período anterior" trend="+18,6%" accent />
          <MetricCard label="Campanhas ativas" value={String(activeCount)} helper="em acompanhamento" />
          <MetricCard label="Público alcançado" value="1.204" helper="clientes impactados" trend="+9,4%" />
          <MetricCard label="Taxa média de abertura" value="72,1%" helper="nos canais monitorizados" />
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="campaigns-list">
        <SectionIntro eyebrow="Ativações" title="Campanhas em operação" description="Filtre por estado ou encontre uma campanha pelo nome e canal." />
        <div className="data-surface overflow-hidden" id="campaigns-list">
          <div className="flex flex-col gap-4 border-b border-border-subtle p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="mobile-scroll-row rounded-xl border border-border bg-background p-1">
              {statusFilters.map((status) => <button key={status.value} type="button" onClick={() => setActiveStatus(status.value)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors ${activeStatus === status.value ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{status.label}</button>)}
            </div>
            <div className="relative w-full lg:w-72"><Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="auth-input h-9 pl-9 text-xs" placeholder="Filtrar campanhas..." /></div>
          </div>

          <div className="divide-y divide-border-subtle">
            {filtered.map((campaign) => (
              <article key={campaign.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="brand-chip h-10 w-10 border-accent/20 bg-accent/10">
                    {campaign.channel === "E-mail" ? <Mail className="h-4 w-4 text-accent" /> : campaign.channel === "WhatsApp" ? <PlatformLogo platform="whatsapp" size="sm" framed={false} /> : <Tag className="h-4 w-4 text-accent" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-bold text-foreground">{campaign.name}</h3><StatusPill tone={statusStyles[campaign.status] as "success" | "warning" | "neutral" | "info"}>{campaign.status}</StatusPill></div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{campaign.audience} · {campaign.updatedAt}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold text-muted-foreground"><span className="inline-flex items-center gap-1">{campaign.channel === "WhatsApp" ? <PlatformLogo platform="whatsapp" size="xs" framed={false} /> : campaign.channel === "E-mail" ? <Mail className="h-3 w-3" /> : <Send className="h-3 w-3" />} {campaign.channel}</span><span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {campaign.sent || "—"} enviados</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-border-subtle pt-3 sm:flex sm:items-center sm:border-t-0 sm:pt-0">
                  <div><p className="page-kicker">Abertura</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.openRate}</p></div>
                  <div><p className="page-kicker">Cliques</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.clickRate}</p></div>
                  <div><p className="page-kicker">Receita</p><p className="mt-1 text-xs font-bold text-foreground">{campaign.revenue ? formatCurrency(campaign.revenue) : "—"}</p></div>
                  <button type="button" aria-label={`Opções da campanha ${campaign.name}`} className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground sm:block"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
            {filtered.length === 0 ? <div className="p-10 text-center"><p className="text-sm font-bold text-foreground">Nenhuma campanha encontrada</p><p className="mt-1 text-xs text-muted-foreground">Ajuste o filtro ou crie uma nova campanha.</p></div> : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3" aria-labelledby="campaigns-next">
        <article className="data-surface p-4 sm:p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3"><div><p className="page-kicker">Próxima ativação</p><h3 id="campaigns-next" className="mt-1 text-base font-bold tracking-tight">Recompra de agosto</h3></div><StatusPill tone="success"><CheckCircle2 className="mr-1 h-3 w-3" /> Ativa</StatusPill></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Público</p><p className="mt-2 text-lg font-extrabold">386</p><p className="mt-1 text-[10px] text-muted-foreground">clientes prontos</p></div><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Conversão</p><p className="mt-2 text-lg font-extrabold">22,8%</p><p className="mt-1 text-[10px] text-muted-foreground">cliques no WhatsApp</p></div><div className="rounded-xl border border-border-subtle bg-background/70 p-3"><p className="page-kicker">Receita</p><p className="mt-2 text-lg font-extrabold">R$ 18.420</p><p className="mt-1 text-[10px] text-muted-foreground">atribuída à campanha</p></div></div>
        </article>
        <aside className="data-surface p-4 sm:p-5"><div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent"><Clock3 className="h-4 w-4" /></div><div><p className="text-xs font-bold text-foreground">Operação recomendada</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Revise o rascunho de boas-vindas antes de ativar o canal de E-mail.</p></div></div><Button variant="outline" size="sm" onClick={() => setModalOpen(true)} className="mt-4 h-9 w-full text-xs font-semibold"><Copy className="h-3.5 w-3.5" /> Criar a partir deste modelo</Button></aside>
      </section>

      <CampaignModal open={modalOpen} onClose={() => setModalOpen(false)} audience={{ count: 386, label: "clientes selecionados" }} onSaved={handleCampaignSaved} />
    </div>
  );
}
