"use client";

import { useState } from "react";
import Link from "next/link";
import { BellRing, Check, ChevronRight, CircleUserRound, Clock3, ExternalLink, Link2, Package, RotateCcw, Save, Settings2, ShieldCheck, UsersRound, WalletCards, type LucideIcon } from "lucide-react";
import { PageIntro, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { PlatformLogo, type PlatformLogoKey } from "@/components/platform-logo";
import { Button } from "@/components/ui/button";
import { integrationRegistry, type IntegrationId } from "@/lib/integration-registry";
import { orders } from "@/lib/crm-data";
import { useCrmSettings } from "@/components/settings/crm-settings-context";

const settingsSections = [
  { id: "workspace", label: "Workspace", description: "Identidade e preferências", icon: Settings2 },
  { id: "integracoes", label: "Integrações", description: "Canais e conexões", icon: Link2 },
  { id: "pedidos", label: "Pedidos e dados", description: "Sincronização operacional", icon: Package },
  { id: "notificacoes", label: "Notificações", description: "Alertas e resumos", icon: BellRing },
] as const;

type SettingsSection = (typeof settingsSections)[number]["id"];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${checked ? "border-foreground bg-foreground" : "border-border bg-muted"}`}><span className={`h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-1"}`} /></button>;
}

export function SettingsContent() {
  const { settings, updateSettings, resetSettings, connectedIntegrations, isIntegrationConnected } = useCrmSettings();
  const [activeSection, setActiveSection] = useState<SettingsSection>("workspace");
  const [saved, setSaved] = useState(false);
  const connectedDefinitions = integrationRegistry.filter((integration) => isIntegrationConnected(integration.id));
  const pendingDefinitions = integrationRegistry.filter((integration) => !isIntegrationConnected(integration.id));

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const openSection = (section: SettingsSection) => {
    setActiveSection(section);
    setSaved(false);
  };

  return (
    <div className="page-frame">
      <PageIntro eyebrow="Administração do workspace" title="Configurações" description="Centralize as preferências do CRM, os canais conectados e as regras que mantêm pedidos, clientes e conversas sincronizados." meta={<StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" /> Workspace operacional</StatusPill>} />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><article className="card-surface border-l-2 border-l-accent p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><p className="page-kicker">Workspace</p><CircleUserRound className="h-4 w-4 text-muted-foreground" /></div><p className="mt-4 truncate text-lg font-extrabold tracking-[-0.04em] text-foreground">{settings.workspaceName}</p><p className="mt-2 text-[11px] text-muted-foreground">Perfil administrador</p></article><article className="card-surface p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><p className="page-kicker">Integrações</p><Link2 className="h-4 w-4 text-muted-foreground" /></div><p className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-foreground">{connectedIntegrations.length}<span className="ml-1 text-sm font-semibold text-muted-foreground">/ {integrationRegistry.length}</span></p><p className="mt-2 text-[11px] text-muted-foreground">Canais a alimentar o CRM</p></article><article className="card-surface p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><p className="page-kicker">Pedidos</p><Package className="h-4 w-4 text-muted-foreground" /></div><p className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-foreground">{orders.length}</p><p className="mt-2 text-[11px] text-muted-foreground">Registos no workspace</p></article><article className="card-surface p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><p className="page-kicker">Alertas SLA</p><BellRing className="h-4 w-4 text-muted-foreground" /></div><p className="mt-4 text-lg font-extrabold tracking-[-0.04em] text-foreground">{settings.slaAlerts ? "Ativos" : "Pausados"}</p><p className="mt-2 text-[11px] text-muted-foreground">Notificações de atendimento</p></article></section>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="data-surface h-fit p-2"><p className="px-3 pb-2 pt-2 page-kicker">Preferências</p>{settingsSections.map((section) => { const Icon = section.icon; const active = activeSection === section.id; return <button key={section.id} type="button" onClick={() => openSection(section.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${active ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? "bg-primary-foreground/10 text-accent" : "bg-muted text-muted-foreground"}`}><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-bold">{section.label}</span><span className={`mt-0.5 block truncate text-[10px] ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{section.description}</span></span><ChevronRight className="h-3.5 w-3.5 shrink-0" /></button>; })}</aside>

        <section className="min-w-0 space-y-5">
          {activeSection === "workspace" ? <>
            <section className="data-surface p-5 sm:p-6"><SectionIntro eyebrow="Identidade do workspace" title="Como a operação aparece no CRM" description="Estas preferências definem o contexto usado nos cabeçalhos, alertas e fluxos internos." /><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="space-y-1.5 text-xs font-semibold text-foreground">Nome do workspace<input value={settings.workspaceName} onChange={(event) => updateSettings({ workspaceName: event.target.value })} className="auth-input mt-1.5" placeholder="Ex.: NeverX Store" /></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Canal padrão de atendimento<select value={settings.defaultChannel} onChange={(event) => updateSettings({ defaultChannel: event.target.value as typeof settings.defaultChannel })} className="auth-input mt-1.5"><option value="whatsapp">WhatsApp</option><option value="email">E-mail</option><option value="outro">Outro canal</option></select></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Fuso horário<select value={settings.timezone} onChange={(event) => updateSettings({ timezone: event.target.value })} className="auth-input mt-1.5"><option value="America/Sao_Paulo">Brasília (UTC−03:00)</option><option value="America/Manaus">Manaus (UTC−04:00)</option><option value="America/Belem">Belém (UTC−03:00)</option></select></label><label className="space-y-1.5 text-xs font-semibold text-foreground">Moeda principal<select value={settings.currency} onChange={(event) => updateSettings({ currency: event.target.value as typeof settings.currency })} className="auth-input mt-1.5"><option value="BRL">Real brasileiro (BRL)</option><option value="USD">Dólar americano (USD)</option><option value="EUR">Euro (EUR)</option></select></label></div></section>
            <section className="toolbar-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="brand-chip text-accent"><ShieldCheck className="h-4 w-4" /></div><div><p className="text-xs font-bold text-foreground">Dados protegidos por workspace</p><p className="mt-0.5 text-[11px] text-muted-foreground">As preferências são partilhadas entre todas as páginas deste workspace durante a sessão.</p></div></div><Button variant="outline" size="sm" onClick={resetSettings}><RotateCcw className="h-3.5 w-3.5" /> Restaurar padrão</Button></section>
          </> : null}

          {activeSection === "integracoes" ? <section className="data-surface p-5 sm:p-6"><SectionIntro eyebrow="Canais conectados" title="Integrações que alimentam o CRM" description="O estado destas conexões é partilhado com Pedidos, Conversas e os indicadores do workspace." action={<Link href="/integracoes" className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline">Gerir integrações <ExternalLink className="h-3 w-3" /></Link>} /><div className="mt-5 space-y-2">{connectedDefinitions.map((integration) => <IntegrationRow key={integration.id} id={integration.id} name={integration.name} logo={integration.logo} icon={integration.icon} status="Conectado" tone="success" helper={`${integration.category === "vendas" ? "Pedidos e receita" : integration.category === "relacionamento" ? "Conversas e atendimento" : "Dados operacionais"}`} />)}{pendingDefinitions.slice(0, 3).map((integration) => <IntegrationRow key={integration.id} id={integration.id} name={integration.name} logo={integration.logo} icon={integration.icon} status="Disponível" tone="neutral" helper="Pronto para conectar" />)}</div><Link href="/integracoes" className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-muted/20 px-3 py-2.5 text-xs font-bold text-foreground hover:bg-muted">Ver catálogo completo <ChevronRight className="h-3.5 w-3.5" /></Link></section> : null}

          {activeSection === "pedidos" ? <section className="data-surface p-5 sm:p-6"><SectionIntro eyebrow="Pedidos e dados" title="Sincronização operacional" description="Defina como as origens de venda entram no CRM e como o histórico se relaciona com Clientes e Relatórios." /><div className="mt-5 space-y-3"><PreferenceRow icon={RotateCcw} title="Sincronizar pedidos automaticamente" description="Atualizar pedidos, estados de entrega e tracking a partir dos canais conectados." checked={settings.orderAutoSync} onChange={(checked) => updateSettings({ orderAutoSync: checked })} /><PreferenceRow icon={UsersRound} title="Unificar clientes por e-mail" description="Evitar duplicados quando o mesmo cliente compra em mais de uma origem." checked={settings.customerMerge} onChange={(checked) => updateSettings({ customerMerge: checked })} /></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><Link href="/pedidos" className="card-surface flex items-center gap-3 p-4 hover:border-accent/40"><div className="brand-chip text-accent"><Package className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-xs font-bold text-foreground">Abrir Pedidos</p><p className="mt-1 text-[10px] text-muted-foreground">Ver origem, entrega e tracking</p></div><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link><Link href="/relatorios" className="card-surface flex items-center gap-3 p-4 hover:border-accent/40"><div className="brand-chip text-accent"><WalletCards className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-xs font-bold text-foreground">Abrir Relatórios</p><p className="mt-1 text-[10px] text-muted-foreground">Acompanhar receita por canal</p></div><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link></div></section> : null}

          {activeSection === "notificacoes" ? <section className="data-surface p-5 sm:p-6"><SectionIntro eyebrow="Comunicação operacional" title="Alertas que merecem atenção" description="Escolha quais sinais devem aparecer no Header e orientar a equipa no dia a dia." /><div className="mt-5 space-y-3"><PreferenceRow icon={BellRing} title="Alertas de SLA" description="Avisar quando um ticket se aproxima do limite de resposta." checked={settings.slaAlerts} onChange={(checked) => updateSettings({ slaAlerts: checked })} /><PreferenceRow icon={Clock3} title="Resumo semanal" description="Receber uma síntese de pedidos, receita e conversas da semana." checked={settings.weeklyDigest} onChange={(checked) => updateSettings({ weeklyDigest: checked })} /></div></section> : null}

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border-subtle pt-4"><p className={`mr-auto text-xs font-semibold ${saved ? "text-success" : "text-muted-foreground"}`}>{saved ? <><Check className="mr-1 inline h-3.5 w-3.5" /> Preferências guardadas neste browser.</> : "As alterações são aplicadas ao workspace actual."}</p><Button variant="accent" size="sm" onClick={handleSave}><Save className="h-3.5 w-3.5" /> Guardar alterações</Button></div>
        </section>
      </div>
    </div>
  );
}

function PreferenceRow({ icon: Icon, title, description, checked, onChange }: { icon: typeof BellRing; title: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-card p-4"><div className="brand-chip shrink-0 text-muted-foreground"><Icon className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-xs font-bold text-foreground">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{description}</p></div><Toggle checked={checked} onChange={onChange} label={title} /></div>;
}

function IntegrationRow({ id, name, logo, icon: Icon, status, tone, helper }: { id: IntegrationId; name: string; logo?: PlatformLogoKey; icon: LucideIcon; status: string; tone: "success" | "neutral"; helper: string }) {
  return <Link href={`/integracoes?integration=${id}`} className="flex items-center gap-3 rounded-xl border border-border-subtle bg-card p-3 transition-colors hover:border-accent/40 hover:bg-muted/20"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-muted/30">{logo ? <PlatformLogo platform={logo} size="sm" framed={false} /> : <Icon className="h-4 w-4 text-accent" />}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-foreground">{name}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{helper}</p></div><StatusPill tone={tone}>{status}</StatusPill><ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" /></Link>;
}
