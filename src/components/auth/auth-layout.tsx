"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, TrendingUp, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
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
  { icon: Users, label: "Histórico unificado e perfil 360º do cliente", tone: "text-teal-300 bg-teal-500/15 border-teal-500/25" },
  { icon: ShoppingBag, label: "Automações de pós-venda e recompra", tone: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25" },
  { icon: TrendingUp, label: "Métricas de retenção e LTV em tempo real", tone: "text-indigo-300 bg-indigo-500/15 border-indigo-500/25" },
];

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const isRegister = mode === "register";

  return (
<<<<<<< HEAD
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white p-4 sm:p-6 lg:p-8">
      {/* Subtle light grid to add texture without breaking the white background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      {/* Faint brand tint anchored to the corners */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(15,118,110,0.06),transparent_40%),radial-gradient(circle_at_88%_88%,rgba(29,78,216,0.05),transparent_40%)]" />

      {/* Main card — defined with a crisp border and soft shadow on the white surface */}
      <div className="relative z-10 min-h-[600px] w-full max-w-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-900/5">
        {/* Desktop — two columns with a sliding dark panel */}
        <div className="relative hidden h-full min-h-[600px] w-full grid-cols-2 lg:grid">
          {/* Register form column (left) */}
          <div className="mx-auto flex w-full max-w-[390px] flex-col justify-center p-8 xl:p-10">
            {isRegister && children}
          </div>

          {/* Login form column (right) */}
          <div className="mx-auto flex w-full max-w-[390px] flex-col justify-center p-8 xl:p-10">
            {!isRegister && children}
          </div>

          {/* Sliding brand panel */}
          <motion.div
            className="absolute bottom-2 left-0 top-2 z-20 flex w-[calc(50%-8px)] flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-white shadow-2xl will-change-transform xl:p-10"
            initial={false}
            animate={{ x: isRegister ? "102%" : "4%" }}
            transition={overlayTransition}
          >
            {/* Internal accent glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.16),transparent_55%)]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
=======
    <main className="relative flex min-h-screen w-full items-center justify-center bg-slate-100/80 p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Ambient Glows com opacidade refinada para fundo claro */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      {/* Card Principal - Borda Slate-300 e sombra em camadas para separação total do fundo */}
      <div className="relative z-10 w-full max-w-[980px] min-h-[600px] overflow-hidden rounded-3xl border border-slate-300/80 bg-white shadow-2xl shadow-slate-900/5 text-slate-950">
        
        {/* Layout Desktop (2 Colunas) */}
        <div className="hidden lg:grid grid-cols-2 min-h-[600px] relative w-full h-full">
          
          {/* Coluna da Esquerda (Formulário de Cadastro) */}
          <div className="p-8 xl:p-10 flex flex-col justify-center max-w-[390px] mx-auto w-full">
            {isRegister && children}
          </div>

          {/* Coluna da Direita (Formulário de Login) */}
          <div className="p-8 xl:p-10 flex flex-col justify-center max-w-[390px] mx-auto w-full">
            {!isRegister && children}
          </div>

          {/* Painel Deslizante Escuro (Dark Slate Premium com bordas nítidas) */}
          <motion.div
            className="absolute top-2 bottom-2 left-0 w-[calc(50%-8px)] bg-slate-950 text-white p-8 xl:p-10 flex flex-col justify-between z-20 overflow-hidden shadow-2xl rounded-2xl border border-slate-800 will-change-transform"
            initial={false}
            animate={{
              x: isRegister ? "102%" : "4%",
            }}
            transition={overlayTransition}
          >
            {/* Gradient Overlay sutil interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-transparent to-indigo-500/15 pointer-events-none" />
>>>>>>> fcd77b7 (arrumando ui)

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-mono text-xs font-black text-slate-950 shadow-sm">
                  NX
                </div>
                <span className="text-sm font-bold tracking-tight text-white">NexerX</span>
              </div>
<<<<<<< HEAD
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-300 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3" />
                CRM Lojista
=======

              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-300 backdrop-blur-md">
                Gestão do Cliente
>>>>>>> fcd77b7 (arrumando ui)
              </span>
            </div>

            {/* Informational content */}
            <motion.div
              key={mode}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
<<<<<<< HEAD
              className="relative z-10 my-auto max-w-[300px] py-4"
=======
              className="relative z-10 my-auto py-4 max-w-[300px]"
>>>>>>> fcd77b7 (arrumando ui)
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
<<<<<<< HEAD
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

            {/* Footer */}
=======
                <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span>Histórico unificado e perfil do cliente</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                  <span>Automações de pós-venda e recompra</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <span>Métricas de retenção e LTV do cliente</span>
                </div>
              </div>
            </motion.div>

            {/* Rodapé do Painel */}
>>>>>>> fcd77b7 (arrumando ui)
            <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-4 text-[11px] text-slate-400">
              <span>© 2026 NexerX</span>
              <span className="font-semibold text-slate-300">Feito para Lojistas</span>
            </div>
          </motion.div>
        </div>

<<<<<<< HEAD
        {/* Mobile — single column with a compact branded header */}
        <div className="flex flex-col p-6 sm:p-8 lg:hidden">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
=======
        {/* Layout Mobile (Responsivo com separação clara) */}
        <div className="lg:hidden flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
>>>>>>> fcd77b7 (arrumando ui)
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 font-mono text-xs font-black text-white shadow-xs">
                NX
              </div>
              <span className="text-base font-bold text-slate-950">NexerX</span>
            </div>
<<<<<<< HEAD
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
=======
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
>>>>>>> fcd77b7 (arrumando ui)
              CRM Lojista
            </span>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
