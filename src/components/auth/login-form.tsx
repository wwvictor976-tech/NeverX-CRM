"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className || ""}`} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
};

export function LoginForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      nextErrors.email = "Informe o e-mail cadastrado.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Endereço de e-mail inválido.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Sua senha é obrigatória.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof typeof initialState, value: any) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {/* Input de E-mail */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="email" className="block text-xs font-semibold text-foreground tracking-tight">
          E-mail corporativo
        </label>
        
        <div
          className={`group relative flex items-center rounded-xl border bg-background transition-all duration-200 ${
            errors.email
              ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
              : "border-border-subtle hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20"
          }`}
        >
          <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="nome@empresa.com.br"
            aria-invalid={Boolean(errors.email)}
            disabled={isSubmitting}
          />
        </div>

        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-[11px] font-medium text-danger pt-0.5"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Input de Senha */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-semibold text-foreground tracking-tight">
            Senha de acesso
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-primary hover:text-primary-hover transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Esqueceu?
          </Link>
        </div>

        <div
          className={`group relative flex items-center rounded-xl border bg-background transition-all duration-200 ${
            errors.password
              ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
              : "border-border-subtle hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20"
          }`}
        >
          <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            className="h-11 w-full rounded-xl bg-transparent pl-10 pr-10 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer rounded-md"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-[11px] font-medium text-danger pt-0.5"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Checkbox "Lembrar-me" */}
      <div className="flex items-center pt-0.5">
        <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            id="remember-me"
            type="checkbox"
            checked={form.rememberMe}
            onChange={(e) => handleChange("rememberMe", e.target.checked)}
            className="h-4 w-4 rounded border-border-subtle text-primary focus:ring-ring/20 accent-primary transition-all cursor-pointer"
          />
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            Lembrar deste dispositivo
          </span>
        </label>
      </div>

      {/* Botão Principal via Design System */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        isLoading={isSubmitting}
        className="w-full group font-semibold mt-2"
      >
        <span>Acessar plataforma</span>
        {!isSubmitting && (
          <ArrowRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        )}
      </Button>

      {/* Separador Orgânico */}
      <div className="relative flex items-center py-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          ou continue com
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      {/* Botão Social Google via Design System */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={isSubmitting}
        className="w-full justify-center gap-2.5"
      >
        <GoogleIcon />
        <span>Conta Google</span>
      </Button>

      {/* Rodapé do Formulário */}
      <p className="pt-2 text-center text-xs text-muted-foreground">
        Novo por aqui?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Cadastre sua loja
        </Link>
      </p>
    </form>
  );
}