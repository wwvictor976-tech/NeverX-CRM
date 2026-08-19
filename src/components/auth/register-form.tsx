"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { 
  AuthField, 
  AuthSubmitButton, 
  SocialButton, 
  AuthDivider, 
  GoogleIcon, 
  AppleIcon 
} from "@/components/auth/auth-ui";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação em tempo real da força da senha
  const watchPassword = form.password;
  const score = [
    watchPassword.length >= 8,
    /[A-Z]/.test(watchPassword),
    /\d/.test(watchPassword),
    /[^A-Za-z0-9]/.test(watchPassword),
  ].filter(Boolean).length;
  
  const getStrengthData = () => {
    if (score <= 1) return { label: "Fraca", textColor: "text-danger", barColor: "bg-danger" };
    if (score <= 3) return { label: "Média", textColor: "text-warning", barColor: "bg-warning" };
    return { label: "Forte", textColor: "text-success", barColor: "bg-success" };
  };

  const strength = getStrengthData();

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome completo.";
    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Endereço de e-mail inválido.";
    }
    if (form.password.length < 8) nextErrors.password = "Mínimo 8 caracteres.";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "As senhas não coincidem.";

    return nextErrors;
  };

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="w-full space-y-3">
      {/* Cabeçalho do Card */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl">
          Crie sua conta
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[290px] mx-auto">
          Comece agora e leve a gestão de relacionamentos da sua loja para o próximo nível.
        </p>
      </div>

      {/* Formulário em Coluna Única */}
      <form className="space-y-2.5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="name"
          type="text"
          autoComplete="name"
          label="Nome completo"
          icon={User}
          placeholder="Seu nome completo"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          disabled={isSubmitting}
        />

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

        <div className="space-y-1">
          <AuthField
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
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

          {/* Indicador de Força da Senha Fiel à Imagem 2 */}
          {watchPassword && (
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                Força da senha: <strong className={strength.textColor}>{strength.label}</strong>
              </span>
              <div className="flex gap-1 w-full max-w-[120px] ml-auto">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 w-full rounded-full transition-colors duration-200 ${
                      score >= step ? strength.barColor : "bg-border-subtle"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <AuthField
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          label="Confirmar senha"
          icon={Lock}
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          showPasswordToggle
          isPasswordVisible={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={isSubmitting}
        />

        {/* Ação Principal */}
        <AuthSubmitButton isLoading={isSubmitting} loadingLabel="Criando conta...">
          Criar conta
        </AuthSubmitButton>

        {/* Divisor */}
        <AuthDivider label="ou cadastre-se com" />

        {/* Botões Sociais Empilhados (Coluna Única) */}
        <div className="space-y-2">
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

        {/* Rodapé */}
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="auth-link font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
}