"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ExternalLink, PlugZap, Search, X } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import { PageIntro, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { integrationCategoryLabels, integrationRegistry, type IntegrationCategory, type IntegrationId } from "@/lib/integration-registry";
import { useCrmSettings } from "@/components/settings/crm-settings-context";

export function IntegrationsContent() {
  const { connectedIntegrations, isIntegrationConnected, setIntegrationConnected } = useCrmSettings();
  const searchParams = useSearchParams();
  const requestedIntegration = searchParams.get("integration") as IntegrationId | null;
  const initialSelectedId = requestedIntegration && integrationRegistry.some((integration) => integration.id === requestedIntegration) ? requestedIntegration : null;
  const [selectedId, setSelectedId] = useState<IntegrationId | null>(initialSelectedId);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const connected = new Set(connectedIntegrations);
  const selectedIntegration = integrationRegistry.find((integration) => integration.id === selectedId) ?? null;
  const normalizedSearch = search.trim().toLowerCase();
  const visibleIntegrations = useMemo(() => integrationRegistry.filter((integration) => !normalizedSearch || `${integration.name} ${integration.description} ${integration.helper}`.toLowerCase().includes(normalizedSearch)), [normalizedSearch]);


  const handleOpen = (integration: (typeof integrationRegistry)[number]) => { setSelectedId(integration.id); setFeedback(null); setFormValues({}); };
  const handleClose = () => { setSelectedId(null); setFeedback(null); };
  const handleConnect = () => {
    if (!selectedIntegration) return;
    const wasConnected = isIntegrationConnected(selectedIntegration.id);
    setIntegrationConnected(selectedIntegration.id, !wasConnected);
    setFeedback(wasConnected ? "Conta desligada neste protótipo." : "Conta conectada ao workspace. Pedidos, canais e indicadores passam a reconhecer esta origem.");
  };

  const renderCategory = (category: IntegrationCategory) => {
    const items = visibleIntegrations.filter((integration) => integration.category === category);
    if (!items.length) return null;
    const meta = integrationCategoryLabels[category];
    return <section key={category} className="space-y-3"><SectionIntro eyebrow="Conexões" title={meta.title} description={meta.description} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((integration) => { const Icon = integration.icon; const isConnected = connected.has(integration.id); return <article key={integration.id} className={`card-surface group flex min-h-52 flex-col p-5 ${isConnected ? "border-success/30" : ""}`}><div className="flex items-start justify-between gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-muted/40">{integration.logo ? <PlatformLogo platform={integration.logo} size="md" framed={false} /> : <Icon className={`h-5 w-5 ${integration.iconClass}`} />}</div><StatusPill tone={isConnected ? "success" : "neutral"}><span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isConnected ? "bg-success" : "bg-muted-foreground/50"}`} />{isConnected ? "Conectado" : "Não conectado"}</StatusPill></div><div className="mt-4 flex-1"><h4 className="text-sm font-bold text-foreground">{integration.name}</h4><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{integration.description}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{integration.helper}</p></div><div className="mt-4 flex items-center justify-between gap-2"><button type="button" onClick={() => handleOpen(integration)} className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground transition-colors hover:text-foreground"><span aria-hidden="true">•••</span> Configurar</button><Button variant={isConnected ? "outline" : "accent"} size="sm" onClick={() => handleOpen(integration)} className="h-8 text-xs font-bold">{isConnected ? "Gerir conta" : "Conectar conta"}</Button></div></article>; })}</div></section>;
  };

  return <div className="page-frame"><PageIntro eyebrow="Fontes da operação" title="Integrações" description="Conecte canais de venda, atendimento e operação para relacionar pedidos, dados e conversas ao mesmo cliente." meta={<StatusPill tone={connected.size ? "success" : "neutral"}><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" /> {connected.size} conectadas</StatusPill>} /><section className="toolbar-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Pesquisa de integrações"><div className="flex min-w-0 items-center gap-3"><div className="brand-chip text-accent"><PlugZap className="h-4 w-4" /></div><div className="min-w-0"><p className="text-xs font-bold text-foreground">Origens de dados</p><p className="truncate text-[11px] text-muted-foreground">Escolha os sistemas que alimentam o perfil unificado do cliente.</p></div></div><div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filtrar integrações..." className="auth-input h-9 pl-9 text-xs" /></div></section><div className="space-y-8">{renderCategory("vendas")}{renderCategory("relacionamento")}{renderCategory("operacao")}</div><Modal open={!!selectedIntegration} onClose={handleClose} title={selectedIntegration ? `${isIntegrationConnected(selectedIntegration.id) ? "Gerir" : "Conectar"} ${selectedIntegration.name}` : "Conectar integração"} description={selectedIntegration?.description} footer={selectedIntegration ? <><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant={isIntegrationConnected(selectedIntegration.id) ? "danger" : "accent"} size="sm" onClick={handleConnect}>{isIntegrationConnected(selectedIntegration.id) ? <><X className="h-3.5 w-3.5" /> Desconectar conta</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Conectar conta</>}</Button></> : null}>{selectedIntegration ? <div className="space-y-4"><div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm">{selectedIntegration.logo ? <PlatformLogo platform={selectedIntegration.logo} size="sm" framed={false} /> : <selectedIntegration.icon className={`h-5 w-5 ${selectedIntegration.iconClass}`} />}</div><div><p className="text-xs font-bold text-foreground">{selectedIntegration.name}</p><p className="text-[11px] text-muted-foreground">{selectedIntegration.helper}</p></div></div><div className="grid gap-3">{selectedIntegration.fields.map((field) => { const key = `${selectedIntegration.id}-${field}`; return <label key={field} className="space-y-1.5 text-xs font-semibold text-foreground">{field}<input value={formValues[key] ?? ""} onChange={(event) => setFormValues((current) => ({ ...current, [key]: event.target.value }))} className="auth-input" placeholder={`Informe ${field.toLowerCase()}`} /></label>; })}</div><div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground"><ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />A autenticação segura será concluída quando o provedor estiver configurado para esta conta.</div>{feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}</div> : null}</Modal></div>;
}
