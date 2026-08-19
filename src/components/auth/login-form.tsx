"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { 
  AuthField, 
  AuthSubmitButton, 
  SocialButton, 
  AuthDivider, 
  GoogleIcon, 
  AppleIcon 
} from "@/components/auth/auth-ui";

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialState: FormState = {
  email: "",
  password: "",
  rememberMe: false,
};

export function LoginForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!form.email.trim()) {
      nextErrors.email = "Informe o e-mail cadastrado.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Endereço de e-mail inválido.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Sua senha é obrigatória.";
    }

    return nextErrors;
  };

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="w-full space-y-4">
      {/* Título e Subtítulo */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl">
          Bem-vindo de volta
        </h2>
        <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
          Entre na sua conta e continue gerenciando relacionamentos que geram resultados.
        </p>
      </div>

      <form className="space-y-3.5" onSubmit={handleSubmit} noValidate>
        {/* Campo E-mail */}
        <AuthField
          id="email"
          type="email"
          autoComplete="email"
          label="E-mail"
          icon={Mail}
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          disabled={isSubmitting}
        />

        {/* Campo Senha */}
        <AuthField
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          label="Senha"
          icon={Lock}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          showPasswordToggle
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          disabled={isSubmitting}
        />

        {/* Opções: Lembrar de mim / Esqueceu a senha */}
        <div className="flex items-center justify-between pt-0.5">
          <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              id="remember-me"
              type="checkbox"
              checked={form.rememberMe}
              onChange={(e) => handleChange("rememberMe", e.target.checked)}
              className="h-3.5 w-3.5 rounded border-border text-foreground accent-accent focus:ring-accent/20 disabled:opacity-50 transition-colors cursor-pointer"
            />
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              Lembrar de mim
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="auth-link text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        {/* Botão de Entrar */}
        <AuthSubmitButton isLoading={isSubmitting} loadingLabel="Entrando...">
          Entrar
        </AuthSubmitButton>

        {/* Divisor */}
        <AuthDivider label="ou continue com" />

        {/* Botões Sociais */}
        <div className="flex flex-col gap-2.5">
          <SocialButton disabled={isSubmitting}>
            <div className="absolute left-4">
              <GoogleIcon />
            </div>
            <span>Continuar com Google</span>
          </SocialButton>

          <SocialButton disabled={isSubmitting}>
            <div className="absolute left-4">
              <AppleIcon />
            </div>
            <span>Continuar com Apple</span>
          </SocialButton>
        </div>

        {/* Rodapé para Cadastro */}
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="auth-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}