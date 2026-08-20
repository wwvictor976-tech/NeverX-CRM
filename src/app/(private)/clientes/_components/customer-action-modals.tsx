"use client";

import { useState } from "react";
import { Calendar, Download, Tag, UserPlus } from "lucide-react";
import { CampaignModal } from "@/components/campaigns/campaign-modal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export type CustomerAction = "export" | "campaign" | "new" | null;

interface CustomerActionModalsProps {
  action: CustomerAction;
  selectedCount: number;
  onClose: () => void;
}

export function CustomerActionModals({ action, selectedCount, onClose }: CustomerActionModalsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClose = () => {
    setFeedback(null);
    onClose();
  };

  return (
    <>
      <Modal
        open={action === "export"}
        onClose={handleClose}
        title="Exportar clientes"
        description="Exporte os clientes visíveis ou a seleção atual para continuar a análise noutro sistema."
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button>
            <Button variant="accent" size="sm" onClick={() => setFeedback("Arquivo preparado com os campos visíveis da listagem.")}>
              <Download className="h-3.5 w-3.5" /> Preparar CSV
            </Button>
          </>
        )}
      >
        <div className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Escopo seleccionado</p>
              <p className="mt-1 text-lg font-black text-foreground">{selectedCount || "Todos"}</p>
              <p className="text-[11px] text-muted-foreground">{selectedCount ? "clientes seleccionados" : "clientes filtrados"}</p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-muted/20 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Formato</p>
              <p className="mt-1 text-lg font-black text-foreground">CSV</p>
              <p className="text-[11px] text-muted-foreground">Compatível com planilhas</p>
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-border-subtle p-3 text-xs text-muted-foreground">
            Serão incluídos nome, e-mail, telefone, canal, status, LTV e última compra.
          </div>
          {feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}
        </div>
      </Modal>

      <CampaignModal open={action === "campaign"} onClose={handleClose} audience={{ count: selectedCount, label: "clientes seleccionados" }} />

      <Modal
        open={action === "new"}
        onClose={handleClose}
        title="Novo cliente"
        description="Estruture um novo registo para que possa ser associado a pedidos e conversas."
        footer={(
          <>
            <Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button>
            <Button variant="accent" size="sm" onClick={() => setFeedback("Registo preparado para sincronização com o backend.")}>
              <UserPlus className="h-3.5 w-3.5" /> Guardar cliente
            </Button>
          </>
        )}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">
            Nome completo
            <input className="auth-input" placeholder="Nome do cliente" />
          </label>
          <label className="space-y-1.5 text-xs font-semibold text-foreground">
            E-mail
            <input type="email" className="auth-input" placeholder="cliente@email.com" />
          </label>
          <label className="space-y-1.5 text-xs font-semibold text-foreground">
            Telefone
            <input className="auth-input" placeholder="(00) 00000-0000" />
          </label>
          <label className="space-y-1.5 text-xs font-semibold text-foreground">
            Canal de origem
            <select className="auth-input"><option>E-commerce próprio</option><option>Mercado Livre</option><option>Shein</option><option>Shopee</option><option>PDV</option></select>
          </label>
          <label className="space-y-1.5 text-xs font-semibold text-foreground">
            Segmento inicial
            <select className="auth-input"><option>Novo cliente</option><option>VIP</option><option>Recompra pendente</option></select>
          </label>
          <label className="space-y-1.5 text-xs font-semibold text-foreground sm:col-span-2">
            Tags
            <div className="relative"><Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input className="auth-input pl-9" placeholder="Ex.: primeira compra, São Paulo" /></div>
          </label>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:col-span-2"><Calendar className="h-3.5 w-3.5" /> A data de entrada será preenchida quando o registo for sincronizado.</div>
          {feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success sm:col-span-2">{feedback}</p> : null}
        </div>
      </Modal>
    </>
  );
}
