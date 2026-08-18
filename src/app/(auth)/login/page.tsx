"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { setMockUserSession } from "@/lib/mock-auth";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      setMockUserSession({
        email: data.email,
        name: data.email.split("@")[0]?.trim() || "Lojista",
      });
      router.push("/dashboard");
    } catch {
      setError("Falha ao simular o login. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-4 sm:gap-5"
      >
        <div className="space-y-1 text-left">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Painel do Lojista</h2>
          <p className="text-xs font-medium text-slate-600">
            Entre para gerenciar seus clientes, histórico de compras e pós-venda.
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

        <AuthDivider label="ou via e-mail" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
          <AuthField
            id="login-email"
            label="E-mail corporativo"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="lojista@sualoja.com"
            disabled={isLoading}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1.5">
            <AuthField
              id="login-password"
              label="Senha"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isLoading}
              error={errors.password?.message}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
              {...register("password")}
            />

            <div className="flex items-center justify-between pt-1">
              <label htmlFor="remember-me" className="flex cursor-pointer select-none items-center gap-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-slate-400 bg-slate-100 text-teal-700 accent-teal-700 transition-colors focus:ring-teal-700/20"
                />
                <span className="text-xs font-medium text-slate-700 transition-colors hover:text-slate-950">
                  Lembrar-me
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-xs font-semibold text-teal-700 underline-offset-2 transition-colors hover:text-teal-800 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          {error && <AuthErrorBanner message={error} />}

          <AuthSubmitButton isLoading={isLoading} loadingLabel="Acessando...">
            Acessar minha loja
          </AuthSubmitButton>
        </form>

        <p className="pt-1 text-center text-xs text-slate-600">
          Ainda não cadastrou sua loja?{" "}
          <Link
            href="/register"
            className="cursor-pointer font-semibold text-teal-700 underline-offset-2 transition-colors hover:text-teal-800 hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
