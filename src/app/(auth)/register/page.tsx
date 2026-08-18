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
<<<<<<< HEAD
import {
  AuthDivider,
  AuthErrorBanner,
  AuthField,
  AuthSubmitButton,
  GithubIcon,
  GoogleIcon,
  SocialButton,
} from "@/components/auth/auth-ui";
=======

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

/* Classes de alto contraste padronizadas para fundo claro */
const inputWrapperClass = "group relative flex items-center transition-all duration-200 rounded-xl border border-slate-300 bg-slate-100/60 focus-within:bg-white focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20 shadow-2xs";
const inputFieldClass = "h-11 w-full bg-transparent px-3.5 pl-10 text-sm font-normal text-slate-900 placeholder:text-slate-500 focus:outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors";
const socialBtnClass = "h-10.5 w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-100/80 text-xs font-semibold text-slate-900 transition-all duration-200 active:scale-[0.97] shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
>>>>>>> fcd77b7 (arrumando ui)

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
<<<<<<< HEAD
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Cadastre sua loja</h2>
=======
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Cadastre sua loja
          </h2>
>>>>>>> fcd77b7 (arrumando ui)
          <p className="text-xs font-medium text-slate-600">
            Transforme a experiência de compra dos seus clientes hoje.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <SocialButton disabled={isLoading}>
            <GoogleIcon />
            <span>Google</span>
<<<<<<< HEAD
          </SocialButton>
          <SocialButton disabled={isLoading}>
=======
          </motion.button>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} type="button" className={socialBtnClass} disabled={isLoading}>
>>>>>>> fcd77b7 (arrumando ui)
            <GithubIcon className="text-slate-950" />
            <span>GitHub</span>
          </SocialButton>
        </div>

<<<<<<< HEAD
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
              {...register("password")}
            />
            <AuthField
              id="reg-confirm"
              label="Confirmar"
              icon={KeyRound}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isLoading}
              showPasswordToggle
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
              {...register("confirmPassword")}
            />
          </div>

          {(errors.password || errors.confirmPassword) && (
            <p className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-red-700">
=======
        <div className="relative flex items-center py-0.5">
          <div className="h-px flex-1 bg-slate-300" />
          <span className="px-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500">
            ou preencha os dados
          </span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="reg-name" className="text-xs font-semibold text-slate-900">
              Nome da loja ou responsável
            </Label>
            <div className={inputWrapperClass}>
              <Store className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
              <Input
                id="reg-name"
                placeholder="Ex: Boutique Modas"
                disabled={isLoading}
                className={inputFieldClass}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="flex items-center gap-1 text-xs font-medium text-red-700 mt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reg-email" className="text-xs font-semibold text-slate-900">
              E-mail
            </Label>
            <div className={inputWrapperClass}>
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
              <Input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="contato@sualoja.com"
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

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1.5">
              <Label htmlFor="reg-password" className="text-xs font-semibold text-slate-900">
                Senha
              </Label>
              <div className={inputWrapperClass}>
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`${inputFieldClass} pr-8`}
                  {...register("password")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-confirm" className="text-xs font-semibold text-slate-900">
                Confirmar
              </Label>
              <div className={inputWrapperClass}>
                <KeyRound className="absolute left-3.5 h-4 w-4 text-slate-500 group-focus-within:text-teal-700 transition-colors" />
                <Input
                  id="reg-confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`${inputFieldClass} pr-9`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 p-1 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {(errors.password || errors.confirmPassword) && (
            <p className="flex items-center gap-1 text-xs font-medium text-red-700 mt-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
>>>>>>> fcd77b7 (arrumando ui)
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
<<<<<<< HEAD
                className="space-y-2 overflow-hidden pt-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">Força da senha:</span>
                  <span className={`font-semibold ${strengthTextColor}`}>{strengthLabel}</span>
=======
                className="overflow-hidden space-y-2 pt-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">
                    Força da senha:
                  </span>
                  <span className={`font-semibold ${strengthTextColor}`}>
                    {strengthLabel}
                  </span>
>>>>>>> fcd77b7 (arrumando ui)
                </div>

                <div className="grid h-1.5 grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-colors duration-300 ${
<<<<<<< HEAD
                        step <= rulesPassed ? strengthBarColor : "bg-slate-300"
=======
                        step <= rulesPassed
                          ? strengthBarColor
                          : "bg-slate-300"
>>>>>>> fcd77b7 (arrumando ui)
                      }`}
                    />
                  ))}
                </div>

<<<<<<< HEAD
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  {passwordChecks.map(({ ok, label }) => (
                    <span
                      key={label}
                      className={`flex items-center gap-1 ${ok ? "font-semibold text-emerald-700" : "text-slate-500"}`}
                    >
                      <Check className={`h-3 w-3 ${ok ? "opacity-100" : "opacity-40"}`} /> {label}
                    </span>
                  ))}
=======
                <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                  <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-700 font-semibold" : "text-slate-500"}`}>
                    <Check className={`h-3 w-3 ${hasMinLength ? "opacity-100" : "opacity-40"}`} /> 8+ caracteres
                  </span>
                  <span className={`flex items-center gap-1 ${hasUpper && hasLower ? "text-emerald-700 font-semibold" : "text-slate-500"}`}>
                    <Check className={`h-3 w-3 ${hasUpper && hasLower ? "opacity-100" : "opacity-40"}`} /> Mín. & Máj.
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-700 font-semibold" : "text-slate-500"}`}>
                    <Check className={`h-3 w-3 ${hasNumber ? "opacity-100" : "opacity-40"}`} /> Números
                  </span>
                  <span className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-700 font-semibold" : "text-slate-500"}`}>
                    <Check className={`h-3 w-3 ${hasSpecial ? "opacity-100" : "opacity-40"}`} /> Símbolos (@#$)
                  </span>
>>>>>>> fcd77b7 (arrumando ui)
                </div>
              </motion.div>
            )}
          </AnimatePresence>

<<<<<<< HEAD
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
=======
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="group relative mt-1 h-11 w-full overflow-hidden rounded-xl bg-slate-950 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Criando conta...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Cadastrar minha loja
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>

        <div className="pt-0.5 text-center text-xs text-slate-600">
          Já possui conta da sua loja?{" "}
          <Link
            href="/login"
            className="font-semibold text-teal-700 hover:text-teal-800 underline-offset-2 hover:underline cursor-pointer"
>>>>>>> fcd77b7 (arrumando ui)
          >
            Acessar painel
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
