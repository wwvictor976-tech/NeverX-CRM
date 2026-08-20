"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  LogOut,
  MessageSquare,
  Plug,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

type HeaderPopover = "search" | "notifications" | "profile" | null;

type SearchItem = {
  type: "Cliente" | "Conversa" | "Integração";
  label: string;
  detail: string;
  href: string;
};

const searchItems: SearchItem[] = [
  { type: "Cliente", label: "Ana Souza", detail: "Mercado Livre · Cliente VIP", href: "/clientes" },
  { type: "Cliente", label: "Camila Lima", detail: "E-commerce · Novo cliente", href: "/clientes" },
  { type: "Conversa", label: "Rafael Mendes", detail: "WhatsApp · aguardando resposta", href: "/conversas?cliente=rafael-mendes&canal=whatsapp" },
  { type: "Integração", label: "Mercado Livre", detail: "Canal de venda", href: "/integracoes" },
];

const notifications = [
  { title: "Nova conversa aguardando atendimento", detail: "Rafael Mendes · WhatsApp", time: "há 12 min", tone: "bg-accent" },
  { title: "Integração pronta para conectar", detail: "Shopify · Canal de vendas", time: "há 1 h", tone: "bg-blue-500" },
  { title: "Cliente em risco identificado", detail: "João Teixeira · Recompra em atraso", time: "há 3 h", tone: "bg-rose-500" },
];

export function Header({
  title,
  subtitle,
  user = { name: "Victor Nunes", role: "Administrador", initials: "VN" },
}: HeaderProps) {
  const [activePopover, setActivePopover] = useState<HeaderPopover>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsRead, setNotificationsRead] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchItems;
    return searchItems.filter((item) => `${item.label} ${item.detail} ${item.type}`.toLowerCase().includes(query));
  }, [searchQuery]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setActivePopover(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePopover(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const togglePopover = (popover: Exclude<HeaderPopover, null>) => {
    setActivePopover((current) => (current === popover ? null : popover));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3.5 shadow-[0_1px_0_rgba(17,17,17,0.03)] backdrop-blur-md transition-all sm:px-6">
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
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setActivePopover("search");
            }}
            onFocus={() => setActivePopover("search")}
            placeholder="Buscar na plataforma..."
            aria-label="Buscar na plataforma"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={activePopover === "search"}
            aria-controls="header-search-results"
            className="h-9 w-36 rounded-xl border border-border bg-background pl-8 pr-8 text-xs text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-foreground/20 focus:w-52 focus:border-accent focus:bg-card focus:outline-none focus:ring-2 focus:ring-accent/15 sm:w-48 sm:pl-9 sm:focus:w-64"
          />
          {searchQuery ? (
            <button type="button" onClick={() => setSearchQuery("")} aria-label="Limpar busca" className="absolute right-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          ) : null}

          {activePopover === "search" ? (
            <div id="header-search-results" className="popover-surface absolute right-0 top-full mt-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden p-2" role="listbox" aria-label="Resultados da busca">
              <div className="flex items-center justify-between px-2.5 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{searchQuery ? "Resultados" : "Acesso rápido"}</p>
                <span className="text-[10px] font-semibold text-muted-foreground">{filteredSearchItems.length}</span>
              </div>
              <div className="space-y-1">
                {filteredSearchItems.length ? filteredSearchItems.map((item) => (
                  <Link
                    key={`${item.type}-${item.label}`}
                    href={item.href}
                    onClick={() => setActivePopover(null)}
                    className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-muted"
                    role="option"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-background text-muted-foreground">
                        {item.type === "Cliente" ? <Users className="h-4 w-4" /> : item.type === "Conversa" ? <MessageSquare className="h-4 w-4" /> : <Plug className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-foreground">{item.label}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{item.type} · {item.detail}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                )) : <div className="rounded-xl border border-dashed border-border-subtle px-3 py-6 text-center text-xs text-muted-foreground">Nenhum resultado para “{searchQuery}”.</div>}
              </div>
              {searchQuery ? <p className="mt-2 border-t border-border-subtle px-2.5 pt-2 text-[10px] text-muted-foreground">A busca está limitada aos dados disponíveis no protótipo.</p> : null}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => togglePopover("notifications")}
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-all duration-150 hover:border-foreground/20 hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${activePopover === "notifications" ? "border-accent/50 bg-accent/5 text-foreground" : "border-border"}`}
            aria-label="Notificações"
            aria-expanded={activePopover === "notifications"}
            aria-controls="header-notifications"
          >
            <Bell className="h-4 w-4" />
            {!notificationsRead ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-background" /> : null}
          </button>

          {activePopover === "notifications" ? (
            <div id="header-notifications" className="popover-surface absolute right-0 top-full mt-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden" role="dialog" aria-label="Notificações">
              <div className="flex items-start justify-between gap-3 border-b border-border-subtle px-4 py-3.5">
                <div><p className="text-sm font-bold text-foreground">Notificações</p><p className="mt-0.5 text-[11px] text-muted-foreground">O que precisa da sua atenção.</p></div>
                {!notificationsRead ? <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-bold text-accent">3 novas</span> : null}
              </div>
              <div className="space-y-1 p-2">
                {notifications.map((notification) => (
                  <div key={notification.title} className="flex gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-muted">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.tone}`} />
                    <div className="min-w-0"><p className="text-xs font-bold leading-snug text-foreground">{notification.title}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{notification.detail}</p><p className="mt-1 text-[10px] font-medium text-muted-foreground/80">{notification.time}</p></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border-subtle bg-muted/20 px-4 py-2.5"><button type="button" onClick={() => setNotificationsRead(true)} className="text-[11px] font-bold text-muted-foreground transition-colors hover:text-foreground">Marcar como lidas</button><Link href="/conversas" onClick={() => setActivePopover(null)} className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:text-accent-hover">Ver conversas <ArrowUpRight className="h-3 w-3" /></Link></div>
            </div>
          ) : null}
        </div>

        <div className="h-4 w-px shrink-0 bg-border-subtle" />

        <div className="relative">
          <button
            type="button"
            onClick={() => togglePopover("profile")}
            className={`flex items-center gap-2 rounded-xl border bg-background p-1 pr-2.5 transition-all duration-150 hover:border-foreground/20 hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 ${activePopover === "profile" ? "border-accent/50 bg-accent/5" : "border-border"}`}
            aria-label="Menu do usuário"
            aria-expanded={activePopover === "profile"}
            aria-controls="header-profile"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/15 text-xs font-bold text-accent">{user.initials}</div>
            <div className="hidden min-w-0 text-left sm:block"><p className="truncate text-xs font-semibold leading-tight text-foreground">{user.name}</p><p className="truncate text-[10px] leading-tight text-muted-foreground">{user.role}</p></div>
            <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${activePopover === "profile" ? "rotate-180" : ""}`} />
          </button>

          {activePopover === "profile" ? (
            <div id="header-profile" className="popover-surface absolute right-0 top-full mt-3 w-64 overflow-hidden p-2" role="menu" aria-label="Menu do usuário">
              <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/15 text-xs font-bold text-accent">{user.initials}</div><div className="min-w-0"><p className="truncate text-xs font-bold text-foreground">{user.name}</p><p className="truncate text-[10px] text-muted-foreground">{user.role}</p></div></div>
              <div className="mt-2 space-y-1"><Link href="/configuracoes" onClick={() => setActivePopover(null)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted" role="menuitem"><Settings className="h-4 w-4 text-muted-foreground" /> Configurações da conta</Link><button type="button" onClick={() => setActivePopover(null)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-danger transition-colors hover:bg-danger/5" role="menuitem"><LogOut className="h-4 w-4" /> Encerrar sessão</button></div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
