"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Check, CircleDollarSign, Download, Filter, RefreshCw, WalletCards } from "lucide-react";
import { PageFrame, PageIntro, MetricCard, SectionIntro, StatusPill } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { financialEntries, formatCurrency, orders } from "@/lib/crm-data";
import { getCustomDashboardDateRange, getDashboardDateRange, getDashboardMetrics, getSalesChannelMetrics, isDateInDashboardRange } from "@/lib/crm-selectors";

const periods = ["Últimos 30 dias", "Últimos 90 dias", "Este ano"] as const;
type FinancePeriod = (typeof periods)[number];
const statusLabels = { confirmed: "Confirmada", pending: "Pendente", cancelled: "Cancelada" } as const;

function getRange(period: FinancePeriod) {
  if (period === "Últimos 90 dias") return getDashboardDateRange("90d");
  if (period === "Este ano") return getCustomDashboardDateRange("2026-01-01", "2026-08-22");
  return getDashboardDateRange("30d");
}

function downloadCsv(rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "neverx-financeiro.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function FinanceContent() {
  const [period, setPeriod] = useState<FinancePeriod>(periods[0]);
  const [exportOpen, setExportOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const range = useMemo(() => getRange(period), [period]);
  const scopedEntries = useMemo(() => financialEntries.filter((entry) => isDateInDashboardRange(entry.occurredAt, range)), [range]);
  const metrics = useMemo(() => getDashboardMetrics(range), [range]);
  const channels = useMemo(() => getSalesChannelMetrics(range), [range]);
  const confirmed = scopedEntries.filter((entry) => entry.status === "confirmed");
  const pending = scopedEntries.filter((entry) => entry.status === "pending");
  const refunded = scopedEntries.filter((entry) => entry.type === "refund");
  const grossRevenue = confirmed.filter((entry) => entry.type === "revenue").reduce((sum, entry) => sum + entry.amount, 0);
  const refundValue = refunded.reduce((sum, entry) => sum + entry.amount, 0);
  const netRevenue = grossRevenue - refundValue;

  const showFeedback = (message: string) => { setFeedback(message); window.setTimeout(() => setFeedback(null), 2600); };
  const exportFinance = () => {
    const rows = [["Movimento", "Pedido", "Cliente", "Tipo", "Status", "Valor", "Data"], ...scopedEntries.map((entry) => { const order = orders.find((item) => item.id === entry.orderId); return [entry.id, order?.id ?? "—", order?.customerName ?? "Cliente não identificado", entry.type === "refund" ? "Reembolso" : entry.type === "fee" ? "Taxa" : "Receita", statusLabels[entry.status], formatCurrency(entry.amount), entry.occurredAt]; })];
    downloadCsv(rows);
    setExportOpen(false);
    showFeedback(`Exportação financeira concluída para ${period.toLowerCase()}.`);
  };

  return <PageFrame><PageIntro eyebrow="Controle financeiro" title="Financeiro" description="Acompanhe receita, pedidos, reembolsos e origem de faturamento com a mesma base que alimenta o Dashboard." action={<div className="page-actions"><Button variant="outline" size="sm" onClick={() => setExportOpen(true)} className="h-9 text-xs font-semibold"><Download className="h-3.5 w-3.5" /> Exportar</Button><Button variant="accent" size="sm" onClick={() => showFeedback(`Dados financeiros de ${period.toLowerCase()} recalculados agora.`)} className="h-9 text-xs font-semibold"><RefreshCw className="h-3.5 w-3.5" /> Atualizar</Button></div>} meta={<StatusPill tone="success"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />{confirmed.length} movimentos confirmados</StatusPill>} />
    <div className="toolbar-surface flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 px-2 text-xs font-bold text-foreground"><WalletCards className="h-4 w-4 text-accent" /> Visão financeira</div><div className="mobile-scroll-row gap-1">{periods.map((item) => <button type="button" key={item} onClick={() => setPeriod(item)} className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold ${period === item ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{item}</button>)}</div></div>
    <section className="space-y-3"><SectionIntro eyebrow="Leitura executiva" title="Saúde financeira" description="Valores ligados aos pedidos e às entradas financeiras do workspace." /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Receita líquida" value={formatCurrency(netRevenue)} helper="receita menos reembolsos" icon={CircleDollarSign} accent /><MetricCard label="Ticket médio" value={formatCurrency(metrics.averageTicket)} helper="por pedido confirmado" icon={ArrowUpRight} /><MetricCard label="A receber" value={formatCurrency(pending.reduce((sum, entry) => sum + entry.amount, 0))} helper="movimentos pendentes" icon={CalendarDays} /><MetricCard label="Reembolsos" value={formatCurrency(refundValue)} helper="no período selecionado" icon={ArrowDownRight} /></div></section>
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"><article className="data-surface overflow-hidden"><div className="flex items-center justify-between border-b border-border-subtle px-4 py-4 sm:px-5"><div><p className="page-kicker">Movimentos · {period}</p><h3 className="mt-1 text-base font-extrabold tracking-tight text-foreground">Entradas financeiras</h3></div><Filter className="h-4 w-4 text-muted-foreground" /></div><div className="divide-y divide-border-subtle">{scopedEntries.length ? scopedEntries.map((entry) => { const order = orders.find((item) => item.id === entry.orderId); return <div key={entry.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${entry.type === "refund" ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}`}><CircleDollarSign className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-extrabold text-foreground">{order?.id ?? entry.id}</p><StatusPill tone={entry.status === "confirmed" ? "success" : entry.status === "pending" ? "warning" : "danger"}>{statusLabels[entry.status]}</StatusPill></div><p className="mt-1 text-[10px] text-muted-foreground">{order?.customerName ?? "Cliente não identificado"} · {entry.occurredAt}</p></div><div className="text-right"><p className={`text-xs font-extrabold ${entry.type === "refund" ? "text-danger" : "text-foreground"}`}>{entry.type === "refund" ? "-" : ""}{formatCurrency(entry.amount)}</p><p className="mt-1 text-[10px] text-muted-foreground">{entry.type === "refund" ? "reembolso" : entry.type === "fee" ? "taxa" : "receita"}</p></div></div>; }) : <div className="p-10 text-center text-xs text-muted-foreground">Nenhum movimento encontrado no período selecionado.</div>}</div></article><article className="data-surface overflow-hidden"><div className="border-b border-border-subtle px-4 py-4 sm:px-5"><p className="page-kicker">Origem da receita</p><h3 className="mt-1 text-base font-extrabold tracking-tight text-foreground">Canais ligados ao negócio</h3></div><div className="divide-y divide-border-subtle">{channels.filter((channel) => channel.orders > 0).length ? channels.filter((channel) => channel.orders > 0).map((channel) => <div key={channel.label} className="flex items-center gap-3 px-4 py-4 sm:px-5"><div className="h-2.5 w-2.5 rounded-full bg-accent" /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-xs font-bold text-foreground">{channel.label}</p><p className="text-xs font-extrabold text-foreground">{formatCurrency(channel.revenue)}</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-accent" style={{ width: channel.share }} /></div><p className="mt-1 text-[10px] text-muted-foreground">{channel.orders} {channel.orders === 1 ? "pedido" : "pedidos"} · {channel.share} da receita ligada</p></div></div>) : <div className="p-10 text-center text-xs text-muted-foreground">Nenhum canal com receita identificada neste período.</div>}</div><div className="border-t border-border-subtle bg-muted/20 px-4 py-3 text-[10px] text-muted-foreground sm:px-5">Receita bruta {formatCurrency(grossRevenue)} · Receita líquida {formatCurrency(netRevenue)}</div></article></section>
    {feedback ? <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-xs font-semibold text-success"><Check className="h-4 w-4" />{feedback}</div> : null}
    <Modal open={exportOpen} onClose={() => setExportOpen(false)} title="Exportar financeiro" description={`Preparar movimentos e receita para ${period.toLowerCase()}.`} footer={<><Button variant="ghost" size="sm" onClick={() => setExportOpen(false)}>Cancelar</Button><Button variant="accent" size="sm" onClick={exportFinance}><Download className="h-3.5 w-3.5" /> Baixar CSV</Button></>}><div className="rounded-xl border border-border-subtle bg-muted/20 p-4 text-xs leading-relaxed text-muted-foreground">O arquivo inclui receita, taxas, reembolsos, status, pedido e cliente relacionado.</div></Modal>
  </PageFrame>;
}
