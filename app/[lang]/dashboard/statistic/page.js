import { getDictionary } from "@/lib/getDictionary";
import { getStatisitcData } from "@/app/actions/dashboardAction";
import BarChart from "@/app/components/charts/barChart";
import LineChart from "@/app/components/charts/lineChart";
import Cloudchart from "@/app/components/charts/CloudChart";
import IconScaleChart from "@/app/components/charts/IconScaleChart";
import DashboardHeader from "@/app/components/header";
import StatisticModal from "@/app/components/cards/StatisticModal";

export default async function StatisticPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const statisticData = await getStatisitcData();
  return (
    <div>
      <DashboardHeader title={dict.routes.statistic} />
      <div className="py-20 bg-base-200 px-3 grid grid-cols-1 gap-1.5">
        {statisticData.data.map((item, index) => {
          switch (item.type) {
            case "barchart":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal title={dict.statistics.bar.title}>
                    <BarChart
                      ChartData={item.data}
                      dict={dict.statistics.bar}
                      labels={item.label}
                    />
                  </StatisticModal>
                </div>
              );
            case "linechart":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal title={dict.statistics.line.title}>
                    <LineChart
                      ChartData={item.data}
                      dict={dict.statistics.line}
                      labels={item.label}
                    />
                  </StatisticModal>
                </div>
              );
            case "cloud":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal title={dict.statistics.cloud.title}>
                    <Cloudchart
                      data={item.data}
                      labels={item.labels}
                      colors={item.colors}
                    />
                  </StatisticModal>
                </div>
              );
            case "iconScale":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal title={dict.statistics[item.title].title}>
                    <IconScaleChart
                      data={item.data}
                      labels={item.labeles}
                      dict={dict.statistics[item.title]}
                    />
                  </StatisticModal>
                </div>
              );

            default:
              return (
                <div key={item.type + "_" + index}>
                  {dict.general.notImplementet}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}
