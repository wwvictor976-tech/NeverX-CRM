"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell, ChevronDown, Search, Settings, Users, MessageSquare, Plug, LogOut, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface HeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

type HeaderModal = "search" | "notifications" | "profile" | null;

const searchItems = [
  { type: "Cliente", label: "Ana Souza", detail: "Mercado Livre · Cliente VIP", href: "/clientes" },
  { type: "Conversa", label: "Rafael Mendes", detail: "WhatsApp · aguardando resposta", href: "/conversas?cliente=rafael-mendes&canal=whatsapp" },
  { type: "Integração", label: "Mercado Livre", detail: "Canal de venda", href: "/integracoes" },
];

export function Header({
  title,
  subtitle,
  user = { name: "Victor Nunes", role: "Administrador", initials: "VN" },
}: HeaderProps) {
  const [activeModal, setActiveModal] = useState<HeaderModal>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchItems;
    return searchItems.filter((item) => `${item.label} ${item.detail} ${item.type}`.toLowerCase().includes(query));
  }, [searchQuery]);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border-subtle bg-card/80 px-4 py-3.5 backdrop-blur-md transition-all sm:px-6">
        <div className="flex min-w-0 flex-col pr-3">
          <h1 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h1>
          {subtitle ? <p className="mt-1 hidden truncate text-xs leading-none text-muted-foreground sm:block">{subtitle}</p> : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setActiveModal("search")}
              placeholder="Buscar na plataforma..."
              aria-label="Buscar na plataforma"
              className="h-9 w-36 rounded-xl border border-border-subtle bg-background/80 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-border hover:bg-background focus:w-52 focus:border-accent focus:bg-card focus:outline-none focus:ring-1 focus:ring-ring sm:w-48 sm:pl-9 sm:focus:w-64"
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("notifications")}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-background/80 text-muted-foreground transition-all duration-150 hover:border-border hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label="Notificações"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
            </span>
          </button>

          <div className="h-4 w-px shrink-0 bg-border-subtle" />

          <button
            type="button"
            onClick={() => setActiveModal("profile")}
            className="flex items-center gap-2 rounded-xl border border-border-subtle bg-background/80 p-1 pr-2.5 transition-all duration-150 hover:border-border hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label="Menu do usuário"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/15 text-xs font-bold text-accent">{user.initials}</div>
            <div className="hidden min-w-0 text-left sm:block">
              <p className="truncate text-xs font-semibold leading-tight text-foreground">{user.name}</p>
              <p className="truncate text-[10px] leading-tight text-muted-foreground">{user.role}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </button>
        </div>
      </header>

      <Modal
        open={activeModal === "search"}
        onClose={closeModal}
        title="Busca global"
        description="Encontre clientes, conversas e integrações sem sair do contexto atual."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Digite um nome, canal ou recurso..."
              className="auth-input pl-10"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resultados recentes</p>
            {filteredSearchItems.length ? filteredSearchItems.map((item) => (
              <Link
                key={`${item.type}-${item.label}`}
                href={item.href}
                onClick={closeModal}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-muted/20 p-3 transition-colors hover:border-accent/30 hover:bg-accent/5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm">
                    {item.type === "Cliente" ? <Users className="h-4 w-4" /> : item.type === "Conversa" ? <MessageSquare className="h-4 w-4" /> : <Plug className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-foreground">{item.label}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{item.type} · {item.detail}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            )) : <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">Nenhum resultado encontrado.</div>}
          </div>
        </div>
      </Modal>

      <Modal
        open={activeModal === "notifications"}
        onClose={closeModal}
        title="Notificações"
        description="Acompanhe os eventos que pedem atenção na sua operação."
        footer={<Button variant="outline" size="sm" onClick={closeModal}>Marcar como lidas</Button>}
      >
        <div className="space-y-2">
          {[
            { title: "Nova conversa aguardando atendimento", detail: "Rafael Mendes · WhatsApp", time: "há 12 min", tone: "bg-accent" },
            { title: "Integração pronta para conectar", detail: "Shopify · Canal de vendas", time: "há 1 h", tone: "bg-blue-500" },
            { title: "Cliente em risco identificado", detail: "João Teixeira · Recompra em atraso", time: "há 3 h", tone: "bg-rose-500" },
          ].map((notification) => (
            <div key={notification.title} className="flex gap-3 rounded-xl border border-border-subtle bg-muted/20 p-3">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.tone}`} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground">{notification.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{notification.detail}</p>
                <p className="mt-1 text-[10px] font-medium text-muted-foreground/80">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={activeModal === "profile"}
        onClose={closeModal}
        title={user.name}
        description={`${user.role} · Conta NeverX CRM`}
        maxWidth="sm"
      >
        <div className="space-y-2">
          <Link href="/configuracoes" onClick={closeModal} className="flex items-center gap-3 rounded-xl border border-border-subtle p-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
            <Settings className="h-4 w-4 text-muted-foreground" /> Configurações da conta
          </Link>
          <button type="button" onClick={closeModal} className="flex w-full items-center gap-3 rounded-xl border border-border-subtle p-3 text-left text-xs font-semibold text-danger transition-colors hover:bg-danger/5">
            <LogOut className="h-4 w-4" /> Encerrar sessão
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
