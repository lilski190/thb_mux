"use client";
import useOneSignal from "@/hooks/useOneSignal";

/**
 * React-Komponente zur Initialisierung von OneSignal.
 *
 * Diese Komponente verwendet den Custom Hook `useOneSignal`, um
 * OneSignal für Push-Benachrichtigungen zu initialisieren.
 *
 * Es gibt keinen sichtbaren Output, daher rendert die Komponente `null`.
 *
 * @component
 * @returns {null} Kein sichtbarer Output
 */
export default function OneSignalInit() {
  useOneSignal();
  return null;
}
