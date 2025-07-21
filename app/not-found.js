import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

/**
 * Asynchrone "Not Found" (404) Fehlerseite für Next.js.
 * Zeigt eine lokalisierte Fehlernachricht, ein Bild und einen Link zurück zur Startseite.
 *
 * @async
 * @function
 * @param {Object} props - Eigenschaften, die von Next.js übergeben werden.
 * @param {Object} props.params - Routenparameter, z. B. Sprache.
 * @param {string} [props.params.lang="de"] - Sprachcode, standardmäßig "de".
 *
 * @returns {Promise<JSX.Element>} Eine visuell gestaltete 404-Seite mit Text aus dem Sprachwörterbuch.
 */
export default async function NotFound({ params }) {
  const param = await params;
  const lang = param?.lang || "de";
  const dict = await getDictionary(lang);
  let altText = dict.errors.notFoundAltText || "Page not found";
  let title = dict.errors.notFound || "404 Not Found";
  let link = dict.errors.LinkNotFound || "Back to homepage";
  let description =
    dict.errors.notFoundDescription ||
    "This page does not exist. Please check the URL or return to the homepage.";

  return (
    <div className="bg-base-200 h-screen">
      <section
        className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-center justify-start h-screen w-screen"
        role="alert"
        aria-live="assertive"
        aria-label={title}
      >
        <img
          src="/notfound.gif"
          alt={altText}
          className="w-full mt-6"
          aria-hidden="true"
        />
        <header className="px-10 mt-4 w-full">
          <h1 className="title titleBig text-center" tabIndex={-1}>
            {title}
          </h1>
        </header>
        <p className="px-10 text96 text-center w-full mt-3 my-6">
          {description}
        </p>
        <Link href={`/`} className="btn btn-primary mx-10">
          {link}
        </Link>
      </section>
    </div>
  );
}
