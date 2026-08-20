"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const widthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" role="presentation">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className={`relative z-10 flex max-h-[min(720px,calc(100vh-2rem))] w-full flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_24px_64px_-24px_rgba(20,22,25,0.32)] animate-in fade-in zoom-in-95 duration-200 ${widthClasses[maxWidth]}`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id="modal-title" className="text-base font-bold tracking-tight text-foreground">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 rounded-xl border border-border-subtle p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        {footer ? <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-border-subtle bg-muted/20 px-5 py-4 sm:px-6">{footer}</footer> : null}
      </section>
    </div>
  );
}

export default Modal;
