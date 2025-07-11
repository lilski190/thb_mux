import { getDictionary } from "@/lib/getDictionary";
import { getProfilData } from "@/app/actions/dashboardAction";
import NotificationFrom from "./notificationForm";
import Record from "@/app/components/medals/Record";
import Modal from "@/app/components/modals/Modal";
import DashboardHeader from "@/app/components/header";
import MenuModal from "@/app/components/cards/MenuModal";
import Tooltip from "@/app/components/tooltips/InformationTooltipFull";
import MenuBar from "@/app/components/cards/MenuBar";
import BarColormode from "@/app/components/cards/BarColormode";
import { ICONS } from "@/lib/globals";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default async function ProfilPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const profilData = await getProfilData();

  return (
    <div>
      <DashboardHeader title={dict.routes.profil} />

      <div className="py-16 bg-base-200 overflow-y-scroll">
        <div className="w-full flex items-center justify-center">
          <div className="card bg-base-100 border border-base-300 p-0 m-0 w-24 h-24 rounded-full flex items-center justify-center">
            <div className="card-body h-24 w-24 m-0 p-0 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className=""
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.profil}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="card bg-base-100 border border-base-300 p-0 m-0 ">
            <div className="card-body">
              <div className="flex justify-between items-center h-full ">
                <div className="text-base-content flex items-center">
                  <div className="">
                    <div className="text text150">
                      {dict.profil.welcome} {profilData.name}!
                    </div>
                    {profilData.medal.type === "record" ? (
                      <div className="flex">
                        <Record
                          duration={profilData.medal.duration}
                          dict={dict.profil.record}
                        />
                      </div>
                    ) : (
                      <div>{dict.general.notImplementet}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          id="notofication"
          button={dict.profil.notifications}
          title={dict.profil.notificationForm.title}
          description={dict.profil.notificationForm.description}
          icon="notification"
        >
          <NotificationFrom dict={dict.profil.notificationForm} />
        </Modal>

        <BarColormode title={dict.profil.darkmode} icon="colormode" />

        <div className="text text100"> {dict.profil.generallSettings}</div>

        <Tooltip text={dict.general.notImplementet}>
          <MenuModal title={dict.profil.konto} icon="profil" />
        </Tooltip>
        <Tooltip text={dict.general.notImplementet}>
          <MenuModal title={dict.profil.authorization} icon="key" />
        </Tooltip>

        <Modal
          id="language"
          button={dict.profil.language}
          title={dict.profil.lang.title}
          description={dict.profil.lang.description}
          icon="language"
        >
          <LanguageSwitcher />
        </Modal>
        <div className="text text100"> {dict.profil.info}</div>
        <Tooltip text={dict.general.notImplementet}>
          <MenuModal
            title={dict.profil.about}
            icon="sustainAble"
            color="primary"
          />
        </Tooltip>
        <Tooltip text={dict.general.notImplementet}>
          <MenuModal title={dict.profil.help} icon="help" />
        </Tooltip>
        <MenuBar title={dict.profil.logout} />
        <div className="text">
          <div className="text-accent text100  underline ">
            {dict.profil.data}
          </div>
          <div className="text-accent text100  underline ">
            {dict.profil.impressum}
          </div>
          <div className="text-accent text100  underline ">
            {dict.profil.agb}
          </div>
        </div>
      </div>
    </div>
  );
}
