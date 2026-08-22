"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Check, Download, MessageSquareText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/crm-data";
import { getDashboardMetrics, getSalesChannelMetrics } from "@/lib/crm-selectors";
import { useDashboard } from "./dashboard-context";

type DashboardModal = "period" | "export" | null;
type PresetPeriod = "today" | "7d" | "30d" | "90d";

const periods: Array<{ key: PresetPeriod; label: string; detail: string }> = [
  { key: "today", label: "Hoje", detail: "A operação em tempo real" },
  { key: "7d", label: "Últimos 7 dias", detail: "A semana corrente" },
  { key: "30d", label: "Últimos 30 dias", detail: "A visão recomendada" },
  { key: "90d", label: "Últimos 90 dias", detail: "Tendência trimestral" },
];

function formatUpdatedAt(date: Date | null) {
  if (!date) return "Ainda não atualizado nesta sessão";
  return `Atualizado às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

function escapeCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function DashboardHeader() {
  const {
    range,
    periodKey,
    customStartDate,
    customEndDate,
    isRefreshing,
    lastUpdatedAt,
    refreshMessage,
    applyPreset,
    applyCustomRange,
    refresh,
  } = useDashboard();
  const [activeModal, setActiveModal] = useState<DashboardModal>(null);
  const [draftStartDate, setDraftStartDate] = useState(customStartDate);
  const [draftEndDate, setDraftEndDate] = useState(customEndDate);
  const [dateError, setDateError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<"CSV" | "Imprimir">("CSV");
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);
  const displayPeriod = periodKey === "custom" ? "Personalizado" : range.label;

  const openPeriodModal = () => {
    setDraftStartDate(customStartDate);
    setDraftEndDate(customEndDate);
    setDateError(null);
    setActiveModal("period");
  };

  const handleCustomRange = () => {
    if (!draftStartDate || !draftEndDate) {
      setDateError("Escolha as duas datas para continuar.");
      return;
    }
    if (draftStartDate > draftEndDate) {
      setDateError("A data inicial deve ser anterior à data final.");
      return;
    }
    applyCustomRange(draftStartDate, draftEndDate);
    setDateError(null);
    closeModal();
  };

  const handleExport = () => {
    const metrics = getDashboardMetrics(range);
    if (exportFormat === "Imprimir") {
      setExportMessage("A janela de impressão foi aberta para guardar ou imprimir o resumo.");
      window.setTimeout(() => window.print(), 120);
      return;
    }

    const channelRows = getSalesChannelMetrics(range).map((channel) => [
      channel.label,
      channel.orders,
      formatCurrency(channel.revenue),
    ]);
    const rows = [
      ["Métrica", "Valor"],
      ["Período", range.label],
      ["Receita confirmada", formatCurrency(metrics.revenue)],
      ["Pedidos rastreados", metrics.orders],
      ["Clientes com atividade", metrics.customers],
      ["Novos clientes", metrics.newCustomers],
      ["Conversas pendentes", metrics.pendingConversations],
      ["Taxa de resposta", `${metrics.responseRate}%`],
      [],
      ["Canal", "Pedidos", "Receita"],
      ...channelRows,
    ];
    const csv = rows.map((row) => row.map((value) => escapeCsv(value ?? "")).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `neverx-dashboard-${periodKey}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    setExportMessage("CSV baixado com o resumo do período selecionado.");
  };

  return (
    <>
      <div className="rounded-2xl border border-border-subtle bg-card p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/20 bg-success/5 px-2 py-1 text-[10px] font-bold text-success">
                <span className={`h-1.5 w-1.5 rounded-full ${isRefreshing ? "animate-pulse bg-accent" : "bg-success"}`} />
                {isRefreshing ? "Sincronizando" : "Operação acompanhada"}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground" aria-live="polite">{refreshMessage}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-sm font-extrabold tracking-tight text-foreground">Visão da operação</p>
              <span className="text-[11px] text-muted-foreground">{formatUpdatedAt(lastUpdatedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/conversas" className="hidden h-9 items-center gap-1.5 rounded-xl border border-border-subtle bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted sm:inline-flex">
              <MessageSquareText className="h-3.5 w-3.5 text-muted-foreground" />
              Ver atendimento
            </Link>
            <Button variant="outline" size="sm" onClick={openPeriodModal} className="bg-background">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              {displayPeriod}
            </Button>
            <Button variant="outline" size="icon" onClick={refresh} isLoading={isRefreshing} aria-label="Atualizar dados" className="bg-background">
              {!isRefreshing ? <RefreshCw className="h-3.5 w-3.5" /> : null}
            </Button>
            <Button variant="accent" size="sm" onClick={() => { setExportMessage(null); setActiveModal("export"); }}>
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={activeModal === "period"}
        onClose={closeModal}
        title="Período de análise"
        description="Escolha a janela que será aplicada aos KPIs, gráficos, canais e atividade do Dashboard."
        maxWidth="lg"
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={closeModal}>Cancelar</Button>
            <Button variant="accent" size="sm" onClick={handleCustomRange}>
              <Check className="h-3.5 w-3.5" /> Aplicar período
            </Button>
          </>
        )}
      >
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-foreground">Períodos rápidos</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Ideal para alternar entre acompanhamento diário e tendência.</p>
              </div>
              <span className="rounded-lg bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">Atual: {displayPeriod}</span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {periods.map((period) => {
                const isSelected = periodKey === period.key;
                return (
                  <button
                    key={period.key}
                    type="button"
                    onClick={() => { applyPreset(period.key); closeModal(); }}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${isSelected ? "border-accent bg-accent/5" : "border-border-subtle bg-card hover:border-border hover:bg-muted/50"}`}
                  >
                    <span><strong className="block text-xs font-bold text-foreground">{period.label}</strong><span className="mt-1 block text-[10px] text-muted-foreground">{period.detail}</span></span>
                    {isSelected ? <Check className="h-4 w-4 shrink-0 text-accent" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border-subtle bg-muted/20 p-4">
            <p className="text-xs font-bold text-foreground">Período personalizado</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Use datas exatas para analisar uma campanha, lançamento ou operação específica.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5 text-[11px] font-bold text-muted-foreground">
                Data inicial
                <input aria-label="Data inicial" type="date" value={draftStartDate} onChange={(event) => { setDraftStartDate(event.target.value); setDateError(null); }} className="auth-input h-10 text-xs" />
              </label>
              <label className="space-y-1.5 text-[11px] font-bold text-muted-foreground">
                Data final
                <input aria-label="Data final" type="date" value={draftEndDate} onChange={(event) => { setDraftEndDate(event.target.value); setDateError(null); }} className="auth-input h-10 text-xs" />
              </label>
            </div>
            {dateError ? <p role="alert" className="mt-3 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-[11px] font-semibold text-danger">{dateError}</p> : null}
          </div>
        </div>
      </Modal>

      <Modal
        open={activeModal === "export"}
        onClose={closeModal}
        title="Exportar resumo operacional"
        description="Leve os indicadores e a origem das vendas para uma análise externa."
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={closeModal}>Fechar</Button>
            <Button variant="accent" size="sm" onClick={handleExport}>
              <Download className="h-3.5 w-3.5" /> {exportFormat === "CSV" ? "Descarregar CSV" : "Abrir impressão"}
            </Button>
          </>
        )}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-border-subtle bg-muted/20 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Escopo selecionado</p>
            <p className="mt-1 text-sm font-bold text-foreground">Dashboard completo</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{range.label}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Destino</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["CSV", "Imprimir"] as const).map((format) => (
                <button key={format} type="button" onClick={() => setExportFormat(format)} className={`rounded-xl border p-3 text-left transition-colors ${exportFormat === format ? "border-accent bg-accent/5" : "border-border-subtle text-muted-foreground hover:bg-muted"}`}>
                  <span className="block text-xs font-bold text-foreground">{format}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">{format === "CSV" ? "Dados tabulares para análise" : "Resumo pronto para guardar"}</span>
                </button>
              ))}
            </div>
          </div>
          {exportMessage ? <p role="status" className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{exportMessage}</p> : null}
        </div>
      </Modal>
    </>
  );
}
