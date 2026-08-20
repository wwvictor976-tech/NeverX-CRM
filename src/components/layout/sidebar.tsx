"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BriefcaseBusiness, CircleDashed, LayoutGrid, MessageSquare, MoreHorizontal, Route, Settings, ShoppingBag, Sparkles, Users } from "lucide-react";

interface NavItem { href: string; label: string; icon: React.ElementType; available: boolean; }

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, available: true },
  { href: "/clientes", label: "Clientes", icon: Users, available: true },
  { href: "/conversas", label: "Conversas", icon: MessageSquare, available: true },
  { href: "/jornadas", label: "Jornadas", icon: Route, available: false },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBag, available: true },
  { href: "/automacoes", label: "Automações", icon: CircleDashed, available: false },
  { href: "/campanhas", label: "Campanhas", icon: Sparkles, available: true },
  { href: "/integracoes", label: "Integrações", icon: BriefcaseBusiness, available: true },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3, available: true },
  { href: "/configuracoes", label: "Configurações", icon: Settings, available: false },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const asideClass = mobile ? "w-full border-0" : "hidden h-full max-h-full w-64 shrink-0 overflow-hidden border-r border-border bg-card lg:flex";

  return (
    <aside className={`${asideClass} flex select-none flex-col bg-card`}>
      <div className="flex shrink-0 items-center gap-3 border-b border-border-subtle px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-lg font-black text-accent">X</div>
        <div className="flex min-w-0 flex-col"><span className="text-lg font-extrabold tracking-tight text-foreground">Never<span className="text-accent">X</span></span><span className="mt-1 text-[9px] font-bold leading-none tracking-[0.18em] text-muted-foreground uppercase">CRM para e-commerce</span></div>
      </div>

      <nav className="flex-1 space-y-1 overflow-visible px-3 py-4" aria-label="Navegação principal">
        <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70">Workspace</p>
        {navItems.map(({ href, icon: Icon, label, available }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          const baseStyles = "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-[background-color,color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
          if (available) return <Link key={label} href={href} aria-current={isActive ? "page" : undefined} className={`${baseStyles} ${isActive ? "bg-foreground text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{isActive ? <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-accent" /> : null}<Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-accent" : "text-muted-foreground transition-colors group-hover:text-foreground"}`} /><span className="truncate">{label}</span></Link>;
          return <div key={label} className={`${baseStyles} cursor-not-allowed justify-between text-muted-foreground/60`} title={`${label} estará disponível em breve`}><div className="flex min-w-0 items-center gap-3"><Icon className="h-4 w-4 shrink-0" /><span className="truncate">{label}</span></div><span className="shrink-0 rounded-md border border-border-subtle bg-muted/60 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground/70">Breve</span></div>;
        })}
      </nav>

      <div className="mt-auto shrink-0 border-t border-border-subtle bg-card p-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background/60 p-2.5 transition-colors hover:bg-muted/60"><div className="flex min-w-0 items-center gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-xs font-bold text-accent">VN</div><div className="min-w-0"><p className="truncate text-xs font-semibold leading-tight text-foreground">Victor Nunes</p><p className="truncate text-[11px] leading-tight text-muted-foreground">Administrador</p></div></div><button type="button" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Opções do perfil"><MoreHorizontal className="h-4 w-4" /></button></div>
      </div>
    </aside>
  );
}

export default Sidebar;
