import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const labelClasses = [
  "text-xs",
  "font-semibold",
  "leading-none",
  "tracking-tight",
  "text-slate-900",
  "dark:text-slate-100",
  "select-none",
  "peer-disabled:cursor-not-allowed",
  "peer-disabled:opacity-60",
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