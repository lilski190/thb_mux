import { getDictionary } from "@/lib/getDictionary";
import { getProfilData } from "@/app/actions/dashboardAction";
import NotificationFrom from "./notificationForm";

export default async function ProfilPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const profilData = await getProfilData();

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold fixed">
        <div>logo</div>
        {dict.routes.profil}
      </h1>
      <h1></h1>
      <pre>{JSON.stringify(profilData, null, 2)}</pre>
      <NotificationFrom />
    </div>
  );
}
