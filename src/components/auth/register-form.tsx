"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {};

    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    router.push(`/register/password?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-200">
          Nome
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Seu nome completo"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="text-sm text-rose-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium text-slate-200">
          E-mail
        </label>
        <input
          id="register-email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="seu@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950 transition-opacity hover:bg-emerald-400"
      >
        Continuar
      </button>

      <p className="text-center text-sm text-slate-400">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
          Voltar para Login
        </Link>
      </p>
    </form>
  );
}
