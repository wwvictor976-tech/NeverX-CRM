"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, KeyRound, Lock, Mail, Store } from "lucide-react";
import { setMockUserSession } from "@/lib/mock-auth";
import { registerSchema, type RegisterInput } from "@/features/auth/schemas/auth.schema";
import { AuthLayout } from "@/components/auth/auth-layout";
import {
  AuthDivider,
  AuthErrorBanner,
  AuthField,
  AuthSubmitButton,
  GithubIcon,
  GoogleIcon,
  SocialButton,
} from "@/components/auth/auth-ui";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const watchPassword = watch("password", "");
  const hasMinLength = watchPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(watchPassword);
  const hasLower = /[a-z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(watchPassword);

  const rulesPassed = [hasMinLength, hasUpper && hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  let strengthLabel = "Fraca";
  let strengthTextColor = "text-red-700";
  let strengthBarColor = "bg-red-600";

  if (rulesPassed === 2 || rulesPassed === 3) {
    strengthLabel = "Média";
    strengthTextColor = "text-amber-700";
    strengthBarColor = "bg-amber-600";
  } else if (rulesPassed === 4) {
    strengthLabel = "Forte";
    strengthTextColor = "text-emerald-700";
    strengthBarColor = "bg-emerald-600";
  }

  const onSubmit = async ({ name, email }: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      setMockUserSession({ email, name });
      router.push("/dashboard");
    } catch {
      setError("Erro durante o cadastro. Tente novamente.");
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { ok: hasMinLength, label: "8+ caracteres" },
    { ok: hasUpper && hasLower, label: "Min. & Maiúscula" },
    { ok: hasNumber, label: "Números" },
    { ok: hasSpecial, label: "Símbolos (@#$)" },
  ];

  return (
    <AuthLayout mode="register">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-3.5 sm:gap-4"
      >
        <div className="space-y-1 text-left">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Cadastre sua loja</h2>
          <p className="text-xs font-medium text-slate-600">
            Transforme a experiência de compra dos seus clientes hoje.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <SocialButton disabled={isLoading}>
            <GoogleIcon />
            <span>Google</span>
          </SocialButton>

          <SocialButton disabled={isLoading}>
            <GithubIcon className="text-slate-950" />
            <span>GitHub</span>
          </SocialButton>
        </div>

        <AuthDivider label="ou preencha os dados" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3" noValidate>
          <AuthField
            id="reg-name"
            label="Nome da loja ou responsável"
            icon={Store}
            placeholder="Ex: Boutique Modas"
            disabled={isLoading}
            error={errors.name?.message}
            {...register("name")}
          />

          <AuthField
            id="reg-email"
            label="E-mail"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="contato@sualoja.com"
            disabled={isLoading}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="grid grid-cols-2 gap-2.5">
            <AuthField
              id="reg-password"
              label="Senha"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isLoading}
              error={errors.password?.message}
              {...register("password")}
            />

            <AuthField
              id="reg-confirm"
              label="Confirmar"
              icon={KeyRound}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isLoading}
              error={errors.confirmPassword?.message}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((value) => !value)}
              {...register("confirmPassword")}
            />
          </div>

          {(errors.password || errors.confirmPassword) && (
            <p className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-red-700">
              {errors.password?.message || errors.confirmPassword?.message}
            </p>
          )}

          <AnimatePresence>
            {watchPassword.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 overflow-hidden pt-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">Força da senha:</span>
                  <span className={`font-semibold ${strengthTextColor}`}>{strengthLabel}</span>
                </div>

                <div className="grid h-1.5 grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-colors duration-300 ${
                        step <= rulesPassed ? strengthBarColor : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  {passwordChecks.map(({ ok, label }) => (
                    <span
                      key={label}
                      className={`flex items-center gap-1 ${ok ? "font-semibold text-emerald-700" : "text-slate-500"}`}
                    >
                      <Check className={`h-3 w-3 ${ok ? "opacity-100" : "opacity-40"}`} /> {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <AuthErrorBanner message={error} />}

          <AuthSubmitButton isLoading={isLoading} loadingLabel="Criando conta..." className="mt-1">
            Cadastrar minha loja
          </AuthSubmitButton>
        </form>

        <p className="pt-0.5 text-center text-xs text-slate-600">
          Já possui conta da sua loja?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold text-teal-700 underline-offset-2 transition-colors hover:text-teal-800 hover:underline"
          >
            Acessar painel
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
