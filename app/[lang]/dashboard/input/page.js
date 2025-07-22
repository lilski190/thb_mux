import { getDictionary } from "@/lib/getDictionary";
import ArivalFrom from "./arivalForm";
import MealFrom from "./mealForm";
import Modal from "@/app/components/modals/Modal";
import DashboardHeader from "@/app/components/header";
import { getInputData } from "@/app/actions/dashboardAction";

/**
 * InputPage – Asynchrone Next.js Page-Komponente zur Eingabe von Alltagsverhalten (Ankunft & Mahlzeiten).
 *
 * Diese Seite lädt sprachspezifische Inhalte und Eingabedaten des Nutzers (z. B. üblicher Ankunftsweg)
 * und stellt zwei Eingabeformulare in Modals zur Verfügung: eins für die Ankunftsart, eins für Mahlzeiten.
 *
 * @async
 * @function
 * @param {Object} props - Die Properties, die vom Next.js Router übergeben werden.
 * @param {Object} props.params - Die Routenparameter der Seite.
 * @param {string} [props.params.lang="de"] - Die Sprache der Seite (Standard: "de").
 *
 * @returns {JSX.Element} Die vollständig gerenderte Eingabeseite mit Formular-Modals.
 *
 * @example
 * <InputPage params={{ lang: "en" }} />
 */

export default async function InputPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  const inputData = await getInputData();
  let usualArival = { key: "walk", value: 0 };

  if (inputData.usual_arival) {
    usualArival = inputData.usual_arival;
  }

  return (
    <div>
      <DashboardHeader title={dict.routes.input} />

      <div className="py-20 bg-base-200 px-3 grid grid-cols-1 gap-1.5">
        <p className="text text96 mb-5 px-2 mt-10">{dict.input.description}</p>
        <Modal
          id="arival"
          button={dict.input.arivalTitle}
          title={dict.input.arival.title}
          description={dict.input.arival.description}
        >
          <ArivalFrom
            dict={dict.input.arival}
            usual={usualArival}
            toast={dict.toast.arival}
          />
        </Modal>
        <Modal
          id="meal"
          button={dict.input.mealTitel}
          title={dict.input.meal.title}
          description={dict.input.meal.description}
        >
          <MealFrom dict={dict.input.meal} toast={dict.toast.meal} />
        </Modal>
      </div>
    </div>
  );
}
