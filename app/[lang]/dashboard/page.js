import { getDictionary } from "@/lib/getDictionary";
import { getHomeData } from "@/app/actions/dashboardAction";

export default async function DashboardPage({ params }) {
  const lang = params.lang || "de";
  const dict = await getDictionary(lang);

  const homeData = await getHomeData();

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold fixed">
        <div>logo</div>
        {dict.routes.home}
      </h1>
      <pre>{JSON.stringify(homeData, null, 2)}</pre>
    </div>
  );
}
