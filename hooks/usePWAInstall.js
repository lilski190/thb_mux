import { useEffect, useState } from "react";

/**
 * Custom React Hook zur Verwaltung der PWA-Installationsaufforderung.
 *
 * Dieser Hook registriert einen Listener für das `beforeinstallprompt`-Event
 * und ermöglicht dem Benutzer, die App manuell zu installieren, wenn sie dafür geeignet ist.
 *
 * @function usePWAInstall
 * @returns {Object} Ein Objekt mit zwei Eigenschaften:
 * @returns {() => Promise<void>} installApp - Eine Funktion, die den Installationsdialog auslöst.
 * @returns {boolean} isInstallable - Gibt an, ob die App aktuell installierbar ist.
 *
 * @example
 * const { installApp, isInstallable } = usePWAInstall();
 * return isInstallable ? <button onClick={installApp}>Install App</button> : null;
 */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
      } else {
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return { installApp, isInstallable };
}
