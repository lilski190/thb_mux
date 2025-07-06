"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "info",
    message: "",
    duration: 3,
  });

  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);

  const showToast = (type = "info", duration = 3, message = "Message sent") => {
    setToast({ visible: true, type, message, duration });
    setProgress(100);

    const step = 100 / (duration * 20); // 20 steps/sec

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          setToast((t) => ({ ...t, visible: false }));
          return 0;
        }
        return prev - step;
      });
    }, 50); // alle 50ms aktualisieren
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

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

    return (
      <div className="toast toast-top toast-center z-50">
        <div
          className={`alert ${toastColorClass} alert-soft flex flex-col gap-2 p-4`}
        >
          <span>{toast.message}</span>
          <progress
            className={`progress ${progressColorClass} w-full h-2`}
            value={progress}
            max="100"
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
