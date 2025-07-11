import { cookies } from "next/headers";
import "./globals.css";

export const metadata = {
  title: "SustainAble",
  description: "Die Nachhaltigkeitsapp der THB",
};

export default async function RootLayout({ children, params }) {
  const cookieStore = cookies();
  const colorMode = cookieStore.get("colorMode")?.value || "main";

  const lang = params.lang || "de";

  return (
    <html lang={lang}>
      <body className={`${colorMode} bg-base-200`}>{children}</body>
    </html>
  );
}
