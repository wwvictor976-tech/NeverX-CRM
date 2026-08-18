import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClasses = [
  "flex",
  "h-10",
  "w-full",
  "rounded-xl",
  "border",
  "border-slate-300",
  "bg-slate-50/60",
  "px-3.5",
  "py-2",
  "text-sm",
  "font-normal",
  "text-slate-900",
  "placeholder:text-slate-500",
  "shadow-2xs",
  "transition-colors",
  "duration-150",
  "hover:border-slate-400",
  "focus:bg-white",
  "focus:border-teal-700",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-teal-700/20",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "disabled:bg-slate-100",
].join(" ");

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
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