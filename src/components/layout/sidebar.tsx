"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  CircleDashed,
  CreditCard,
  LayoutGrid,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/campanhas", label: "Campanhas", icon: Sparkles },
  { href: "/automacoes", label: "Automações", icon: CircleDashed },
  { href: "/integracoes", label: "Integrações", icon: BriefcaseBusiness },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "border-r border-white/10 bg-slate-950/60",
        mobile ? "w-full border-r-0 border-b" : "hidden w-72 lg:flex lg:flex-col",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-semibold text-emerald-300">
          N
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">NeverX</p>
          <p className="text-xs text-slate-500">CRM</p>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href === "/dashboard" && pathname.startsWith("/dashboard"));

          return (
            <Link
              key={label}
              href={href}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 font-semibold text-emerald-200">
            VN
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Victor Nunes</p>
            <p className="truncate text-xs text-slate-400">Lojista</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
