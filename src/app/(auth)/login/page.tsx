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
  GithubIcon,
  GoogleIcon,
  SocialButton,
} from "@/components/auth/auth-ui";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
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

  const handleSocialLogin = async (provider: "google" | "github") => {
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
      setError(`Erro na conexão via ${provider}.`);
      setSocialLoading(null);
    }
  };

  const isAnyLoading = isLoading || socialLoading !== null;

  return (
    <AuthLayout mode="login">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col gap-5"
      >
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Acessar conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para acessar o painel NeverX.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialLogin("google")}
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
            onClick={() => handleSocialLogin("github")}
            className="w-full justify-center"
          >
            <GithubIcon className="text-foreground" />
            <span className="font-medium text-xs text-foreground">
              {socialLoading === "github" ? "Conectando..." : "GitHub"}
            </span>
          </SocialButton>
        </div>

        <AuthDivider label="ou continue com e-mail" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <AuthField
            id="login-email"
            label="E-mail"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="nome@empresa.com"
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

            <div className="flex items-center justify-between pt-0.5">
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
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600/20 disabled:opacity-50"
                />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Lembrar de mim
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          {error && <AuthErrorBanner message={error} />}

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            disabled={isAnyLoading}
            className="w-full group bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
            <span>Entrar na plataforma</span>
            {!isLoading && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}