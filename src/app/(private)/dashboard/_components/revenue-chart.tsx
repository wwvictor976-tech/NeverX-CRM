"use client";

import { useState } from "react";
import { Calendar, Check, TrendingUp, X } from "lucide-react";
import { formatCurrency } from "@/lib/crm-data";
import { getRevenueTrend } from "@/lib/crm-selectors";
import { useDashboard } from "./dashboard-context";

type Point = { id: string; label: string; value: string; x: number; y: number };

function getBezierPath(points: Point[]): string {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = index === 0 ? points[0] : points[index - 1];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = index + 2 < points.length ? points[index + 2] : p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }
  return path;
}

export function RevenueChart() {
  const { range, periodKey, customStartDate, customEndDate, applyPreset, applyCustomRange, isRefreshing } = useDashboard();
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(customStartDate);
  const [endDate, setEndDate] = useState(customEndDate);
  const [dateError, setDateError] = useState<string | null>(null);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);


  const revenueTrend = getRevenueTrend(range);
  const revenueTotal = revenueTrend.reduce((sum, point) => sum + point.value, 0);
  const revenueMax = Math.max(...revenueTrend.map((point) => point.value), 1);
  const revenueMin = Math.min(...revenueTrend.map((point) => point.value), 0);
  const points: Point[] = revenueTrend.map((point, index) => ({
    id: point.id,
    label: point.label,
    value: formatCurrency(point.value),
    x: revenueTrend.length === 1 ? 50 : (index / (revenueTrend.length - 1)) * 100,
    y: revenueMax === revenueMin ? 48 : 84 - ((point.value - revenueMin) / (revenueMax - revenueMin)) * 64,
  }));
  const pathD = getBezierPath(points);
  const gradientD = pathD ? `${pathD} L 100 100 L 0 100 Z` : "";
  const displayPeriod = periodKey === "custom" ? "Personalizado" : range.label.replace("Últimos ", "");

  const handleCustomRange = () => {
    if (!startDate || !endDate) {
      setDateError("Escolha as duas datas para continuar.");
      return;
    }
    if (startDate > endDate) {
      setDateError("A data inicial deve ser anterior à data final.");
      return;
    }
    applyCustomRange(startDate, endDate);
    setDateError(null);
    setShowPicker(false);
  };

  return (
    <div className={`relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-card p-5 shadow-card transition-opacity duration-200 sm:p-6 ${isRefreshing ? "opacity-60" : "opacity-100"}`} aria-busy={isRefreshing}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-foreground">Receita ao longo do tempo</h3><span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success"><TrendingUp className="h-3 w-3" />Dados confirmados</span></div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{formatCurrency(revenueTotal)}</span><span className="text-xs text-muted-foreground">Receita confirmada · {range.label.toLowerCase()}</span></div>
        </div>
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border-subtle bg-background p-1 self-start sm:self-auto">
          {(["7d", "30d", "90d"] as const).map((preset) => <button key={preset} type="button" onClick={() => { applyPreset(preset); setShowPicker(false); }} className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${periodKey === preset ? "border border-border-subtle bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`}>{preset === "7d" ? "7 dias" : preset === "30d" ? "30 dias" : "90 dias"}</button>)}
          <button type="button" onClick={() => { setStartDate(customStartDate); setEndDate(customEndDate); setDateError(null); setShowPicker((value) => !value); }} className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${periodKey === "custom" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}><Calendar className="h-3 w-3" /><span>{periodKey === "custom" ? displayPeriod : "Personalizar"}</span></button>
        </div>
      </div>

      {showPicker ? <div className="mt-4 rounded-xl border border-border-subtle bg-background p-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold text-foreground">Intervalo personalizado</p><p className="mt-1 text-[11px] text-muted-foreground">Analise uma campanha, lançamento ou operação específica.</p></div><div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr_auto_auto] sm:items-end"><label className="space-y-1 text-[10px] font-bold text-muted-foreground">De<input aria-label="Data inicial da receita" type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setDateError(null); }} className="auth-input h-8 text-xs" /></label><span className="hidden pb-2 text-xs text-muted-foreground sm:block">até</span><label className="space-y-1 text-[10px] font-bold text-muted-foreground">Até<input aria-label="Data final da receita" type="date" value={endDate} onChange={(event) => { setEndDate(event.target.value); setDateError(null); }} className="auth-input h-8 text-xs" /></label><button type="button" onClick={handleCustomRange} className="flex h-8 items-center justify-center gap-1 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-hover"><Check className="h-3.5 w-3.5" />Aplicar</button><button type="button" onClick={() => setShowPicker(false)} aria-label="Fechar personalização de datas" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-card text-muted-foreground hover:bg-muted"><X className="h-3.5 w-3.5" /></button></div></div>{dateError ? <p role="alert" className="mt-3 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-[11px] font-semibold text-danger">{dateError}</p> : null}</div> : null}

      {points.length ? <>
        <div className="relative mt-6 h-52 w-full"><div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-20"><div className="w-full border-b border-dashed border-border-subtle" /><div className="w-full border-b border-dashed border-border-subtle" /><div className="w-full border-b border-dashed border-border-subtle" /></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-label="Evolução da receita"><defs><linearGradient id="goldGradFluid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient></defs><path d={gradientD} fill="url(#goldGradFluid)" /><path d={pathD} fill="none" stroke="#D4AF37" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="pointer-events-none absolute inset-0">{points.map((point) => { const isHovered = hoveredPointId === point.id; const alignClass = point.x === 0 ? "translate-x-0" : point.x === 100 ? "-translate-x-full" : "-translate-x-1/2"; return <div key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%` }} className="pointer-events-auto absolute z-10 -translate-y-1/2" onMouseEnter={() => setHoveredPointId(point.id)} onMouseLeave={() => setHoveredPointId(null)}><div className="absolute -inset-3 rounded-full" /><div className={`relative flex cursor-pointer items-center justify-center rounded-full bg-card shadow-sm ring-2 ring-[#D4AF37] transition-all duration-150 ${isHovered ? "h-4 w-4 scale-110 ring-4" : "h-3 w-3"}`}><div className="h-1 w-1 rounded-full bg-[#D4AF37]" /></div>{isHovered ? <div className={`absolute bottom-full z-30 mb-2.5 ${alignClass} pointer-events-none whitespace-nowrap rounded-xl border border-border-subtle bg-[#111111] px-3 py-1.5 text-center shadow-xl`}><p className="text-[10px] font-semibold leading-none text-[#6E6E73]">{point.label}</p><p className="mt-1 text-xs font-bold leading-none text-white">{point.value}</p></div> : null}</div>; })}</div></div>
        <div className="mt-4 flex justify-between border-t border-border-subtle pt-3 text-[11px] font-semibold text-muted-foreground">{points.map((point) => <span key={`${point.id}-label`}>{point.label}</span>)}</div>
      </> : <div className="mt-6 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-muted/10 px-5 text-center"><TrendingUp className="h-5 w-5 text-muted-foreground" /><p className="mt-2 text-xs font-bold text-foreground">Sem receita confirmada neste período</p><p className="mt-1 max-w-xs text-[11px] leading-relaxed text-muted-foreground">Altere o intervalo para comparar o ritmo de vendas da sua loja.</p></div>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground"><span>{points.length} {points.length === 1 ? "ponto de venda identificado" : "pontos de venda identificados"}</span><span>Pedidos entregues ou em trânsito</span></div>
    </div>
  );
}
