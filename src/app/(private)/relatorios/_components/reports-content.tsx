"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, BarChart3, CalendarDays, Check, Download, Filter, Layers3, RefreshCw, Sparkles, Store, TrendingUp, Users } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import { MetricCard, PageIntro } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { customerProfiles, formatCurrency, reportSegments } from "@/lib/crm-data";
import { getCustomDashboardDateRange, getDashboardDateRange, getDashboardMetrics, getRevenueTrend, getSalesChannelMetrics } from "@/lib/crm-selectors";

const periods = ["Últimos 30 dias", "Últimos 90 dias", "Este ano"] as const;
const reportTypes = ["Visão executiva", "Clientes", "Canais"] as const;

type ReportType = (typeof reportTypes)[number];
type ReportPeriod = (typeof periods)[number];

function orderCountLabel(count: number) {
  return `${count} ${count === 1 ? "pedido" : "pedidos"}`;
}

function getRange(period: ReportPeriod) {
  if (period === "Últimos 90 dias") return getDashboardDateRange("90d");
  if (period === "Este ano") return getCustomDashboardDateRange("2026-01-01", "2026-08-22");
  return getDashboardDateRange("30d");
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function RevenueTrend({ points }: { points: ReturnType<typeof getRevenueTrend> }) {
  if (!points.length) return <div className="mt-5 flex h-56 items-center justify-center rounded-xl border border-dashed border-border-subtle bg-background/60 p-5 text-center text-xs text-muted-foreground">Não há receita confirmada no período selecionado.</div>;
  const max = Math.max(...points.map((point) => point.value), 1);
  const coordinates = points.map((point, index) => `${points.length === 1 ? 50 : (index / (points.length - 1)) * 94 + 3},${116 - (point.value / max) * 94}`).join(" ");
  const area = `3,116 ${coordinates} 97,116`;
  return <div className="relative mt-5 h-56 overflow-hidden rounded-xl border border-border-subtle bg-background/60 p-3"><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_24%,rgba(20,22,25,0.06)_25%,transparent_26%,transparent_49%,rgba(20,22,25,0.06)_50%,transparent_51%,transparent_74%,rgba(20,22,25,0.06)_75%,transparent_76%)]" /><svg viewBox="0 0 100 130" preserveAspectRatio="none" className="relative h-full w-full" aria-label="Tendência de receita"><defs><linearGradient id="report-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#C09B32" stopOpacity="0.28" /><stop offset="100%" stopColor="#C09B32" stopOpacity="0.02" /></linearGradient></defs><polygon points={area} fill="url(#report-area)" /><polyline points={coordinates} fill="none" stroke="#C09B32" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />{points.map((point, index) => { const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 94 + 3; const y = 116 - (point.value / max) * 94; return <circle key={point.id} cx={x} cy={y} r="1.15" fill="#FFFFFF" stroke="#C09B32" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />; })}</svg><div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] font-medium text-muted-foreground"><span>{points[0]?.label}</span><span>{points[Math.floor(points.length / 2)]?.label}</span><span>{points[points.length - 1]?.label}</span></div></div>;
}

export function ReportsContent() {
  const [period, setPeriod] = useState<ReportPeriod>(periods[0]);
  const [reportType, setReportType] = useState<ReportType>(reportTypes[0]);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportType, setExportType] = useState<ReportType>(reportTypes[0]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const range = useMemo(() => getRange(period), [period]);
  const metrics = useMemo(() => getDashboardMetrics(range), [range]);
  const trend = useMemo(() => getRevenueTrend(range), [range]);
  const channels = useMemo(() => getSalesChannelMetrics(range).filter((channel) => channel.orders > 0), [range]);
  const riskCount = customerProfiles.filter((customer) => customer.status === "EM_RISCO").length;
  const topChannel = channels[0];

  const handleExport = () => {
    const rows = [["Indicador", "Valor", "Período"], ["Receita confirmada", formatCurrency(metrics.revenue), period], ["Pedidos atribuídos", String(metrics.orders), period], ["Clientes na base", String(metrics.customers), period], ["Conversas pendentes", String(metrics.pendingConversations), period], ["Ticket médio", formatCurrency(metrics.averageTicket), period], ...channels.map((channel) => [`Canal · ${channel.label}`, formatCurrency(channel.revenue), `${channel.orders} pedidos`])];
    downloadCsv(`neverx-relatorio-${period.toLowerCase().replaceAll(" ", "-")}.csv`, rows);
    setExportOpen(false);
    setFeedback(`Relatório de ${exportType.toLowerCase()} exportado com o recorte ${period.toLowerCase()}.`);
    window.setTimeout(() => setFeedback(null), 2800);
  };

  return <div className="page-frame"><PageIntro eyebrow="Leitura de negócio" title="Relatórios" description="Transforme o histórico de clientes, pedidos e canais em decisões para a próxima jornada." action={<div className="page-actions"><Button variant="outline" size="sm" onClick={() => setExportOpen(true)} className="h-9 text-xs font-semibold"><Download className="h-3.5 w-3.5" /> Exportar</Button><Button variant="accent" size="sm" onClick={() => { setFeedback(`Dados de ${period.toLowerCase()} recalculados agora.`); window.setTimeout(() => setFeedback(null), 2600); }} className="h-9 text-xs font-semibold"><RefreshCw className="h-3.5 w-3.5" /> Atualizar</Button></div>} />
    <div className="toolbar-surface flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between"><div className="mobile-scroll-row rounded-xl border border-border bg-background p-1">{reportTypes.map((type) => <button key={type} type="button" onClick={() => setReportType(type)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors ${reportType === type ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{type}</button>)}</div><div className="mobile-scroll-row items-center gap-1"><Filter className="ml-2 h-3.5 w-3.5 shrink-0 text-muted-foreground" />{periods.map((item) => <button key={item} type="button" onClick={() => setPeriod(item)} className={`shrink-0 rounded-lg border px-3 py-2 text-[11px] font-semibold transition-colors ${period === item ? "border-accent bg-accent/10 text-accent" : "border-border bg-card text-muted-foreground hover:bg-muted"}`}>{item}</button>)}</div></div>
    <section aria-label="Indicadores principais" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Receita confirmada" value={formatCurrency(metrics.revenue)} helper={period.toLowerCase()} icon={TrendingUp} accent /><MetricCard label="Pedidos atribuídos" value={String(metrics.orders)} helper="não cancelados" icon={Layers3} /><MetricCard label="Clientes com atividade" value={String(metrics.customers)} helper="no período" icon={Users} /><MetricCard label="Clientes em risco" value={String(riskCount)} helper="na base atual" icon={ArrowDownRight} /></section>
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]"><article className="data-surface p-4 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="page-kicker">{reportType}</p><h3 className="mt-1 text-base font-bold tracking-tight text-foreground">Evolução da receita</h3><p className="mt-1 text-[11px] text-muted-foreground">{period} · pedidos entregues ou em trânsito</p></div><div className="text-right"><p className="text-2xl font-extrabold tracking-[-0.04em] text-foreground">{formatCurrency(metrics.revenue)}</p><p className="mt-1 text-[11px] font-semibold text-muted-foreground">{trend.length} pontos de leitura</p></div></div><RevenueTrend points={trend} /></article><aside className="data-surface flex flex-col p-4 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="page-kicker">Sinal do período</p><h3 className="mt-1 text-base font-bold tracking-tight text-foreground">O que merece atenção</h3></div><Sparkles className="h-4 w-4 text-accent" /></div><div className="mt-5 rounded-xl border border-accent/20 bg-accent/5 p-4"><p className="text-sm font-bold leading-relaxed text-foreground">{topChannel ? `${topChannel.label} concentra ${topChannel.share} da receita ligada.` : "Ainda não há receita atribuída no período."}</p><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{topChannel ? `A origem responde por ${orderCountLabel(topChannel.orders)}. Use esse sinal para orientar a próxima ativação comercial.` : "Ajuste o recorte ou conecte uma origem de pedidos para liberar esta leitura."}</p></div><div className="mt-4 space-y-3"><div className="flex items-center justify-between border-b border-border-subtle pb-3 text-xs"><span className="text-muted-foreground">Conversas pendentes</span><strong className="text-foreground">{metrics.pendingConversations}</strong></div><div className="flex items-center justify-between border-b border-border-subtle pb-3 text-xs"><span className="text-muted-foreground">Taxa de resposta</span><strong className="text-foreground">{metrics.responseRate.toLocaleString("pt-BR")} %</strong></div><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Campanhas no recorte</span><strong className="text-accent">{metrics.campaigns}</strong></div></div></aside></section>
    <section className="grid gap-4 xl:grid-cols-2"><article className="data-surface overflow-hidden"><div className="flex items-center justify-between border-b border-border-subtle px-4 py-4 sm:px-5"><div><p className="page-kicker">Canais de venda</p><h3 className="mt-1 text-base font-bold tracking-tight">Receita por origem</h3></div><BarChart3 className="h-4 w-4 text-muted-foreground" /></div><div className="divide-y divide-border-subtle">{channels.length ? channels.map((channel) => <div key={channel.label} className="flex items-center gap-3 px-4 py-3.5 sm:px-5"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-card ${channel.logo ? "" : channel.color}`}>{channel.logo ? <PlatformLogo platform={channel.logo} size="sm" framed={false} /> : <Store className="h-4 w-4 text-muted-foreground" />}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-xs font-bold text-foreground">{channel.label}</p><p className="shrink-0 text-xs font-bold text-foreground">{formatCurrency(channel.revenue)}</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${channel.color}`} style={{ width: channel.share }} /></div><div className="mt-1 flex justify-between text-[10px] text-muted-foreground"><span>{orderCountLabel(channel.orders)}</span><span>{channel.share} do total</span></div></div></div>) : <div className="p-8 text-center text-xs text-muted-foreground">Nenhum canal com receita identificada neste período.</div>}</div></article><article className="data-surface overflow-hidden"><div className="flex items-center justify-between border-b border-border-subtle px-4 py-4 sm:px-5"><div><p className="page-kicker">Segmentos</p><h3 className="mt-1 text-base font-bold tracking-tight">Valor e conversão por grupo</h3></div><Users className="h-4 w-4 text-muted-foreground" /></div><div className="divide-y divide-border-subtle">{reportSegments.map((segment) => <div key={segment.label} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_120px_92px] sm:px-5"><div className="min-w-0"><p className="truncate text-xs font-bold text-foreground">{segment.label}</p><p className="mt-1 text-[10px] text-muted-foreground">{segment.customers} clientes</p></div><div className="text-right"><p className="text-xs font-bold text-foreground">{formatCurrency(segment.revenue)}</p><p className="mt-1 text-[10px] text-muted-foreground">receita</p></div><div className="text-right"><p className="text-xs font-bold text-accent">{segment.conversion}</p><p className="mt-1 text-[10px] text-muted-foreground">{segment.trend}</p></div></div>)}</div></article></section>
    {feedback ? <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success"><Check className="h-4 w-4" />{feedback}</div> : null}
    <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Exportar relatório" description="Escolha o tipo de leitura e o período que será exportado." footer={<><Button variant="ghost" size="sm" onClick={() => setExportOpen(false)}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleExport}><Download className="h-3.5 w-3.5" /> Baixar CSV</Button></>}><div className="space-y-4"><div className="grid gap-2 sm:grid-cols-3">{reportTypes.map((type) => <button key={type} type="button" onClick={() => setExportType(type)} className={`rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${exportType === type ? "border-accent bg-accent/5 text-foreground" : "border-border-subtle bg-card text-muted-foreground hover:bg-muted"}`}>{type}{exportType === type ? <Check className="mt-2 h-3.5 w-3.5 text-accent" /> : null}</button>)}</div><div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground"><CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0" /> O arquivo terá os indicadores e canais de {period.toLowerCase()}.</div></div></Modal>
  </div>;
}
