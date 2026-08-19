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
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
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
  let strengthTextColor = "text-danger";
  let strengthBarColor = "bg-danger";

  if (rulesPassed === 2 || rulesPassed === 3) {
    strengthLabel = "Média";
    strengthTextColor = "text-amber-600";
    strengthBarColor = "bg-amber-500";
  } else if (rulesPassed === 4) {
    strengthLabel = "Forte";
    strengthTextColor = "text-emerald-600";
    strengthBarColor = "bg-emerald-600";
  }

  const onSubmit = async ({ name, email }: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMockUserSession({ email, name });
      router.push("/dashboard");
    } catch {
      setError("Erro durante o cadastro. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMockUserSession({
        email: `lojista.${provider}@neverx.com`,
        name: provider === "google" ? "Lojista Google" : "Lojista GitHub",
      });
      router.push("/dashboard");
    } catch {
      setError(`Erro na conexão com ${provider}.`);
      setSocialLoading(null);
    }
  };

  const isAnyLoading = isLoading || socialLoading !== null;

  const passwordChecks = [
    { ok: hasMinLength, label: "8+ caracteres" },
    { ok: hasUpper && hasLower, label: "Maiúscula e minúscula" },
    { ok: hasNumber, label: "Números" },
    { ok: hasSpecial, label: "Símbolos (@#$)" },
  ];

  return (
    <AuthLayout mode="register">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Cadastrar loja
          </h1>
          <p className="text-sm text-muted-foreground">
            Crie sua conta para gerenciar clientes e automatizar pós-venda.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialRegister("google")}
            className="w-full justify-center"
          >
            <GoogleIcon />
            <span className="font-medium text-xs text-foreground">
              {socialLoading === "google" ? "Conectando..." : "Google"}
            </span>
          </SocialButton>

          <SocialButton
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialRegister("github")}
            className="w-full justify-center"
          >
            <GithubIcon className="text-foreground" />
            <span className="font-medium text-xs text-foreground">
              {socialLoading === "github" ? "Conectando..." : "GitHub"}
            </span>
          </SocialButton>
        </div>

        <AuthDivider label="ou preencha os dados" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          <AuthField
            id="reg-name"
            label="Nome da loja ou responsável"
            icon={Store}
            placeholder="Ex: Boutique Modas"
            disabled={isAnyLoading}
            error={errors.name?.message}
            {...register("name")}
          />

          <AuthField
            id="reg-email"
            label="E-mail corporativo"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="contato@sualoja.com.br"
            disabled={isAnyLoading}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AuthField
              id="reg-password"
              label="Senha"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isAnyLoading}
              error={errors.password?.message}
              {...register("password")}
            />

            <AuthField
              id="reg-confirm"
              label="Confirmar senha"
              icon={KeyRound}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isAnyLoading}
              error={errors.confirmPassword?.message}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
              {...register("confirmPassword")}
            />
          </div>

          {(errors.password || errors.confirmPassword) && (
            <p className="text-[11px] font-medium text-danger text-left pt-0.5">
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
                className="space-y-2 overflow-hidden rounded-xl border border-border-subtle bg-muted/40 p-3 text-left"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">Força da senha:</span>
                  <span className={`font-semibold ${strengthTextColor}`}>{strengthLabel}</span>
                </div>

                <div className="grid h-1.5 grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-colors duration-300 ${
                        step <= rulesPassed ? strengthBarColor : "bg-border-subtle"
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  {passwordChecks.map(({ ok, label }) => (
                    <span
                      key={label}
                      className={`flex items-center gap-1.5 font-medium transition-colors ${
                        ok ? "text-emerald-600 font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${ok ? "text-emerald-600 opacity-100" : "opacity-30"}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <AuthErrorBanner message={error} />}

          <AuthSubmitButton
            isLoading={isLoading}
            disabled={isAnyLoading}
            loadingLabel="Criando conta..."
            className="w-full group mt-1"
          >
            Cadastrar minha loja
          </AuthSubmitButton>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Já possui conta da sua loja?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Acessar painel
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}