"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function RegisterPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { password?: string; confirmPassword?: string } = {};

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

  const name = searchParams.get("name") ?? "seu nome";
  const email = searchParams.get("email") ?? "seu@email.com";

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
        <p className="font-medium text-white">Finalizando cadastro</p>
        <p className="mt-1 text-slate-400">{name}</p>
        <p className="text-slate-400">{email}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
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
          onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
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
    </form>
  );
}
