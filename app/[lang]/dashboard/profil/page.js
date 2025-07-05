import { getDictionary } from "@/lib/getDictionary";
import { getProfilData } from "@/app/actions/dashboardAction";
import NotificationFrom from "./notificationForm";
import Record from "@/app/components/medals/Record";
import Modal from "@/app/components/modals/Modal";

export default async function ProfilPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const profilData = await getProfilData();

  return (
    <div>
      <h1 className="mb-5 font-bold fixed bg-base-200 w-full">
        <div>logo</div>
        {dict.routes.profil}
      </h1>
      <div className="py-16 bg-base-200">
        <div>TODO picture (cloud?): {profilData.profile_picture}</div>
        <div className="bg-primary/20 m-5">
          {dict.profil.welcome} {profilData.name}
          {profilData.medal.type === "record" ? (
            <div className="flex">
              <Record
                icon={profilData.medal.icon}
                duration={profilData.medal.duration}
                dict={dict.profil.record}
              />
            </div>
          ) : (
            <div>{dict.general.notImplementet}</div>
          )}
        </div>
        <div>{dict.profil.settings}</div>
        <Modal
          id="notofication"
          button={dict.profil.notifications}
          title={dict.profil.notificationForm.title}
          description={dict.profil.notificationForm.description}
        >
          <NotificationFrom dict={dict.profil.notificationForm} />
        </Modal>
        <div>
          {dict.profil.darkmode} TODO: bei native app speichern auf dem Gerät
          als voreinstellung
        </div>
      </div>
    </div>
  );
}
