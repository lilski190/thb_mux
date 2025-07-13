import { cookies } from "next/headers";
import "./globals.css";
import SystemLanguage from "./systemLang";

export const metadata = {
  title: "SustainAble",
  description: "Die Nachhaltigkeitsapp der THB",
  manifest: "/manifest.json", // manifest einbinden
};

export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies();
  const colorMode = cookieStore.get("colorMode")?.value || "main";
  const lang = params.lang || "de";

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${colorMode} bg-base-200`}>
        <SystemLanguage />
        {children}
      </body>
    </html>
  );
}
