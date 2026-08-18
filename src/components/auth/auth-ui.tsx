"use client";

import * as React from "react";
import type { SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, type LucideIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*                                Brand Icons                                 */
/* -------------------------------------------------------------------------- */

export function GoogleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className || ""}`} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`h-4 w-4 shrink-0 fill-current ${className || ""}`} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Field error                                 */
/* -------------------------------------------------------------------------- */

export function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-red-700"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Auth field                                 */
/* -------------------------------------------------------------------------- */

interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  /** Renders an eye toggle button on the right of the field. */
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

export const AuthField = React.forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  { label, icon: Icon, error, id, className = "", showPasswordToggle, isPasswordVisible, onTogglePassword, ...props },
  ref,
) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-tight text-slate-800">
        {label}
      </label>
      <div
        className={`group relative flex items-center rounded-xl border bg-slate-50 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 ${
          error
            ? "border-red-400 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/15"
            : "border-slate-300 hover:border-slate-400 focus-within:border-teal-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-700/20"
        }`}
      >
        <Icon className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-teal-700" />
        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          className={`h-11 w-full bg-transparent pl-10 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none ${
            showPasswordToggle ? "pr-10" : "pr-3.5"
          } ${className}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            tabIndex={-1}
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none"
          >
            {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*                              Social / buttons                              */
/* -------------------------------------------------------------------------- */

export function SocialButton({ children, className = "", ...props }: ButtonProps) {
  return (
    <Button variant="outline" size="lg" className={`group w-full ${className}`} {...props}>
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
  loadingLabel = "Processando...",
  children,
  className = "",
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button type="submit" variant="default" size="lg" disabled={isLoading} className={`group w-full ${className}`} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </>
      )}
    </Button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Divider / errors                              */
/* -------------------------------------------------------------------------- */

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center py-0.5">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />
      <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300" />
    </div>
  );
}

export function AuthErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-medium text-red-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
      <span>{message}</span>
    </div>
  );
}
