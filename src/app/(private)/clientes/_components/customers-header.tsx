"use client";

import { CheckCircle2, Download, Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomersHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      {/* Título & Status de Sincronização */}
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1 text-[10px] font-extrabold text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>Sincronizado via API · E-commerce + Marketplaces</span>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Todos os clientes
        </h1>

        <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
          Uma visão 360° da sua base e das próximas oportunidades de recompra.
        </p>
      </div>

      {/* Ações Globais */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 rounded-xl border-border-subtle bg-background text-xs font-bold text-foreground transition-all hover:bg-muted hover:border-border active:scale-95 cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Exportar CSV</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          className="h-9 gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-hover active:scale-95 cursor-pointer"
        >
          <Megaphone className="h-3.5 w-3.5 text-accent" />
          <span>Nova Campanha para Selecionados</span>
        </Button>

        <Button
          variant="accent"
          size="sm"
          className="h-9 gap-2 rounded-xl bg-accent text-xs font-bold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-95 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Novo cliente</span>
        </Button>
      </div>
    </div>
  );
}