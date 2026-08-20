"use client";

import { Download, Megaphone, Plus } from "lucide-react";
import { PageIntro } from "@/components/layout/page-structure";
import { Button } from "@/components/ui/button";
import type { CustomerAction } from "./customer-action-modals";

interface CustomersHeaderProps {
  onAction: (action: Exclude<CustomerAction, null>) => void;
  hasSelection: boolean;
}

export function CustomersHeader({ onAction, hasSelection }: CustomersHeaderProps) {
  return <PageIntro eyebrow="Base de relacionamento" title="Clientes" description="Uma visão 360º da sua base para acompanhar valor, recorrência e próximas oportunidades de recompra." meta={<span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Base conectada a e-commerce e marketplaces</span>} action={<div className="page-actions"><Button variant="outline" size="sm" onClick={() => onAction("export")} className="h-9 border-border bg-card text-xs font-semibold"><Download className="h-3.5 w-3.5 text-muted-foreground" /> Exportar CSV</Button><Button variant={hasSelection ? "default" : "outline"} size="sm" onClick={() => onAction("campaign")} disabled={!hasSelection} title={hasSelection ? "Criar campanha para os clientes selecionados" : "Selecione clientes para criar uma campanha"} className="h-9 text-xs font-semibold disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"><Megaphone className="h-3.5 w-3.5 text-accent" /> Nova campanha{hasSelection ? <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">selecionados</span> : null}</Button><Button variant="accent" size="sm" onClick={() => onAction("new")} className="h-9 text-xs font-semibold"><Plus className="h-3.5 w-3.5" /> Novo cliente</Button></div>} />;
}
