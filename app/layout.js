// app/[lang]/layout.js  (oder Root‑Layout, je nach Struktur)
import { cookies } from "next/headers";
import "./globals.css";

export const metadata = {
  title: "SustainAble",
  description: "Die Nachhaltigkeitsapp der THB",
  manifest: "/manifest.json", // ← hier
  themeColor: "#000000", // ersetzt <meta name="theme-color" …>
  icons: {
    icon: "/icons/icon-192.png", // normale Favicon/Android‑Icon
    apple: "/icons/icon-192.png", // iOS‑Home‑Screen‑Icon
  },
};

export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies();
  const colorMode = cookieStore.get("colorMode")?.value || "main";
  const lang = params.lang || "de";

  return (
    <html lang={lang}>
      <body className={`${colorMode} bg-base-200`}>{children}</body>
    </html>
  );
}
