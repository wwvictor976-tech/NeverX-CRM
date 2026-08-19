"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShoppingBag, TrendingUp, Users } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  mode: "login" | "register";
}

const overlayTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
};

const fadeVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

const highlights = [
  {
    icon: Users,
    label: "Histórico unificado e perfil 360º do cliente",
    tone: "text-blue-300 bg-blue-500/15 border-blue-400/20",
  },
  {
    icon: ShoppingBag,
    label: "Automações de pós-venda e recompra",
    tone: "text-emerald-300 bg-emerald-500/15 border-emerald-400/20",
  },
  {
    icon: TrendingUp,
    label: "Métricas de retenção e LTV em tempo real",
    tone: "text-indigo-300 bg-indigo-500/15 border-indigo-400/20",
  },
];

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const isRegister = mode === "register";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      {/* Luzes e iluminação básica de fundo */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-blue-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-sky-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(59,130,246,0.05),transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]" />

      {/* Container Principal */}
      <div className="relative z-10 min-h-[620px] w-full max-w-[1000px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white text-slate-950 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-900/5">
        <div className="relative hidden h-full min-h-[620px] w-full grid-cols-2 lg:grid">
          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center p-8 xl:p-10">
            {isRegister ? children : null}
          </div>

          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center p-8 xl:p-10">
            {!isRegister ? children : null}
          </div>

          {/* Painel com Imagem de Fundo (bg.jpg) e Transição com Degradê */}
          <motion.div
            className={`absolute inset-y-0 left-0 z-20 flex h-full w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-8 text-white shadow-2xl xl:p-10 ${
              isRegister
                ? "rounded-r-3xl border-l border-blue-900/40"
                : "rounded-l-3xl border-r border-blue-900/40"
            }`}
            initial={false}
            animate={{ x: isRegister ? "100%" : "0%" }}
            transition={overlayTransition}
          >
            {/* Imagem de Fundo com opacidade baixa */}
            <div className="pointer-events-none absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-25 mix-blend-luminosity" />

            {/* Degradê de fusão direcionado para o lado do formulário */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${
                isRegister
                  ? "from-slate-950 via-blue-950/80 to-slate-950/40"
                  : "from-slate-950/40 via-blue-950/80 to-slate-950"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />

            {/* Conteúdo do Painel */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-mono text-xs font-black text-slate-950 shadow-sm">
                  NX
                </div>
                <span className="text-sm font-bold tracking-tight text-white">NeverX</span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-[11px] font-semibold text-blue-200 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                CRM Lojista
              </span>
            </div>

            <motion.div
              key={mode}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="relative z-10 my-auto max-w-[320px] py-4"
            >
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-balance xl:text-3xl">
                {isRegister ? "Fidelize seus clientes finais" : "Conecte sua loja ao seu cliente"}
              </h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {isRegister
                  ? "Acompanhe todo o ciclo de compras, automatize o pós-venda e crie relacionamentos duradouros."
                  : "Acesse o histórico de interações, preferências e compras dos seus clientes em tempo real."}
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-5">
                {highlights.map(({ icon: Icon, label, tone }) => (
                  <div key={label} className="flex items-center gap-3 text-xs font-medium text-slate-200">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${tone}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-4 text-[11px] text-slate-400">
              <span>© {new Date().getFullYear()} NeverX CRM</span>
              <span className="font-semibold text-slate-300">Plataforma para Lojistas</span>
            </div>
          </motion.div>
        </div>

        {/* Layout Mobile */}
        <div className="flex flex-col p-6 sm:p-8 lg:hidden">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 font-mono text-xs font-black text-white shadow-xs">
                NX
              </div>
              <span className="text-base font-bold text-slate-950">NeverX</span>
            </div>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-800">
              CRM Lojista
            </span>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}