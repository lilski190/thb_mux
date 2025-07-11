// next.config.mjs
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public", // Service‑Worker & Workbox‑Files
  disable: process.env.NODE_ENV === "development", // im Dev‑Mode aus
  register: true, // SW beim first load registrieren
  skipWaiting: true, // neue SW sofort aktiv
  swSrc: "public/sw.js", // dein eigener SW (Push‑Listener)
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // hier kannst du weitere Next‑Optionen ergänzen
};

export default withPWA(nextConfig);
