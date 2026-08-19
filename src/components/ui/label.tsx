import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const labelClasses = [
  "text-sm", // Ajustado de xs para sm (melhor legibilidade, conforme o design)
  "font-medium", // "Medium" mantém a elegância sem pesar tanto quanto o "semibold"
  "leading-none",
  "text-foreground", // Usa a nossa variável base (#111111)
  "select-none",
  "peer-disabled:cursor-not-allowed",
  "peer-disabled:opacity-50", // Padrão de 50% de opacidade para itens desabilitados
].join(" ");

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={[labelClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export default Label;