import * as React from "react";
import { Loader2 } from "lucide-react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // Removidas cores legadas (navy/teal) e adicionadas variantes específicas do NeverX
  variant?: "default" | "accent" | "social" | "secondary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
};

// Base ajustada: duration-200 (mais suave) e rounded-xl (padrão NeverX para botões e inputs)
const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "rounded-xl",
  "font-medium", // Ajustado para medium para não pesar tanto quanto semibold na UI limpa
  "transition-all",
  "duration-200",
  "cursor-pointer",
  "select-none",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "active:scale-[0.98]",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
].join(" ");

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  // Botão Escuro Principal (ex: Entrar, Criar conta)
  default:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  
  // Botão Dourado de Destaque (caso precise no dashboard)
  accent:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm",
  
  // Botões do Google/Apple
  social:
    "border border-border bg-card text-foreground hover:bg-muted active:bg-border-subtle",
  
  // Ações secundárias
  secondary:
    "bg-muted text-muted-foreground hover:text-foreground hover:bg-border-subtle",
  
  // Contornos e Fantasmas (para filtros e ações menores)
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
  
  // Destrutivo
  danger:
    "bg-danger text-white hover:opacity-90",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-6 text-sm", // O tamanho exato usado nos botões de Auth (h-11)
  icon: "h-10 w-10", // Adicionado para botões apenas com ícone
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      type = "button",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {/* Se estiver carregando, o conteúdo fica levemente opaco para destacar o spinner */}
        <span className={`inline-flex items-center gap-2 ${isLoading ? 'opacity-70' : ''}`}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;