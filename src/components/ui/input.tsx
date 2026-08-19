import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClasses = [
  "flex",
  "h-10",
  "w-full",
  "rounded-xl",
  "border",
  "border-border-subtle",
  "bg-background",
  "px-3.5",
  "py-2",
  "text-sm",
  "font-normal",
  "text-foreground",
  "placeholder:text-muted-foreground",
  "shadow-xs",
  "transition-colors",
  "duration-150",
  "hover:border-border",
  "focus:border-primary",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-ring/20",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "disabled:bg-muted",
].join(" ");

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={[inputClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;