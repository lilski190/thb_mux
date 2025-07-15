"use client";
import React from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const InstallButton = ({}) => {
  const { installApp, isInstallable } = usePWAInstall();

  if (!isInstallable) return null;
  return (
    <button onClick={installApp} className="btn btn-primary my-5">
      App installieren
    </button>
  );
};

export default InstallButton;
