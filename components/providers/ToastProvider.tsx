"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Toast, ToastType } from "@/components/ui/Toast";
import { AnimatePresence } from "framer-motion";

interface ToastContextType {
  addToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: ToastType; message: string; duration?: number }>
  >([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, message, duration }]);
    },
    [],
  );

  const success = useCallback(
    (msg: string, dur?: number) => addToast("success", msg, dur),
    [addToast],
  );
  const error = useCallback(
    (msg: string, dur?: number) => addToast("error", msg, dur),
    [addToast],
  );
  const info = useCallback(
    (msg: string, dur?: number) => addToast("info", msg, dur),
    [addToast],
  );
  const warning = useCallback(
    (msg: string, dur?: number) => addToast("warning", msg, dur),
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, success, error, info, warning }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-end">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <Toast key={toast.id} {...toast} onDismiss={removeToast} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
