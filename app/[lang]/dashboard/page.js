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

export default async function DashboardPage({ params }) {
  const lang = (await params.lang) || "de";
  const dict = await getDictionary(lang);

  const homeData = await getHomeData();
  if (homeData.personal.lang != lang) {
    redirect(`/${homeData.personal.lang}/dashboard`);
  }
  if (homeData?.personal?.colorMode) {
    //   await setColorMode(homeData?.personal?.colorMode);
  }

  return (
    <div>
      <DashboardHeader title={dict.routes.home} />

      <div className="py-20 bg-base-200 px-3 grid grid-cols-1 gap-1.5">
        <MedalModal
          count={homeData.streak}
          title={dict.home.streak.title}
          description={dict.home.streak.options[homeData.streak]}
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
          />
        </Link>
      </div>
    </div>
  );
}
