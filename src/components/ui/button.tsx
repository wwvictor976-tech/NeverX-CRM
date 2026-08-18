import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "teal" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
};

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "rounded-xl",
  "font-medium",
  "text-sm",
  "transition-colors",
  "duration-150",
  "cursor-pointer",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-teal-700",
  "focus-visible:ring-offset-2",
].join(" ");

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-xs",
  teal:
    "bg-teal-700 text-white hover:bg-teal-800 shadow-xs",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200/80",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 shadow-xs",
  ghost:
    "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 text-xs font-semibold",
  sm: "h-8.5 px-3 text-xs",
  lg: "h-11 px-5 text-sm font-semibold",
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...props} />;
}