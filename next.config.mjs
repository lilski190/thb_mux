// next.config.mjs
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public", // Service‑Worker & Workbox‑Files
  disable: process.env.NODE_ENV === "development", // im Dev‑Mode aus
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // hier kannst du weitere Next‑Optionen ergänzen
};

export default withPWA(nextConfig);
