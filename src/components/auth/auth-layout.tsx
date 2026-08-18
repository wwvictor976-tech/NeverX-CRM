import type { ReactNode } from "react";

export function AuthLayout({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_30%)]" />

        <div className="relative grid min-h-[700px] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-between border-b border-white/10 bg-slate-950/70 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg font-semibold text-emerald-300">
                N
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">NeverX</p>
                <p className="text-sm text-slate-500">CRM para lojistas</p>
              </div>
            </div>

            <div className="space-y-6 py-10">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Relacionamento inteligente
              </div>

              <div>
                <h1 className="max-w-md text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Mais clareza entre loja e cliente.
                </h1>
                <p className="mt-4 max-w-md text-base text-slate-300">
                  Centralize pedidos, clientes, cadastros e ações de relacionamento em uma experiência premium para crescer com consistência.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: "12k+", label: "clientes" },
                  { value: "96%", label: "retenção" },
                  { value: "4.8/5", label: "satisfação" },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-400">
              Acompanhe cada relacionamento com inteligência e consistência.
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
                <p className="mt-2 text-sm text-slate-400">{description}</p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
