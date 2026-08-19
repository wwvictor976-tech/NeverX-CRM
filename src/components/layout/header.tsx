"use client";

import { Bell, ChevronDown, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

export function Header({
  title,
  subtitle,
  user = { name: "Victor Nunes", role: "Administrador", initials: "VN" },
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border-subtle bg-card/80 px-4 py-3.5 backdrop-blur-md transition-all sm:px-6">
      {/* Título e Subtítulo Contextuais */}
      <div className="flex flex-col min-w-0 pr-3">
        <h1 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground leading-none mt-1 hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>

      {/* Ações da Direita (Busca, Notificações e Perfil) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Campo de Busca na Plataforma */}
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar na plataforma..."
            aria-label="Buscar na plataforma"
            className="h-9 w-36 rounded-xl border border-border-subtle bg-background/80 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-border hover:bg-background focus:w-52 focus:border-accent focus:bg-card focus:outline-none focus:ring-1 focus:ring-ring sm:w-48 sm:pl-9 sm:focus:w-64"
          />
        </div>

        {/* Botão de Notificação com Pulso Dourado */}
        <button
          type="button"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-background/80 text-muted-foreground transition-all duration-150 hover:border-border hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4" />
          {/* Badge de Notificação Pulsante */}
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
          </span>
        </button>

        {/* Divisor Vertical Sutil */}
        <div className="h-4 w-[1px] bg-border-subtle shrink-0" />

        {/* Menu do Lojista / Perfil */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border-subtle bg-background/80 p-1 pr-2.5 transition-all duration-150 hover:border-border hover:bg-muted active:scale-98 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Menu do usuário"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 border border-accent/25 text-xs font-bold text-accent">
            {user.initials}
          </div>
          <div className="hidden min-w-0 text-left sm:block">
            <p className="truncate text-xs font-semibold text-foreground leading-tight">
              {user.name}
            </p>
            <p className="truncate text-[10px] text-muted-foreground leading-tight">
              {user.role}
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

export default Header;