"use client";

import { Globe2, Mail, MessageSquareText } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import { getConversationChannelMetrics } from "@/lib/crm-selectors";
import { useDashboard } from "./dashboard-context";

export function ChannelsChart() {
  const { range, isRefreshing } = useDashboard();
  const channels = getConversationChannelMetrics(range);
  const total = channels.reduce((sum, channel) => sum + channel.percentage, 0) || 1;
  const conversationTotal = channels.reduce((sum, channel) => sum + Number(channel.value.split(" ")[0]), 0);

  return (
    <div className={`card-surface flex flex-col justify-between p-5 transition-opacity duration-200 sm:p-6 ${isRefreshing ? "opacity-60" : "opacity-100"}`} aria-busy={isRefreshing}>
      <div>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-foreground">Canais com mais respostas</h3>
          <span className="text-[11px] font-semibold text-success">Visão do atendimento</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">Distribuição das conversas recebidas no período selecionado.</p>
      </div>

      {channels.length ? (
        <div className="my-5 flex flex-col items-center justify-center gap-6 sm:flex-row xl:flex-col">
          <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-label="Distribuição das conversas por canal">
              {channels.map((channel, index) => {
                const share = (channel.percentage / total) * 100;
                const strokeDasharray = `${share} ${100 - share}`;
                const cumulativePercent = channels.slice(0, index).reduce((sum, current) => sum + (current.percentage / total) * 100, 0);
                return <circle key={channel.name} cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke={channel.color} strokeWidth="3.6" strokeDasharray={strokeDasharray} strokeDashoffset={-cumulativePercent} className="cursor-pointer transition-opacity hover:opacity-80" />;
              })}
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center"><span className="text-2xl font-extrabold text-foreground">{conversationTotal}</span><span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Conversas</span></div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {channels.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between rounded-xl border border-border-subtle bg-background/60 p-2.5 transition-colors hover:border-border hover:bg-muted/50">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-card">{channel.logo ? <PlatformLogo platform={channel.logo} size="xs" framed={false} /> : channel.name === "E-mail" ? <Mail className="h-3.5 w-3.5 text-blue-500" /> : channel.name === "WhatsApp" ? <MessageSquareText className="h-3.5 w-3.5 text-success" /> : <Globe2 className="h-3.5 w-3.5 text-accent" />}</div>
                  <div><span className="block text-xs font-semibold leading-tight text-foreground">{channel.name}</span><span className="text-[10px] text-muted-foreground">{channel.value}</span></div>
                </div>
                <span className="rounded-md border border-border-subtle bg-card px-2 py-1 text-xs font-bold text-foreground">{channel.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-5 flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle bg-muted/10 px-5 text-center"><MessageSquareText className="h-5 w-5 text-muted-foreground" /><p className="mt-2 text-xs font-bold text-foreground">Sem conversas neste período</p><p className="mt-1 max-w-xs text-[11px] leading-relaxed text-muted-foreground">Altere o intervalo para acompanhar o volume de atendimento da sua equipe.</p></div>
      )}
    </div>
  );
}
