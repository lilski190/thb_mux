import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  //TODO: get system lang if not in list -> default = de
  //When loaded Lang -> redirect to lang/
  return (
    <div>
      LOGO
      <h1 className="mb-5 text-5xl font-bold">{dict.general.projectName}</h1>
    </div>
  );
}
