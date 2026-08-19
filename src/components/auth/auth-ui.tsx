"use client";

import * as React from "react";
import type { SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, Eye, EyeOff, type LucideIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function GoogleIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function AppleIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 fill-current text-foreground ${className}`} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.19.66-2.88 1.47-.62.72-1.17 1.88-1.02 3.01 1.1.08 2.24-.56 2.91-1.38z" />
    </svg>
  );
}

export function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1 text-[11px] font-medium text-danger"
        >
          <AlertCircle className="h-3 w-3 shrink-0 text-danger" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

export const AuthField = React.forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  { label, icon: Icon, error, id, className = "", showPasswordToggle, isPasswordVisible, onTogglePassword, ...props },
  ref,
) {
  return (
    <div className="space-y-1 text-left">
      <label htmlFor={id} className="text-[11px] font-medium text-foreground">
        {label}
      </label>
      <div
        className={`group relative flex items-center rounded-xl border bg-card transition-all duration-200 ${
          error
            ? "border-danger focus-within:border-danger focus-within:ring-1 focus-within:ring-danger/20"
            : "border-input focus-within:border-accent focus-within:ring-1 focus-within:ring-ring"
        }`}
      >
        <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          className={`h-10 w-full rounded-xl bg-transparent pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none ${
            showPasswordToggle ? "pr-9" : "pr-3"
          } ${className}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            tabIndex={-1}
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2.5 rounded-md p-1 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {isPasswordVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
});

AuthField.displayName = "AuthField";

export function SocialButton({ children, className = "", ...props }: ButtonProps) {
  return (
    <Button
      variant="social"
      size="default"
      className={`w-full relative h-9 text-xs ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

interface AuthSubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingLabel?: string;
}

export function AuthSubmitButton({
  isLoading,
  loadingLabel = "Entrando...",
  children,
  className = "",
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="default"
      size="default"
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
      className={`w-full relative group h-10 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span>{loadingLabel}</span>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="h-4 w-4 absolute right-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center justify-center py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border-subtle" />
      </div>
      <span className="relative bg-card px-2.5 text-[10px] font-normal text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function AuthErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-danger/20 bg-danger/10 p-2.5 text-xs font-medium text-danger">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
      <span>{message}</span>
    </div>
  );
}