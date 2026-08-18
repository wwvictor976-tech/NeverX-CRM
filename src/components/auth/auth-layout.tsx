"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, TrendingUp } from "lucide-react";

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

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const isRegister = mode === "register";

  return (
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

            {/* Cabeçalho do Painel */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-mono text-xs font-black text-slate-950 shadow-sm">
                  NX
                </div>
                <span className="text-sm font-bold tracking-tight text-white">NexerX</span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-500/15 px-3 py-1 text-[11px] font-semibold text-teal-300 backdrop-blur-md">
                Gestão do Cliente
              </span>
            </div>

            {/* Conteúdo Informativo */}
            <motion.div
              key={mode}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative z-10 my-auto py-4 max-w-[300px]"
            >
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white xl:text-3xl">
                {isRegister ? "Fidelize seus clientes finais!" : "Conecte sua loja ao seu cliente"}
              </h1>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                {isRegister
                  ? "Acompanhe todo o ciclo de compras, automatize o pós-venda e crie relacionamentos duradouros."
                  : "Acesse o histórico de interações, preferências e compras dos seus clientes em tempo real."}
              </p>

              <div className="mt-6 space-y-3.5 border-t border-slate-800 pt-5">
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
            <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-4 text-[11px] text-slate-400">
              <span>© 2026 NexerX</span>
              <span className="font-semibold text-slate-300">Feito para Lojistas</span>
            </div>
          </motion.div>
        </div>

        {/* Layout Mobile (Responsivo com separação clara) */}
        <div className="lg:hidden flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 font-mono text-xs font-black text-white shadow-xs">
                NX
              </div>
              <span className="text-base font-bold text-slate-950">NexerX</span>
            </div>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
              CRM Lojista
            </span>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}