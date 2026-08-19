"use client";

import { MessageSquare, ShoppingBag, ArrowUpRight } from "lucide-react";

const activeClients = [
  { name: "Juliana Santos", status: "Comprou há 2 dias", value: "R$ 459,90", initials: "JS" },
  { name: "Rafael Costa", status: "Comprou há 5 dias", value: "R$ 299,90", initials: "RC" },
  { name: "Camila Ferreira", status: "Comprou há 7 dias", value: "R$ 189,90", initials: "CF" },
];

const recentChats = [
  { name: "Juliana Santos", msg: "Quero saber mais sobre o meu pedido.", time: "Agora", initials: "JS" },
  { name: "Rafael Costa", msg: "Vocês terão reposição desse produto?", time: "2 min", initials: "RC" },
  { name: "Amanda Lima", msg: "Qual o prazo de entrega para minha região?", time: "15 min", initials: "AL" },
];

export function RelationshipFeed() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Lista: Clientes Ativos */}
      <div className="rounded-2xl border border-border-subtle bg-card p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-bold text-foreground">Clientes ativos</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs font-semibold text-accent hover:underline"
          >
            <span>Ver todos</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-border-subtle">
          {activeClients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-between py-3 first:pt-1 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                  {client.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{client.name}</p>
                  <p className="text-[11px] text-muted-foreground">{client.status}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-foreground">{client.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista: Últimas Conversas */}
      <div className="rounded-2xl border border-border-subtle bg-card p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-bold text-foreground">Últimas conversas</h3>
          </div>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs font-semibold text-accent hover:underline"
          >
            <span>Ir para Chat</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-border-subtle">
          {recentChats.map((chat) => (
            <div
              key={chat.name + chat.time}
              className="flex items-center justify-between py-3 first:pt-1 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                  {chat.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{chat.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{chat.msg}</p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">
                {chat.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}