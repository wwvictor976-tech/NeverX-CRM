"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, KeyRound, Loader2, Lock, Mail, User } from "lucide-react";

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

  // Regras de validação em tempo real
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
      <div className="space-y-1">
        <label htmlFor="name" className="text-[12px] font-semibold text-slate-900 tracking-tight">
          Nome do responsável ou loja
        </label>
        <div className="relative flex items-center group">
          <User className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-700 transition-colors pointer-events-none z-10" />
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className={`h-11 w-full rounded-xl border bg-slate-50/50 pl-10 pr-3.5 text-sm font-normal text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:outline-none transition-all duration-200 ${
              errors.name
                ? "border-red-400 focus:border-red-600 focus:ring-3 focus:ring-red-500/15"
                : "border-slate-300/90 hover:border-slate-400 focus:border-teal-700 focus:ring-3 focus:ring-teal-700/15"
            }`}
            placeholder="Ex: Ana Silva ou Boutique Modas"
            aria-invalid={Boolean(errors.name)}
            disabled={isSubmitting}
          />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-red-700 pt-0.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo: E-mail */}
      <div className="space-y-1">
        <label htmlFor="register-email" className="text-[12px] font-semibold text-slate-900 tracking-tight">
          E-mail corporativo
        </label>
        <div className="relative flex items-center group">
          <Mail className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-700 transition-colors pointer-events-none z-10" />
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className={`h-11 w-full rounded-xl border bg-slate-50/50 pl-10 pr-3.5 text-sm font-normal text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:outline-none transition-all duration-200 ${
              errors.email
                ? "border-red-400 focus:border-red-600 focus:ring-3 focus:ring-red-500/15"
                : "border-slate-300/90 hover:border-slate-400 focus:border-teal-700 focus:ring-3 focus:ring-teal-700/15"
            }`}
            placeholder="contato@sualoja.com.br"
            aria-invalid={Boolean(errors.email)}
            disabled={isSubmitting}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-red-700 pt-0.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Agrupamento em Grid: Senha e Confirmação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Campo: Senha */}
        <div className="space-y-1">
          <label htmlFor="register-password" className="text-[12px] font-semibold text-slate-900 tracking-tight">
            Criar senha
          </label>
          <div className="relative flex items-center group">
            <Lock className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-700 transition-colors pointer-events-none z-10" />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => handleChange("password", event.target.value)}
              className={`h-11 w-full rounded-xl border bg-slate-50/50 pl-10 pr-3.5 text-sm font-normal text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:outline-none transition-all duration-200 ${
                errors.password
                  ? "border-red-400 focus:border-red-600 focus:ring-3 focus:ring-red-500/15"
                  : "border-slate-300/90 hover:border-slate-400 focus:border-teal-700 focus:ring-3 focus:ring-teal-700/15"
              }`}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Campo: Confirmar Senha */}
        <div className="space-y-1">
          <label htmlFor="confirm-password" className="text-[12px] font-semibold text-slate-900 tracking-tight">
            Confirmar senha
          </label>
          <div className="relative flex items-center group">
            <KeyRound className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-700 transition-colors pointer-events-none z-10" />
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(event) => handleChange("confirmPassword", event.target.value)}
              className={`h-11 w-full rounded-xl border bg-slate-50/50 pl-10 pr-9 text-sm font-normal text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:outline-none transition-all duration-200 ${
                errors.confirmPassword
                  ? "border-red-400 focus:border-red-600 focus:ring-3 focus:ring-red-500/15"
                  : "border-slate-300/90 hover:border-slate-400 focus:border-teal-700 focus:ring-3 focus:ring-teal-700/15"
              }`}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer rounded-md"
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
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-medium text-red-700 pt-0.5">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
            {errors.password || errors.confirmPassword}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Checklist Dinâmico de Segurança da Senha */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-3 space-y-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">Requisitos da senha:</span>
          <span className="font-mono text-[10px] font-bold text-slate-500">{rulesPassed}/3 atendidos</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasMinLength ? "text-emerald-700 font-semibold" : "text-slate-400"}`}>
            <Check className={`h-3.5 w-3.5 ${hasMinLength ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> 8+ letras
          </span>
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasUpper ? "text-emerald-700 font-semibold" : "text-slate-400"}`}>
            <Check className={`h-3.5 w-3.5 ${hasUpper ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> Maiúscula
          </span>
          <span className={`flex items-center gap-1.5 font-medium transition-colors ${hasNumber ? "text-emerald-700 font-semibold" : "text-slate-400"}`}>
            <Check className={`h-3.5 w-3.5 ${hasNumber ? "text-emerald-600 opacity-100" : "opacity-30"}`} /> Número
          </span>
        </div>
      </div>

      {/* Botão de Submissão */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 text-xs font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] border border-slate-800 transition-all duration-200 hover:from-slate-800 hover:to-slate-900 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer flex items-center justify-center mt-3"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-slate-300" />
            <span className="text-slate-200">Criando conta...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1.5">
            Cadastrar minha loja
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
          </span>
        )}
      </button>

      {/* Link para Login */}
      <p className="pt-1 text-center text-xs text-slate-600">
        Já possui conta registrada?{" "}
        <Link
          href="/login"
          className="font-semibold text-teal-700 hover:text-teal-800 underline-offset-4 hover:underline transition-colors"
        >
          Acessar painel
        </Link>
      </p>
    </form>
  );
}