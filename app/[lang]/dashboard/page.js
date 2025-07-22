import { getDictionary } from "@/lib/getDictionary";
import { getHomeData } from "@/app/actions/dashboardAction";
import Link from "next/link";
import { ICONS } from "@/lib/globals";
import DashboardHeader from "@/app/components/header";
import MedalModal from "@/app/components/cards/MedalModal";
import HomeInputModal from "@/app/components/cards/HomeInputModal";
import HomeStatisticModal from "@/app/components/cards/HomeStatisticModal";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * DashboardPage – Asynchrone Next.js Page-Komponente für das Dashboard.
 *
 * Diese Seite lädt sprachspezifische Inhalte (über ein Dictionary),
 * sowie personalisierte Dashboard-Daten des Nutzers (z.B. Streak, Ankunft, Mahlzeiten, Vergleichswerte),
 * und rendert darauf basierende Komponenten wie Modals und Statistiken.
 *
 * @async
 * @function
 * @param {Object} props - Die Properties, die vom Next.js Router übergeben werden.
 * @param {Object} props.params - Die Routenparameter der Seite.
 *
 * @returns {JSX.Element} Die gerenderte Dashboard-Seite mit Header, Medaillenanzeige und Eingabe-/Statistikmodals.
 *
 * @example
 * // Beispielhafte Verwendung durch Next.js Routing:
 * <DashboardPage params={{ lang: "de" }} />
 */
export default async function DashboardPage({ params }) {
  const param = await params;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang = cookieLang || "de";
  const dict = await getDictionary(lang);

  const homeData = await getHomeData();

  return (
    <div>
      <DashboardHeader title={dict.routes.home} />

      <section
        aria-labelledby="dashboard-content"
        className="py-20 bg-base-200 px-3 flex flex-col justify-evenly min-h-screen gap-2 max-w-screen"
      >
        <MedalModal
          count={homeData.streak}
          title={dict.home.streak.title}
          description={dict.home.streak.options[homeData.streak]}
          sr={dict.home.streak.sr_title}
          allOptions={dict.home.streak.options}
        />
        <Link href={`/${lang}/dashboard/statistic`}>
          <HomeInputModal
            icon={homeData.arival}
            title={dict.home.arivalTitel}
            description={dict.home.arival[homeData.arival]}
          />
        </Link>
        <Link href={`/${lang}/dashboard/statistic`}>
          <HomeInputModal
            icon={homeData.meal}
            title={dict.home.mealTitel}
            description={dict.home.meal[homeData.meal]}
          />
        </Link>
        <Link href={`/${lang}/dashboard/statistic`}>
          <HomeStatisticModal
            data={homeData.comparrison}
            title={dict.home.fbTitel}
            description={dict.home.fbs}
            sr={dict.home.sr_statistic}
          />
        </Link>
      </section>
    </div>
  );
}
