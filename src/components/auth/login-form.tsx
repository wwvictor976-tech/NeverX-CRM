"use client";

import Link from "next/link";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export function LoginForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Informe sua senha.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
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
    }, 600);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="seu@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => handleChange("password", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="••••••••"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.password ? (
          <p id="password-error" className="text-sm text-rose-300">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950 transition-opacity hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        <span className="text-lg">G</span>
        Continuar com Google
      </button>

      <p className="text-center text-sm text-slate-400">
        Ainda não tem conta?{" "}
        <Link href="/register" className="font-medium text-emerald-300 hover:text-emerald-200">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
