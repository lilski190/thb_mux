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
  let rtl = false;
  if (lang === "ar") {
    rtl = true;
  }
  return (
    <div className="w-screen">
      <DashboardHeader title={dict.routes.statistic} />
      <section
        aria-labelledby="statistic-content"
        className="py-24 bg-base-200 px-3 grid grid-cols-1 gap-4 min-h-screen gap-2 w-screen"
      >
        {statisticData.data.map((item, index) => {
          switch (item.type) {
            case "barchart":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal
                    title={dict.statistics.bar.title}
                    sr={dict.statistics.bar.sr_description}
                    id={dict.statistics.bar.id}
                  >
                    <BarChart
                      ChartData={item.data}
                      dict={dict.statistics.bar}
                      labels={item.label}
                      rtl={rtl}
                    />
                  </StatisticModal>
                </div>
              );
            case "linechart":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal
                    title={dict.statistics.line.title}
                    sr={dict.statistics.line.sr_description}
                    id={dict.statistics.line.id}
                  >
                    <LineChart
                      ChartData={item.data}
                      dict={dict.statistics.line}
                      labels={item.label}
                      rtl={rtl}
                    />
                  </StatisticModal>
                </div>
              );
            case "cloud":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal
                    title={dict.statistics.cloud.title}
                    sr={dict.statistics.cloud.sr_description}
                    id={dict.statistics.cloud.id}
                  >
                    <Cloudchart
                      data={item.data}
                      labels={item.labels}
                      colors={item.colors}
                      dict={dict.statistics.cloud}
                    />
                  </StatisticModal>
                </div>
              );
            case "iconScale":
              return (
                <div key={item.type + "_" + index}>
                  <StatisticModal
                    title={dict.statistics[item.title].title}
                    sr={dict.statistics[item.title].sr_description}
                    id={dict.statistics[item.title].id}
                  >
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
      </section>
    </div>
  );
}
