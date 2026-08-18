import { Bell, ChevronDown, Search } from "lucide-react";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/40 px-4 py-4 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white">{title}</p>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-3 self-end lg:self-auto">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          aria-label="Buscar"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Buscar</span>
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-left hover:bg-white/10"
          aria-label="Menu do usuário"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 font-medium text-emerald-200">
            VN
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">Victor</p>
            <p className="text-[11px] text-slate-400">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
