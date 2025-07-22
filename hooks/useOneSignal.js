"use client";

import { useEffect } from "react";

/**
 * React-Hook zur Initialisierung von OneSignal auf der Client-Seite.
 *
 * Dieser Hook fügt einen asynchronen Initialisierungs-Callback zur
 * globalen `window.OneSignalDeferred` Queue hinzu, um OneSignal mit
 * der angegebenen App-ID zu starten. Er sollte nur einmal bei Mount
 * aufgerufen werden und funktioniert ausschließlich im Browser.
 *
 * @function useOneSignal
 * @returns {void} Dieser Hook gibt nichts zurück und führt nur einen Seiteneffekt aus.
 */
export default function useOneSignal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push(async function (OneSignal) {
      await OneSignal.init({
        appId: "c11ed316-7e45-4070-8772-cf10df6cddf4",
        notifyButton: {
          enable: true,
        },
      });
    });
  }, []);
}
