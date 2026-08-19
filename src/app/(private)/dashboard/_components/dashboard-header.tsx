"use client";

import { Calendar, Download, RefreshCw } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span>Atualizado em tempo real</span>
        <span className="h-1 w-1 rounded-full bg-success" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Seletor de Período */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted/50"
        >
          <Calendar className="h-3.5 w-3.5 text-accent" />
          <span>01 - 31 Mai, 2025</span>
        </button>

        {/* Botão de Atualizar */}
        <button
          type="button"
          aria-label="Atualizar dados"
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-card text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        {/* Botão de Exportar */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-muted/50"
        >
          <Download className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="hidden sm:inline">Relatório</span>
        </button>
      </div>
    </div>
  );
}