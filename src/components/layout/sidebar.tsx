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

// Tipagem clara para os itens de navegação
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  available: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, available: true },
  { href: "/clientes", label: "Clientes", icon: Users, available: true },
  { href: "/conversas", label: "Conversas", icon: MessageSquare, available: true },
  { href: "/jornadas", label: "Jornadas", icon: Route, available: false },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBag, available: false },
  { href: "/automacoes", label: "Automações", icon: CircleDashed, available: false },
  { href: "/campanhas", label: "Campanhas", icon: Sparkles, available: false },
  { href: "/integracoes", label: "Integrações", icon: BriefcaseBusiness, available: true },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3, available: false },
  { href: "/configuracoes", label: "Configurações", icon: Settings, available: false },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        bg-card border-r border-border-subtle flex flex-col select-none
        ${
          mobile
            ? "w-full border-r-0 border-b shrink-0"
            : "hidden lg:flex w-64 h-dvh sticky top-0 max-h-dvh overflow-hidden shrink-0"
        }
      `}
    >
      {/* Header / Logo */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-6 py-5 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 font-black text-accent text-lg border border-accent/20 shadow-xs">
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

      {/* Navegação Principal com Scroll Interno Preservado */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto min-h-0 [scrollbar-width:thin]">
        {navItems.map(({ href, icon: Icon, label, available }) => {
          const isActive =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          const baseStyles =
            "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

          if (available) {
            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`${baseStyles} ${
                  isActive
                    ? "bg-muted text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {/* Indicador visual lateral no item ativo */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-accent" />
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span className="truncate">{label}</span>
              </Link>
            );
          }

          return (
            <div
              key={label}
              className={`${baseStyles} cursor-not-allowed opacity-50 text-muted-foreground justify-between`}
              title={`${label} estará disponível em breve`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                <span className="truncate">{label}</span>
              </div>
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80 bg-muted/80 px-1.5 py-0.5 rounded-md border border-border-subtle">
                Breve
              </span>
            </div>
          );
        })}
      </nav>

      {/* Perfil do Lojista no Rodapé Fixado */}
      <div className="mt-auto border-t border-border-subtle p-3 shrink-0 bg-card">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background/50 p-2.5 transition-colors hover:bg-muted/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent border border-accent/20">
              VN
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground leading-tight">
                Victor Nunes
              </p>
              <p className="truncate text-[11px] text-muted-foreground leading-tight">
                Administrador
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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