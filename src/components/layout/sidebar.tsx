"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  CircleDashed,
  LayoutGrid,
  MessageSquare,
  MoreHorizontal,
  Route,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, available: true },
  { href: "/clientes", label: "Clientes", icon: Users, available: true },
  { href: "/conversas", label: "Conversas", icon: MessageSquare, available: false },
  { href: "/jornadas", label: "Jornadas", icon: Route, available: false },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBag, available: false },
  { href: "/automacoes", label: "Automações", icon: CircleDashed, available: false },
  { href: "/campanhas", label: "Campanhas", icon: Sparkles, available: false },
  { href: "/integracoes", label: "Integrações", icon: BriefcaseBusiness, available: false },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3, available: false },
  { href: "/configuracoes", label: "Configurações", icon: Settings, available: false },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "bg-card border-r border-border-subtle transition-all duration-200",
        mobile
          ? "w-full border-r-0 border-b"
          : "hidden w-64 lg:flex lg:flex-col lg:h-screen lg:sticky lg:top-0",
      ].join(" ")}
    >
      {/* Header / Logo NeverX */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-6 py-5 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 font-bold text-accent text-base border border-accent/20">
          X
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-extrabold tracking-tight text-foreground leading-none">
            Never<span className="text-accent">X</span>
          </span>
          <span className="mt-1 text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase leading-none">
            CRM PARA E-COMMERCE
          </span>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, available }) => {
          const isActive =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          const className = [
            "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-all duration-150",
            available
              ? isActive
                ? "bg-muted text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              : "cursor-not-allowed text-muted-foreground/50",
          ].join(" ");

          return available ? (
            <Link
              key={label}
              href={href}
              className={className}
            >
              <Icon
                className={[
                  "h-4 w-4 transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              />
              <span>{label}</span>
            </Link>
          ) : (
            <button
              key={label}
              type="button"
              className={className}
              disabled
              title={`${label} estará disponível em breve`}
              aria-label={`${label}, disponível em breve`}
            >
              <Icon className="h-4 w-4 text-muted-foreground/50" />
              <span className="flex-1">{label}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                Em breve
              </span>
            </button>
          );
        })}
      </nav>

      {/* Perfil do Lojista no Rodapé */}
      <div className="mt-auto border-t border-border-subtle p-3 shrink-0">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background p-2.5 transition-colors hover:bg-muted/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
              VN
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                Victor Nunes
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Administrador
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors"
            aria-label="Opções do perfil"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;