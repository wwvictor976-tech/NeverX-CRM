"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/crm-data";
import { getDashboardConversations, getDashboardCustomers } from "@/lib/crm-selectors";
import { useDashboard } from "./dashboard-context";

export function RelationshipFeed() {
  const { range, isRefreshing } = useDashboard();
  const activeClients = getDashboardCustomers(range);
  const recentChats = getDashboardConversations(range);

  return (
    <div className={`grid grid-cols-1 gap-4 transition-opacity duration-200 lg:grid-cols-2 ${isRefreshing ? "opacity-60" : "opacity-100"}`} aria-busy={isRefreshing}>
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4"><div className="flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-accent" /><h3 className="text-sm font-bold text-foreground">Clientes com maior valor</h3></div><Link href="/clientes" className="flex items-center gap-0.5 text-xs font-semibold text-accent hover:underline"><span>Ver clientes</span><ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
        {activeClients.length ? <div className="mt-3 divide-y divide-border-subtle">{activeClients.map((client) => <Link href={`/clientes?cliente=${client.id}`} key={client.id} className="flex items-center justify-between gap-3 py-3 first:pt-1 last:pb-0"><div className="flex min-w-0 items-center gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">{client.initials}</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-foreground">{client.name}</p><p className="text-[11px] text-muted-foreground">{client.id} · Última compra: {client.lastPurchase}</p></div></div><span className="shrink-0 text-xs font-bold text-foreground">{formatCurrency(client.totalSpent)}</span></Link>)}</div> : <p className="mt-4 rounded-xl border border-dashed border-border-subtle p-5 text-center text-xs text-muted-foreground">Sem clientes com actividade neste intervalo.</p>}
      </div>
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4"><div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-accent" /><h3 className="text-sm font-bold text-foreground">Últimas conversas</h3></div><Link href="/conversas" className="flex items-center gap-0.5 text-xs font-semibold text-accent hover:underline"><span>Ir para Conversas</span><ArrowUpRight className="h-3.5 w-3.5" /></Link></div>
        {recentChats.length ? <div className="mt-3 divide-y divide-border-subtle">{recentChats.map((chat) => <Link href={`/conversas?cliente=${chat.customerId}`} key={chat.id} className="flex items-center justify-between gap-3 py-3 first:pt-1 last:pb-0"><div className="flex min-w-0 items-center gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{chat.initials}</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-foreground">{chat.name}</p><p className="truncate text-[11px] text-muted-foreground">{chat.preview}</p></div></div><span className="shrink-0 text-[10px] text-muted-foreground">{chat.time}</span></Link>)}</div> : <p className="mt-4 rounded-xl border border-dashed border-border-subtle p-5 text-center text-xs text-muted-foreground">Sem conversas neste intervalo.</p>}
      </div>
    </div>
  );
}
