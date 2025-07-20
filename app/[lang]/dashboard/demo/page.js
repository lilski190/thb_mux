"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [permission, setPermission] = useState(Notification.permission);

  const askPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const showTestNotification = () => {
    if (permission === "granted") {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.showNotification("Test-Nachricht", {
            body: "Das ist eine Test-Push-Nachricht",
            icon: "/icons/icon-192x192.png", // optional
          });
        }
      });
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log("Service Worker bereit");
      });
    }
  }, []);

  return (
    <div>
      <h1>Push Notification Test</h1>
      <button onClick={askPermission}>Berechtigung anfragen</button>
      <button onClick={showTestNotification}>Testnachricht senden</button>
    </div>
  );
}
