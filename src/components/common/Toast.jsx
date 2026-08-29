import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = { success: CheckCircle2, error: XCircle, info: Info };
const STYLES = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  error: "bg-rose-50 border-rose-200 text-rose-700",
  info: "bg-indigo-50 border-indigo-200 text-indigo-700",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <div key={t.id} className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm ${STYLES[t.type]}`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span>{t.message}</span>
              <button onClick={() => dismiss(t.id)} className="ml-2 opacity-60 hover:opacity-100">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}