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
import { cookies } from "next/headers";

export default async function ProfilPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const profilData = await getProfilData();

  const cookieStore = await cookies();
  const colorMode = cookieStore.get("colorMode")?.value || "main";

  return (
    <div>
      <DashboardHeader title={dict.routes.profil} />

      <section
        className="py-20 bg-base-200 px-3 grid grid-cols-1 gap-1.5"
        aria-label={dict.profil.sectionLabel || "Profilübersicht"}
      >
        {/* Profilbild */}
        <div className="w-full flex items-center justify-center mb-1.5 mt-2">
          <div
            className="card bg-base-100 border border-base-300 p-0 m-0 w-24 h-24 rounded-full flex items-center justify-center"
            role="img"
            aria-label={dict.profil.avatarLabel || "Benutzeravatar"}
          >
            <div className="card-body h-24 w-24 m-0 p-0" aria-hidden="true">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="w-full h-full"
              >
                <title>{dict.profil.avatarTitle || "Profil-Icon"}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.profil}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Begrüßung & Medaille */}
        <div className="w-full">
          <article
            className="card bg-base-100 border border-base-300 p-0 m-0 mb-1.5"
            aria-label={dict.profil.cardLabel || "Benutzerdetails"}
          >
            <div className="p-3">
              <header className="text-base-content">
                <h3 className="text text150">
                  {dict.profil.welcome} {profilData.name}!
                </h3>
              </header>

              <div className="mt-2">
                {profilData.medal.type === "record" ? (
                  <div
                    className="flex"
                    role="group"
                    aria-label={dict.profil.record.title}
                  >
                    <Record
                      duration={profilData.medal.duration}
                      dict={dict.profil.record}
                    />
                  </div>
                ) : (
                  <div role="note" className="text text100 text-base-content">
                    {dict.general.notImplementet}
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>

        <h4 className="text text100 mt-4 mb-2 ml-1 ">
          {dict.profil.generallSettings}
        </h4>

        <Modal
          id="notofication"
          button={dict.profil.notifications}
          title={dict.profil.notificationForm.title}
          description={dict.profil.notificationForm.description}
          icon="notification"
        >
          <NotificationFrom dict={dict.profil.notificationForm} />
        </Modal>

        <BarColormode
          title={dict.profil.darkmode}
          icon="colormode"
          mode={colorMode}
        />
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
          <LanguageSwitcher dict={dict} />
        </Modal>
        <h4 className="text text100  mt-4 mb-2 ml-1 "> {dict.profil.info}</h4>
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
        <div className="text w-3/6" aria-hidden="true">
          <Tooltip text={dict.general.notImplementet}>
            <div className="text-accent text100  underline hover:font-semibold">
              {dict.profil.data}
            </div>
          </Tooltip>
          <Tooltip text={dict.general.notImplementet}>
            <div className="text-accent text100  underline hover:font-semibold">
              {dict.profil.impressum}
            </div>
          </Tooltip>
          <Tooltip text={dict.general.notImplementet}>
            <div className="text-accent text100  underline hover:font-semibold">
              {dict.profil.agb}
            </div>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
