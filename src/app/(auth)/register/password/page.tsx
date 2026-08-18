import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterPasswordForm } from "@/components/auth/register-password-form";

export default function RegisterPasswordPage() {
  return (
    <AuthLayout
      title="Escolha sua senha"
      description="Finalize seu cadastro com uma senha segura e fácil de lembrar."
    >
      <Suspense
        fallback={
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-400">
            Carregando formulário...
          </div>
        }
      >
        <RegisterPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
