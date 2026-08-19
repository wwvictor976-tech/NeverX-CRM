"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, KeyRound, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchPassword = form.password;
  const hasMinLength = watchPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(watchPassword);
  const hasNumber = /\d/.test(watchPassword);
  const rulesPassed = [hasMinLength, hasUpper, hasNumber].filter(Boolean).length;

  const validate = () => {
    const nextErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome completo ou da loja.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail corporativo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Endereço de e-mail inválido.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    } else if (!/[A-Z]/.test(form.password)) {
      nextErrors.password = "A senha deve conter ao menos uma letra maiúscula.";
    } else if (!/\d/.test(form.password)) {
      nextErrors.password = "A senha deve conter ao menos um número.";
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "As senhas não coincidem.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
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
      router.push("/dashboard");
    }, 600);
  };

  return (
    <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
      {/* Campo: Nome */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="name" className="block text-xs font-semibold text-foreground tracking-tight">
          Nome do responsável ou loja
        </label>
        <div
          className={`group relative flex items-center rounded-xl border bg-background transition-all duration-200 ${
            errors.name
              ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
              : "border-border-subtle hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20"
          }`}
        >
          <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Ex: Ana Silva ou Boutique Modas"
            aria-invalid={Boolean(errors.name)}
            disabled={isSubmitting}
          />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-danger pt-0.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo: E-mail */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="register-email" className="block text-xs font-semibold text-foreground tracking-tight">
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
            id="register-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="contato@sualoja.com.br"
            aria-invalid={Boolean(errors.email)}
            disabled={isSubmitting}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-danger pt-0.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Agrupamento em Grid: Senha e Confirmação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {/* Campo: Senha */}
        <div className="space-y-1.5">
          <label htmlFor="register-password" className="block text-xs font-semibold text-foreground tracking-tight">
            Criar senha
          </label>
          <div
            className={`group relative flex items-center rounded-xl border bg-background transition-all duration-200 ${
              errors.password
                ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
                : "border-border-subtle hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20"
            }`}
          >
            <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => handleChange("password", event.target.value)}
              className="h-11 w-full rounded-xl bg-transparent pl-10 pr-3.5 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="••••••••"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Campo: Confirmar Senha */}
        <div className="space-y-1.5">
          <label htmlFor="confirm-password" className="block text-xs font-semibold text-foreground tracking-tight">
            Confirmar senha
          </label>
          <div
            className={`group relative flex items-center rounded-xl border bg-background transition-all duration-200 ${
              errors.confirmPassword
                ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
                : "border-border-subtle hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20"
            }`}
          >
            <KeyRound className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(event) => handleChange("confirmPassword", event.target.value)}
              className="h-11 w-full rounded-xl bg-transparent pl-10 pr-9 text-sm font-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer rounded-md"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Erros das Senhas */}
      <AnimatePresence>
        {(errors.password || errors.confirmPassword) && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-danger pt-0.5 text-left">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-danger" />
            {errors.password || errors.confirmPassword}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Checklist Dinâmico de Segurança da Senha */}
      <div className="rounded-xl border border-border-subtle bg-muted/50 p-3 space-y-2 text-left">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-foreground">Requisitos da senha:</span>
          <span className="font-mono text-[10px] font-bold text-muted-foreground">{rulesPassed}/3 atendidos</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasMinLength ? "text-emerald-700 font-semibold" : "text-muted-foreground"}`}>
            <Check className={`h-3.5 w-3.5 ${hasMinLength ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> 8+ letras
          </span>
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasUpper ? "text-emerald-700 font-semibold" : "text-muted-foreground"}`}>
            <Check className={`h-3.5 w-3.5 ${hasUpper ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> Maiúscula
          </span>
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasNumber ? "text-emerald-700 font-semibold" : "text-muted-foreground"}`}>
            <Check className={`h-3.5 w-3.5 ${hasNumber ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> Número
          </span>
        </div>
      </div>

      {/* Botão de Submissão via Design System */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        isLoading={isSubmitting}
        className="w-full group font-semibold mt-3"
      >
        <span>Cadastrar minha loja</span>
        {!isSubmitting && (
          <ArrowRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        )}
      </Button>

      {/* Link para Login */}
      <p className="pt-1 text-center text-xs text-muted-foreground">
        Já possui conta registrada?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Acessar painel
        </Link>
      </p>
    </form>
  );
}