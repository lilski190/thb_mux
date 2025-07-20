"use client";

import { useEffect } from "react";

export default function useOneSignal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // OneSignalDeferred Queue vorbereiten
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push(async function (OneSignal) {
      await OneSignal.init({
        appId: "c11ed316-7e45-4070-8772-cf10df6cddf4",
        notifyButton: {
          enable: true,
        },
        // Optional: Falls du Safari oder andere Optionen brauchst:
        // safari_web_id: '...',
      });
    });
  }, []);
}
