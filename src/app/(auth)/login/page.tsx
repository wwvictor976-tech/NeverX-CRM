"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

import { setMockUserSession } from "@/lib/mock-auth";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import {
  AuthDivider,
  AuthErrorBanner,
  AuthField,
  AppleIcon,
  GoogleIcon,
} from "@/components/auth/auth-ui";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(null);
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
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMockUserSession({
        email: data.email,
        name: data.email.split("@")[0]?.trim() || "Lojista",
      });
      router.push("/dashboard");
    } catch {
      setError("E-mail ou senha incorretos.");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setSocialLoading(provider);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMockUserSession({
        email: `lojista.${provider}@neverx.com`,
        name: provider === "google" ? "Lojista Google" : "Lojista Apple",
      });
      router.push("/dashboard");
    } catch {
      setError(`Erro na conexão via ${provider}.`);
      setSocialLoading(null);
    }
  };

  const isAnyLoading = isLoading || socialLoading !== null;

  return (
    <AuthLayout mode="login">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col gap-6"
      >
        {/* Cabeçalho */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed px-1">
            Entre na sua conta e continue gerenciando relacionamentos que geram resultados.
          </p>
        </div>

        {/* Formulário de E-mail/Senha */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <AuthField
            id="login-email"
            label="E-mail"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            disabled={isAnyLoading}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-2">
            <AuthField
              id="login-password"
              label="Senha"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isAnyLoading}
              error={errors.password?.message}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
              {...register("password")}
            />

            {/* Lembrar de mim & Esqueceu a senha */}
            <div className="flex items-center justify-between pt-1">
              <label
                htmlFor="remember-me"
                className="group flex cursor-pointer select-none items-center gap-2"
              >
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  disabled={isAnyLoading}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-foreground accent-foreground focus:ring-accent/20 disabled:opacity-50 transition-colors"
                />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Lembrar de mim
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="auth-link text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          {error && <AuthErrorBanner message={error} />}

          {/* Botão de Submit */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            isLoading={isLoading}
            disabled={isAnyLoading}
            className="w-full relative group"
          >
            <span>Entrar</span>
            {!isLoading && (
              <ArrowRight className="h-4 w-4 absolute right-4 transition-transform group-hover:translate-x-1" />
            )}
          </Button>
        </form>

        {/* Divisor */}
        <AuthDivider label="ou continue com" />

        {/* Botões Sociais */}
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="social"
            size="lg"
            disabled={isAnyLoading}
            isLoading={socialLoading === "google"}
            onClick={() => handleSocialLogin("google")}
            className="w-full relative"
          >
            {socialLoading !== "google" && (
              <div className="absolute left-4">
                <GoogleIcon />
              </div>
            )}
            <span>
              {socialLoading === "google" ? "Conectando..." : "Continuar com Google"}
            </span>
          </Button>

          <Button
            type="button"
            variant="social"
            size="lg"
            disabled={isAnyLoading}
            isLoading={socialLoading === "apple"}
            onClick={() => handleSocialLogin("apple")}
            className="w-full relative"
          >
            {socialLoading !== "apple" && (
              <div className="absolute left-4">
                <AppleIcon className="text-foreground" />
              </div>
            )}
            <span>
              {socialLoading === "apple" ? "Conectando..." : "Continuar com Apple"}
            </span>
          </Button>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs text-muted-foreground mt-1">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="auth-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}