"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "info", // info | success | warning | error | neutral
    message: "",
    duration: 3, // Sekunden
  });

  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);

  const hideToast = useCallback(() => {
    clearInterval(intervalRef.current);
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const showToast = useCallback(
    (type = "info", duration = 3, message = "Message sent") => {
      setToast({ visible: true, type, message, duration });
      setProgress(100);

      const step = 100 / (duration * 20); // 20 Schritte pro Sekunde

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            hideToast();
            return 0;
          }
          return prev - step;
        });
      }, 50);
    },
    [hideToast]
  );

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && toast.visible) {
        hideToast();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [toast.visible, hideToast]);

  const renderToast = () => {
    if (!toast.visible) return null;

    const toastColorClass =
      {
        info: "alert-info",
        success: "alert-success",
        warning: "alert-warning",
        error: "alert-error",
        neutral: "alert-neutral",
      }[toast.type] || "alert-info";

    const progressColorClass =
      {
        info: "progress-info",
        success: "progress-success",
        warning: "progress-warning",
        error: "progress-error",
        neutral: "progress-neutral",
      }[toast.type] || "progress-info";

    const role = toast.type === "error" ? "alert" : "status";
    const ariaLive = toast.type === "error" ? "assertive" : "polite";

    return (
      <div
        className="toast toast-top toast-center z-50"
        aria-live={ariaLive}
        aria-atomic="true"
      >
        <div
          className={`alert ${toastColorClass} alert-soft flex flex-col gap-2 p-4 relative`}
          role={role}
        >
          <button
            onClick={hideToast}
            aria-label="Benachrichtigung schließen"
            className="absolute top-2 right-2 text-base-content hover:text-error focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <span>{toast.message}</span>

          <progress
            className={`progress ${progressColorClass} w-full h-2`}
            value={progress}
            max="100"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {renderToast()}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
