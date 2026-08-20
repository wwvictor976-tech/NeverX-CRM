"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, BarChart3, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  mode?: "login" | "register";
}

const features = [
  {
    icon: ShieldCheck,
    title: "Segurança de dados",
    description: "Seus dados protegidos com criptografia e LGPD.",
  },
  {
    icon: Users,
    title: "Relacionamentos que vendem",
    description: "Organize cada etapa da jornada do cliente.",
  },
  {
    icon: BarChart3,
    title: "Insights que importam",
    description: "Dados e métricas para decisões inteligentes.",
  },
  {
    icon: Zap,
    title: "Automação inteligente",
    description: "Automatize processos e ganhe tempo.",
  },
];

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background bg-[url('/bg.jpeg')] bg-cover bg-center bg-no-repeat px-4 py-3 sm:py-5 lg:h-screen">
      <div className="pointer-events-none absolute inset-0 bg-background/75" aria-hidden="true" />
      {/* Header Oficial */}
      <header className="relative z-10 flex shrink-0 flex-col items-center justify-center pt-1 text-center">
        <div className="flex items-center text-2xl font-extrabold tracking-tight text-foreground">
          Never<span className="text-accent">X</span>
        </div>
        <span className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
          CRM PARA E-COMMERCE
        </span>
      </header>

      {/* Card Central Flutuante (Coluna Única Preservada) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 my-auto w-full max-w-[400px] py-2"
      >
        <div className="auth-card p-5 sm:p-6">
          {children}
        </div>
      </motion.div>

      {/* Rodapé de Diferenciais */}
      <footer className="relative z-10 w-full max-w-5xl shrink-0 border-t border-border-subtle pt-3 pb-1">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-accent">
                <feature.icon className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs font-semibold text-foreground leading-tight">
                  {feature.title}
                </h4>
                <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}

export default AuthLayout;