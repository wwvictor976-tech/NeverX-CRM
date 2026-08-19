"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLayout } from "@/components/auth/auth-layout";
import {
  AuthErrorBanner,
  AuthField,
  AuthSubmitButton,
} from "@/components/auth/auth-ui";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Informe seu e-mail.").email("E-mail inválido."),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsSent(true);
    } catch {
      setError("Não foi possível enviar o link. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col gap-6"
      >
        {isSent ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Verifique seu e-mail
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Se existir uma conta com esse endereço, enviaremos um link para redefinir sua senha.
              </p>
            </div>
            <Link
              href="/login"
              className="auth-link inline-flex text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Voltar para o login
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Esqueceu sua senha?
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Informe seu e-mail e enviaremos um link para você criar uma nova senha.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <AuthField
                id="forgot-password-email"
                label="E-mail"
                icon={Mail}
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                disabled={isLoading}
                error={errors.email?.message}
                {...register("email")}
              />

              {error && <AuthErrorBanner message={error} />}

              <AuthSubmitButton isLoading={isLoading} loadingLabel="Enviando link...">
                Enviar link de recuperação
              </AuthSubmitButton>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              Lembrou sua senha?{" "}
              <Link
                href="/login"
                className="auth-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                Fazer login
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </AuthLayout>
  );
}
