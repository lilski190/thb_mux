import { getDictionary } from "@/lib/getDictionary";
import { getStatisitcData } from "@/app/actions/dashboardAction";
import BarChart from "@/app/components/charts/barChart";
import LineChart from "@/app/components/charts/lineChart";
import Cloudchart from "@/app/components/charts/CloudChart";
import IconScaleChart from "@/app/components/charts/IconScaleChart";

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
      <div className="py-16 bg-base-200 ">
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
                  />
                </div>
              );
            case "cloud":
              return (
                <div key={item.type + "_" + index}>
                  {dict.statistics.cloud.title}
                  <Cloudchart
                    data={item.data}
                    labels={item.labels}
                    colors={item.colors}
                  />
                </div>
              );
            case "iconScale":
              return (
                <div key={item.type + "_" + index}>
                  {dict.statistics[item.title].title}
                  <IconScaleChart
                    data={item.data}
                    labels={item.labeles}
                    dict={dict.statistics[item.title]}
                  />
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
