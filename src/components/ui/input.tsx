import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Ícone ou elemento para ser exibido no lado esquerdo do input */
  leftIcon?: React.ReactNode;
  /** Ícone, botão (ex: mostrar senha) ou elemento no lado direito */
  rightIcon?: React.ReactNode;
}

// Transformei o array em uma função ou variável interna do componente
// para lidarmos melhor com o padding caso existam ícones.
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", leftIcon, rightIcon, ...props }, ref) => {
    
    const baseClasses = [
      "flex",
      "h-11", // Aumentado para 44px, igualando à altura dos botões primários (lg)
      "w-full",
      "rounded-xl",
      "border",
      "border-input", // Usando a variável semântica que criamos
      "bg-card", // Fundo branco
      "text-sm",
      "font-medium",
      "text-foreground",
      "placeholder:text-muted-foreground",
      "transition-colors",
      "duration-200",
      "hover:border-border",
      "focus-visible:border-accent", // Borda dourada no focus
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring", // Anel de focus dourado
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "disabled:bg-muted",
    ].filter(Boolean).join(" ");

    // Se não tiver ícones, renderiza um input simples (com padding padrão)
    if (!leftIcon && !rightIcon) {
      return (
        <input
          ref={ref}
          type={type}
          className={`${baseClasses} px-3 py-2 ${className}`}
          {...props}
        />
      );
    }

    // Se tiver ícones, envolvemos em uma div relativa para posicioná-los
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            ${baseClasses}
            py-2
            ${leftIcon ? "pl-10" : "pl-3"} 
            ${rightIcon ? "pr-10" : "pr-3"}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center justify-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;