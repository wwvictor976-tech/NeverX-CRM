"use client";

import { CheckCircle2, Download, Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CustomerAction } from "./customer-action-modals";

interface CustomersHeaderProps {
  onAction: (action: Exclude<CustomerAction, null>) => void;
}

export function CustomersHeader({ onAction }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2"><span className="relative inline-flex h-2 w-2 rounded-full bg-success" /></span>
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          <span>Sincronização preparada · E-commerce + Marketplaces</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Todos os clientes</h1>
        <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Uma visão 360° da sua base e das próximas oportunidades de recompra.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction("export")}
          className="h-9 rounded-xl border-border-subtle bg-card text-xs font-semibold hover:border-border hover:bg-muted/50"
        >
          <Download className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Exportar CSV</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={() => onAction("campaign")}
          className="h-9 rounded-xl text-xs font-semibold"
        >
          <Megaphone className="h-3.5 w-3.5 text-accent" />
          <span>Nova Campanha para Seleccionados</span>
        </Button>

        <Button
          variant="accent"
          size="sm"
          onClick={() => onAction("new")}
          className="h-9 rounded-xl text-xs font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Novo cliente</span>
        </Button>
      </div>
    </div>
  );
}
