"use client";

import { useState } from "react";
import { Check, Mail, Megaphone, Tag } from "lucide-react";
import { PlatformLogo, type PlatformLogoKey } from "@/components/platform-logo";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { CampaignRecord } from "@/lib/crm-data";

export type CampaignModalAudience = { label: string; count: number };

const channelOptions: { label: CampaignRecord["channel"]; icon?: typeof Mail; logo?: PlatformLogoKey }[] = [{ label: "E-mail", icon: Mail }, { label: "WhatsApp", logo: "whatsapp" }, { label: "Outro canal", icon: Tag }];

export function CampaignModal({
  open,
  onClose,
  audience = { label: "base filtrada", count: 0 },
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  audience?: CampaignModalAudience;
  onSaved?: (campaign: CampaignRecord) => void;
}) {
  const [channel, setChannel] = useState<CampaignRecord["channel"]>("E-mail");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleClose = () => { setFeedback(null); setName(""); setMessage(""); onClose(); };
  const handleSave = () => {
    const campaign: CampaignRecord = { id: `cmp-${Date.now()}`, name: name.trim() || "Nova campanha", channel, audience: `${audience.count || 0} ${audience.label}`, status: "Rascunho", updatedAt: "Editada agora", sent: 0, openRate: "—", clickRate: "—", revenue: 0 };
    onSaved?.(campaign);
    setFeedback("Campanha guardada como rascunho. Pode continuar a editar antes de ativar.");
  };

  return (
    <Modal open={open} onClose={handleClose} title="Nova campanha" description="Crie uma comunicação segmentada e mantenha o histórico associado à sua operação." footer={<><Button variant="ghost" size="sm" onClick={handleClose}>Cancelar</Button><Button variant="accent" size="sm" onClick={handleSave}><Check className="h-3.5 w-3.5" /> Guardar rascunho</Button></>}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/5 p-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Megaphone className="h-4 w-4" /></div><div><p className="text-xs font-bold text-foreground">{audience.count || "Base filtrada"} {audience.count ? audience.label : "clientes"}</p><p className="text-[11px] text-muted-foreground">O público será vinculado a esta campanha.</p></div></div>
        <label className="block space-y-1.5 text-xs font-semibold text-foreground">Nome da campanha<input value={name} onChange={(event) => setName(event.target.value)} className="auth-input" placeholder="Ex.: Recompra de setembro" /></label>
        <div><p className="text-xs font-semibold text-foreground">Canal de envio</p><div className="mt-2 grid gap-2 sm:grid-cols-3">{channelOptions.map(({ label, icon: Icon, logo }) => <button key={label} type="button" onClick={() => setChannel(label)} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${channel === label ? "border-accent bg-accent/5 text-foreground" : "border-border-subtle text-muted-foreground hover:bg-muted"}`}>{logo ? <PlatformLogo platform={logo} size="xs" framed={false} /> : Icon ? <Icon className="h-4 w-4" /> : null}{label}{channel === label ? <Check className="ml-auto h-4 w-4 text-accent" /> : null}</button>)}</div></div>
        <label className="block space-y-1.5 text-xs font-semibold text-foreground">Mensagem inicial<textarea value={message} onChange={(event) => setMessage(event.target.value)} className="auth-input min-h-24 resize-y py-3" placeholder="Escreva o objectivo da campanha..." /></label>
        <div className="flex items-start gap-2 rounded-xl border border-border-subtle bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground"><Tag className="mt-0.5 h-3.5 w-3.5 shrink-0" /> O conteúdo e a audiência ficam guardados no rascunho para revisão da equipe.</div>
        {feedback ? <p className="rounded-xl border border-success/20 bg-success/5 p-3 text-xs font-semibold text-success">{feedback}</p> : null}
      </div>
    </Modal>
  );
}
