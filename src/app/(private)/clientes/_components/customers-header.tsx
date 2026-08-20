"use client";

import { CheckCircle2, Download, Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CustomerAction } from "./customer-action-modals";

interface CustomersHeaderProps {
  onAction: (action: Exclude<CustomerAction, null>) => void;
  hasSelection: boolean;
}

export function CustomersHeader({ onAction, hasSelection }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-border-subtle pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="-ml-2 mb-3 inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-success" /><span>Base conectada a E-commerce e Marketplaces</span></div>
        <h1 className="text-[1.85rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl">Todos os clientes</h1>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">Uma visão 360º da sua base para acompanhar valor, recorrência e próximas oportunidades de recompra.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <Button variant="outline" size="sm" onClick={() => onAction("export")} className="h-9 border-border bg-card text-xs font-semibold"><Download className="h-3.5 w-3.5 text-muted-foreground" /><span>Exportar CSV</span></Button>
        <Button variant={hasSelection ? "default" : "outline"} size="sm" onClick={() => onAction("campaign")} disabled={!hasSelection} title={hasSelection ? "Criar campanha para os clientes seleccionados" : "Seleccione clientes para criar uma campanha"} className="h-9 text-xs font-semibold disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"><Megaphone className="h-3.5 w-3.5 text-accent" /><span>Nova campanha</span>{hasSelection ? <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">{hasSelection ? "seleccionados" : ""}</span> : null}</Button>
        <Button variant="accent" size="sm" onClick={() => onAction("new")} className="h-9 text-xs font-semibold"><Plus className="h-3.5 w-3.5" /><span>Novo cliente</span></Button>
      </div>
    </div>
  );
}
