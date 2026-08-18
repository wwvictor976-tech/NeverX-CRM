import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClasses =
  "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:border-white dark:focus:ring-zinc-800";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", type, ...props }, ref) => {
  return <input ref={ref} type={type} className={[inputClasses, className].filter(Boolean).join(" ")} {...props} />;
});

Input.displayName = "Input";
