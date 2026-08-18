import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Entrar"
      description="Acesse sua conta do NeverX e acompanhe o relacionamento com seus clientes."
    >
      <LoginForm />
    </AuthLayout>
  );
}
