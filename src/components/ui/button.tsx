import * as React from "react";
import { Loader2 } from "lucide-react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "navy" | "teal" | "secondary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
};

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "rounded-xl",
  "font-semibold",
  "text-sm",
  "transition-all",
  "duration-150",
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
  default:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-xs",
  navy:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-xs",
  teal:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-xs",
  secondary:
    "bg-muted text-muted-foreground hover:bg-slate-200/80 active:bg-slate-200",
  outline:
    "border border-border-subtle bg-background text-foreground hover:bg-muted shadow-xs",
  ghost:
    "text-muted-foreground hover:bg-muted hover:text-foreground",
  danger:
    "bg-danger text-white hover:opacity-90 shadow-xs",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 text-xs font-semibold",
  sm: "h-8.5 px-3 text-xs",
  lg: "h-11 px-5 text-sm font-semibold",
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
      variantClasses[variant] || variantClasses.default,
      sizeClasses[size] || sizeClasses.default,
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
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;