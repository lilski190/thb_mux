import { cookies } from "next/headers";
import "./globals.css";
import SystemLanguage from "./systemLang";
import OneSignalInit from "./components/OneSignalInit";

/**
 * Metadaten für die HTML-Seite (verwendet von Next.js für `<head>`).
 * @type {{ title: string, description: string, manifest: string }}
 */
export const metadata = {
  title: "SustainAble",
  description: "Die Nachhaltigkeitsapp der THB",
  manifest: "/manifest.json",
};

/**
 * Root-Layout-Komponente für die gesamte App.
 * Wird von Next.js verwendet, um alle Seiten innerhalb eines gemeinsamen HTML-Rahmens zu rendern.
 *
 * @async
 * @function
 * @param {Object} props - Eigenschaften, die von Next.js übergeben werden.
 * @param {React.ReactNode} props.children - Die Kind-Komponenten, die im Layout gerendert werden.
 * @param {Object} props.params - Routen-Parameter, z. B. die Sprache.
 * @param {string} [props.params.lang="de"] - Sprachparameter aus der URL, Standardwert ist "de".
 *
 * @returns {Promise<JSX.Element>} Die HTML-Struktur für die gerenderte Seite.
 */
export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies();
  const colorMode = cookieStore.get("colorMode")?.value || "main";
  const dir = cookieStore.get("dir")?.value || "ltr";
  const lang = params.lang || "de";

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></script>
      </head>
      <body className={`${colorMode} bg-base-200`}>
        <OneSignalInit />
        <SystemLanguage current={lang} />
        {children}
      </body>
    </html>
  );
}
