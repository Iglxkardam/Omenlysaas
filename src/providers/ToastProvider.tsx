import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { logger } from "@/lib/logger";

/* ── Types ── */

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

/* ── Context ── */

export const ToastContext = createContext<ToastContextValue | null>(null);

/* ── Constants ── */

const TOAST_DURATION_MS = 4500;
const MAX_TOASTS = 3;

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "border-[var(--c-success)]/30 bg-[var(--c-success)]/5",
  error: "border-[var(--c-error)]/30 bg-[var(--c-error)]/5",
  warning: "border-[var(--c-warning)]/30 bg-[var(--c-warning)]/5",
  info: "border-[var(--c-accent)]/30 bg-[var(--c-accent)]/5",
};

const VARIANT_ICONS: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const VARIANT_ICON_COLORS: Record<ToastVariant, string> = {
  success: "text-[var(--c-success)]",
  error: "text-[var(--c-error)]",
  warning: "text-[var(--c-warning)]",
  info: "text-[var(--c-accent)]",
};

/* ── Provider ── */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      logger.debug("OMW-TST-010", "Toast shown", { id, variant, message });

      setToasts((prev) => {
        const next = [...prev, { id, message, variant }];
        return next.length > MAX_TOASTS ? next.slice(-MAX_TOASTS) : next;
      });

      setTimeout(() => removeToast(id), TOAST_DURATION_MS);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const Icon = VARIANT_ICONS[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 backdrop-blur-md shadow-lg max-w-[380px] ${VARIANT_STYLES[t.variant]}`}
              >
                <Icon
                  size={18}
                  className={`mt-0.5 shrink-0 ${VARIANT_ICON_COLORS[t.variant]}`}
                />
                <p className="text-sm text-[var(--c-text)] leading-snug flex-1">
                  {t.message}
                </p>
                <button
                  onClick={() => removeToast(t.id)}
                  className="shrink-0 text-[var(--c-text-dim)] hover:text-[var(--c-text)] transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
