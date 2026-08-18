"use client";

import { useState, type SVGProps } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setMockUserSession } from "@/lib/mock-auth";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
import { AuthLayout } from "@/components/auth/auth-layout";

function GoogleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className || ""}`} viewBox="0 0 24 24" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 fill-current ${className || ""}`} viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* Classes refinadas para alto contraste contra fundo branco */
const inputWrapperClass = "group relative flex items-center transition-all duration-200 rounded-xl border border-slate-300 bg-slate-100/60 focus-within:bg-white focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20 shadow-2xs";
const inputFieldClass = "h-11 w-full bg-transparent px-3.5 pl-10 text-sm font-normal text-slate-900 placeholder:text-slate-500 focus:outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors";
const socialBtnClass = "h-10.5 w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-100/80 text-xs font-semibold text-slate-900 transition-all duration-200 active:scale-[0.97] shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
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
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Painel do Lojista
          </h2>
          <p className="text-xs font-medium text-slate-600">
            Entre para gerenciar seus clientes, histórico de compras e pós-venda.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} type="button" className={socialBtnClass} disabled={isLoading}>
            <GoogleIcon />
            <span>Google</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} type="button" className={socialBtnClass} disabled={isLoading}>
            <GithubIcon className="text-slate-950" />
            <span>GitHub</span>
          </motion.button>
        </div>

        <div className="relative flex items-center py-0.5">
          <div className="h-px flex-1 bg-slate-300" />
          <span className="px-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500">
            ou via e-mail
          </span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-xs font-semibold text-slate-900">
              E-mail corporativo
            </Label>
            <div className={inputWrapperClass}>
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="lojista@sualoja.com"
                disabled={isLoading}
                className={inputFieldClass}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1 text-xs font-medium text-red-700 mt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-password" className="text-xs font-semibold text-slate-900">
              Senha
            </Label>
            <div className={inputWrapperClass}>
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={isLoading}
                className={`${inputFieldClass} pr-10`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="flex items-center gap-1 text-xs font-medium text-red-700 mt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password.message}
              </p>
            )}

            <div className="flex items-center justify-between pt-1">
              <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-400 bg-slate-100 text-teal-700 focus:ring-teal-700/20 transition-colors cursor-pointer accent-teal-700"
                />
                <span className="text-xs font-medium text-slate-700 hover:text-slate-950 transition-colors">
                  Lembrar-me
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors underline-offset-2 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-950 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Acessando...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Acessar minha loja
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>

        <div className="pt-1 text-center text-xs text-slate-600">
          Ainda não cadastrou sua loja?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-700 hover:text-teal-800 underline-offset-2 hover:underline cursor-pointer"
          >
            Criar conta
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}