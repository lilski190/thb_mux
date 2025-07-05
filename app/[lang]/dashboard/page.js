import { getDictionary } from "@/lib/getDictionary";
import { getHomeData } from "@/app/actions/dashboardAction";
import Link from "next/link";

export default async function DashboardPage({ params }) {
  const lang = params.lang || "de";
  const dict = await getDictionary(lang);

  const homeData = await getHomeData();

  return (
    <div>
      <h1 className="mb-5 font-bold fixed bg-base-200 w-full">
        <div>logo</div>
        {dict.routes.home}
      </h1>
      <div className="py-16 bg-base-200">
        <div className="bg-primary/20 m-5">
          TODO ICON alle 5 Tage größer werden
          <div>{homeData.streak}</div>
          <div>{dict.home.streak.title}</div>
          <div>{dict.home.streak.options[homeData.streak]}</div>
        </div>
        <Link href={`/${lang}/dashboard/statistic`}>
          <div className="bg-primary/20 m-5">
            <div> TODO ICON Zu Verkehrsmittel : {homeData.arival}</div>
            <div>{dict.home.arivalTitel}</div>
            <div>{dict.home.arival[homeData.arival]}</div>
          </div>
        </Link>
        <Link href={`/${lang}/dashboard/statistic`}>
          <div className="bg-primary/20 m-5">
            <div> TODO ICON Zu Meal : {homeData.meal}</div>
            <div>{dict.home.mealTitel}</div>
            <div>{dict.home.meal[homeData.meal]}</div>
          </div>
        </Link>
        <Link href={`/${lang}/dashboard/statistic`}>
          <div className="bg-primary/20 m-5">
            <div>
              TODO ICON mini statistik für :
              {JSON.stringify(homeData.comparrison)}
            </div>
            <div>{dict.home.fbTitel}</div>
            <div>TODO: Ausrechnen welcher FB am besten ist und text mappen</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
