"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShoppingBag, TrendingUp, Users } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  mode: "login" | "register";
}

const overlayTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

const fadeVariants = {
  hidden: { opacity: 0, y: 6, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(2px)" },
};

const highlights = [
  {
    icon: Users,
    label: "Histórico unificado e perfil 360º do cliente",
    tone: "text-teal-300 bg-teal-500/15 border-teal-500/25",
  },
  {
    icon: ShoppingBag,
    label: "Automações de pós-venda e recompra",
    tone: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25",
  },
  {
    icon: TrendingUp,
    label: "Métricas de retenção e LTV em tempo real",
    tone: "text-indigo-300 bg-indigo-500/15 border-indigo-500/25",
  },
];

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const isRegister = mode === "register";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(15,118,110,0.06),transparent_40%),radial-gradient(circle_at_88%_88%,rgba(29,78,216,0.05),transparent_40%)]" />

      <div className="relative z-10 min-h-[600px] w-full max-w-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-900/5">
        <div className="relative hidden h-full min-h-[600px] w-full grid-cols-2 lg:grid">
          <div className="mx-auto flex w-full max-w-[390px] flex-col justify-center p-8 xl:p-10">
            {isRegister && children}
          </div>

          <div className="mx-auto flex w-full max-w-[390px] flex-col justify-center p-8 xl:p-10">
            {!isRegister && children}
          </div>

          <motion.div
            className="absolute bottom-2 left-0 top-2 z-20 flex w-[calc(50%-8px)] flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-white shadow-2xl will-change-transform xl:p-10"
            initial={false}
            animate={{ x: isRegister ? "102%" : "4%" }}
            transition={overlayTransition}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.16),transparent_55%)]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-mono text-xs font-black text-slate-950 shadow-sm">
                  NX
                </div>
                <span className="text-sm font-bold tracking-tight text-white">NexerX</span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-300 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3" />
                CRM Lojista
              </span>
            </div>

            <motion.div
              key={mode}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative z-10 my-auto max-w-[300px] py-4"
            >
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-balance xl:text-3xl">
                {isRegister ? "Fidelize seus clientes finais" : "Conecte sua loja ao seu cliente"}
              </h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {isRegister
                  ? "Acompanhe todo o ciclo de compras, automatize o pós-venda e crie relacionamentos duradouros."
                  : "Acesse o histórico de interações, preferências e compras dos seus clientes em tempo real."}
              </p>

              <div className="mt-6 space-y-3.5 border-t border-slate-800 pt-5">
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

            <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-4 text-[11px] text-slate-400">
              <span>© 2026 NexerX</span>
              <span className="font-semibold text-slate-300">Feito para Lojistas</span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:hidden">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 font-mono text-xs font-black text-white shadow-xs">
                NX
              </div>
              <span className="text-base font-bold text-slate-950">NexerX</span>
            </div>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
              CRM Lojista
            </span>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
