"use client";
import useOneSignal from "@/hooks/useOneSignal";
export default function OneSignalInit() {
  useOneSignal();
  return null; // kein sichtbarer Output notwendig
}
