"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    } else if (!/[A-Z]/.test(form.password)) {
      nextErrors.password = "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/\d/.test(form.password)) {
      nextErrors.password = "A senha deve conter pelo menos um número.";
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "As senhas não conferem.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof typeof form, value: string) => {
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
      router.push("/dashboard");
    }, 500);
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
          onChange={(event) => handleChange("name", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Seu nome completo"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
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
        <label htmlFor="register-password" className="text-sm font-medium text-slate-200">
          Senha
        </label>
        <input
          id="register-password"
          type="password"
          value={form.password}
          onChange={(event) => handleChange("password", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Crie uma senha"
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

      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium text-slate-200">
          Confirmar senha
        </label>
        <input
          id="confirm-password"
          type="password"
          value={form.confirmPassword}
          onChange={(event) => handleChange("confirmPassword", event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Repita a senha"
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.confirmPassword ? (
          <p id="confirm-password-error" className="text-sm text-rose-300">
            {errors.confirmPassword}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-slate-300">
        <p className="font-medium text-emerald-200">Senha deve conter:</p>
        <ul className="mt-2 space-y-1">
          <li>✓ Pelo menos 8 caracteres</li>
          <li>✓ Uma letra maiúscula</li>
          <li>✓ Um número</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950 transition-opacity hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Criando conta..." : "Criar conta"}
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
