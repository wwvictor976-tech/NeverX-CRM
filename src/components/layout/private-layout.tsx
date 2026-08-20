"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export function PrivateLayout({
  children,
  title = "Dashboard",
  subtitle = "Visão geral do relacionamento com seus clientes.",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="border-b border-border bg-card/95 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-sm font-black text-accent">X</div>
            <div>
              <p className="text-sm font-extrabold tracking-tight text-foreground">Never<span className="text-accent">X</span></p>
              <p className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-muted-foreground uppercase">CRM para e-commerce</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen((value) => !value)}
            className="rounded-xl border border-border bg-background p-2.5 text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            aria-label={isMobileSidebarOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileSidebarOpen}
          >
            {isMobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {isMobileSidebarOpen ? <div className="border-t border-border-subtle bg-card"><Sidebar mobile /></div> : null}
      </div>

      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Header title={title} subtitle={subtitle} />
          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8"><div className="mx-auto w-full max-w-[1600px]">{children}</div></main>
        </div>
      </div>
    </div>
  );
}
