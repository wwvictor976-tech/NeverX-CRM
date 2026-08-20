"use client";

import { useState } from "react";
import { Calendar, Check, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type DashboardModal = "period" | "export" | null;

const periods = ["Hoje", "Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias"];

export function DashboardHeader() {
  const [activeModal, setActiveModal] = useState<DashboardModal>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 30 dias");
  const [draftPeriod, setDraftPeriod] = useState("Últimos 30 dias");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState("CSV");
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshMessage(null);
    window.setTimeout(() => {
      setIsRefreshing(false);
      setRefreshMessage("Atualização local concluída");
    }, 700);
  };

  const handleExport = () => {
    setExportMessage(`Exportação ${exportFormat} preparada para o resumo selecionado.`);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>{refreshMessage ?? "Dados prontos para análise"}</span>
          <span className={`h-1.5 w-1.5 rounded-full ${isRefreshing ? "animate-pulse bg-warning" : "bg-success"}`} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDraftPeriod(selectedPeriod);
              setActiveModal("period");
            }}
            className="flex items-center gap-2 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted/50"
          >
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span>{selectedPeriod}</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Atualizar dados"
            disabled={isRefreshing}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-card text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              setExportMessage(null);
              setActiveModal("export");
            }}
            className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted/50"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">Relatório</span>
          </button>
        </div>
      </div>

      <Modal
        open={activeModal === "period"}
        onClose={closeModal}
        title="Período de análise"
        description="Escolha o intervalo utilizado pelos indicadores e gráficos do Dashboard."
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={closeModal}>Cancelar</Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                setSelectedPeriod(draftPeriod);
                closeModal();
              }}
            >
              Aplicar período
            </Button>
          </>
        )}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {periods.map((period) => {
              const isSelected = draftPeriod === period;
              return (
                <button
                  key={period}
                  type="button"
                  onClick={() => setDraftPeriod(period)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${isSelected ? "border-accent bg-accent/5 text-foreground" : "border-border-subtle bg-card text-muted-foreground hover:bg-muted"}`}
                >
                  <span>{period}</span>
                  {isSelected ? <Check className="h-4 w-4 text-accent" /> : null}
                </button>
              );
            })}
          </div>
          <div className="rounded-xl border border-dashed border-border-subtle bg-muted/20 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Período personalizado</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="space-y-1 text-[11px] font-semibold text-muted-foreground">
                De
                <input type="date" className="auth-input h-10 text-xs" onChange={() => setDraftPeriod("Período personalizado")} />
              </label>
              <label className="space-y-1 text-[11px] font-semibold text-muted-foreground">
                Até
                <input type="date" className="auth-input h-10 text-xs" onChange={() => setDraftPeriod("Período personalizado")} />
              </label>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={activeModal === "export"}
        onClose={closeModal}
        title="Exportar relatório"
        description="Configure uma exportação do resumo do relacionamento para análise externa."
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={closeModal}>Cancelar</Button>
            <Button variant="accent" size="sm" onClick={handleExport}>
              <Download className="h-3.5 w-3.5" /> Preparar exportação
            </Button>
          </>
        )}
      >
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Escopo</p>
            <div className="mt-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-xs font-semibold text-foreground">
              Dashboard completo · {selectedPeriod}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Formato</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {["CSV", "PDF"].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setExportFormat(format)}
                  className={`rounded-xl border p-3 text-left text-xs font-bold transition-colors ${exportFormat === format ? "border-accent bg-accent/5 text-foreground" : "border-border-subtle text-muted-foreground hover:bg-muted"}`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          {exportMessage ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{exportMessage}</p> : null}
        </div>
      </Modal>
    </>
  );
}
