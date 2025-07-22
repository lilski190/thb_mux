"use client";
import React from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

/**
 * InstallButton-Komponente zeigt einen Button zum Installieren der PWA an,
 * wenn die Installation möglich ist.
 *
 * @returns {JSX.Element|null} JSX-Button zum Installieren der App oder null, wenn nicht installierbar
 */
const InstallButton = ({}) => {
  const { installApp, isInstallable } = usePWAInstall();

  if (!isInstallable) return null;
  return (
    <button onClick={installApp} className="btn btn-info my-5">
      App installieren
    </button>
  );
};

export default InstallButton;
