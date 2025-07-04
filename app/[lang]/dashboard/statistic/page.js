import { getDictionary } from "@/lib/getDictionary";
import { getStatisitcData } from "@/app/actions/dashboardAction";

export default async function StatisticPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const statisticData = await getStatisitcData();
  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.routes.statistic}</h1>
      <pre>{JSON.stringify(statisticData, null, 2)}</pre>
    </div>
  );
}
