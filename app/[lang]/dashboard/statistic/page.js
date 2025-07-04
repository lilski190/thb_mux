import { getDictionary } from "@/lib/getDictionary";
import { getStatisitcData } from "@/app/actions/dashboardAction";
import BarChart from "@/app/components/charts/barChart";
import LineChart from "@/app/components/charts/lineChart";

import { Bar } from "react-chartjs-2";
export default async function StatisticPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const statisticData = await getStatisitcData();
  return (
    <div>
      <h1 className="mb-5  font-bold fixed bg-base-200 w-full">
        <div>logo</div>
        {dict.routes.statistic}
      </h1>
      <div className="py-16 bg-base-200">
        {statisticData.data.map((item, index) => {
          switch (item.type) {
            case "barchart":
              return (
                <div key={item.type + "_" + index}>
                  {dict.statistics.bar.title}
                  <BarChart
                    ChartData={item.data}
                    dict={dict.statistics.bar}
                    labels={item.label}
                  />
                </div>
              );
            case "linechart":
              return (
                <div key={item.type + "_" + index}>
                  {dict.statistics.line.title}
                  <LineChart
                    ChartData={item.data}
                    dict={dict.statistics.line}
                    labels={item.label}
                    color="var(--color-primary)"
                  />
                </div>
              );
            case "cloud":
              return <div key={item.type + "_" + index}>CLOUDCHART</div>;
            case "iconScale":
              return (
                <div key={item.type + "_" + index}>
                  ICONSCALE
                  {JSON.stringify(item)}
                </div>
              );

            default:
              return (
                <div key={item.type + "_" + index}>
                  TYPE NOT FOUND {item.type}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}
