import { getDictionary } from "@/lib/getDictionary";
import BottomNav from "./BottomNav";
import { cookies } from "next/headers";

/**
 * Layout-Komponente für das Dashboard mit Sprach- und Farbmodus-Unterstützung.
 *
 * Lädt das Wörterbuch basierend auf der Sprachkennung aus den URL-Parametern,
 * liest den Farbmodus aus den Cookies aus und rendert die Hauptnavigation
 * sowie die eingebetteten Kind-Komponenten.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Die eingebetteten Komponenten bzw. Seiteninhalte.
 * @param {Object} props.params - URL-Parameter (z.B. Sprachkennung).
 * @param {string} [props.params.lang] - Sprachkennung, z.B. 'de' oder 'en'.
 *
 * @returns {JSX.Element} Layout mit BottomNav und Seiteninhalt.
 */
export default async function Layout({ children, params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const cookiecolor = cookieStore.get("colorMode")?.value || "main";

  return (
    <div className="bg-base-200 h-screen">
      <nav aria-label="Hauptnavigation">
        <BottomNav lang={lang} dict={dict} mode={cookiecolor} />
      </nav>
      <div className="">{children}</div>
    </div>
  );
}
