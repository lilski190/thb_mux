import { getDictionary } from "@/lib/getDictionary";

/**
 * Asynchrone React-Komponente für die Inbox-Seite.
 *
 * Lädt das Wörterbuch basierend auf der Sprachkennung aus den URL-Parametern
 * und zeigt einen Titel und einen Hinweis auf eine noch nicht implementierte Funktion an.
 *
 * @param {Object} props
 * @param {Object} props.params - URL-Parameter der Seite.
 * @param {string} [props.params.lang] - Sprachkennung, z.B. 'de' oder 'en'. Standard ist 'de'.
 *
 * @returns {JSX.Element} JSX-Element mit Überschrift und Info-Text.
 */
export default async function InboxPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.routes.inpox}</h1>
      <p>{dict.general.notImplementet}</p>
    </div>
  );
}
