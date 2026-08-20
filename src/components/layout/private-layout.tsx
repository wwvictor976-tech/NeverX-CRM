"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export function PrivateLayout({
  children,
  title = "Dashboard",
  subtitle = "Visão geral do relacionamento com seus clientes.",
  mainClassName = "",
  contentClassName = "",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  mainClassName?: string;
  contentClassName?: string;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <div className="relative z-40 shrink-0 border-b border-border bg-card lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-sm font-black text-accent">X</div>
            <div className="min-w-0"><p className="truncate text-sm font-extrabold tracking-tight text-foreground">Never<span className="text-accent">X</span></p><p className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">CRM para e-commerce</p></div>
          </div>
          <button type="button" onClick={() => setIsMobileSidebarOpen((value) => !value)} className="rounded-xl border border-border bg-background p-2.5 text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30" aria-label={isMobileSidebarOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMobileSidebarOpen}>
            {isMobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMobileSidebarOpen ? <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navegação principal"><button type="button" onClick={() => setIsMobileSidebarOpen(false)} className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]" aria-label="Fechar navegação" /><div className="relative h-full w-[min(300px,88vw)] shadow-popover"><Sidebar mobile onNavigate={() => setIsMobileSidebarOpen(false)} /></div></div> : null}

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header title={title} subtitle={subtitle} />
          <main className={`min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 ${mainClassName}`}><div className={`mx-auto w-full max-w-[1600px] ${contentClassName}`}>{children}</div></main>
        </div>
      </div>
    </div>
  );
}
