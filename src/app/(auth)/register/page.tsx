import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Criar conta"
      description="Comece com seu nome e e-mail para configurar sua conta no NeverX."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
