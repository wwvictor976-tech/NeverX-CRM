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
    <div className="min-h-screen bg-background text-foreground">
      <div className="lg:hidden">
        <div className="flex items-center justify-between border-b border-border-subtle bg-card px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-sm font-semibold text-accent">
              N
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">NeverX</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen((value) => !value)}
            className="rounded-xl border border-border-subtle bg-card p-2 text-muted-foreground"
            aria-label="Abrir menu"
          >
            {isMobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMobileSidebarOpen ? (
          <div className="border-b border-border-subtle bg-card">
            <Sidebar mobile />
          </div>
        ) : null}
      </div>

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header title={title} subtitle={subtitle} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
