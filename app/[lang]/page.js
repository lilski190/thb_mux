import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import Tooltip from "../components/tooltips/InformationTooltip";
import { ICONS } from "@/lib/globals";
import SystemLanguage from "../systemLang";
import { IntroOverlay } from "../components/modals/IntroOverlay";
import InstallButton from "../components/buttons/InstallButton";
import { cookies } from "next/headers";

/**
 * Async React-Komponente für die Startseite.
 * Lädt das Sprach-Dictionary basierend auf den URL-Parametern,
 * liest Cookies aus, um Login-Status und bevorzugte Sprache zu bestimmen,
 * und rendert die Hauptseite mit entsprechenden UI-Komponenten.
 *
 * @param {Object} props
 * @param {Object} props.params - URL-Parameter, inklusive Sprachcode `lang`.
 * @param {string} [props.params.lang] - Sprachcode, z.B. "de" oder "en". Standard ist "de".
 *
 * @returns {JSX.Element} Die gerenderte Startseiten-Komponente.
 */
export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const cookieLang = cookieStore.get("lang")?.value;
  let loggedInLang = false;
  let userLoggedIn = false;
  if (token != undefined) {
    userLoggedIn = true;
    loggedInLang = cookieLang;
  }

  return (
    <div className="bg-base-200 h-screen flex items-center justify-center">
      <IntroOverlay
        altText={dict.general.loading_sr}
        name={dict.general.projectName}
        userLoggedIn={userLoggedIn}
        lang={lang}
      />
      <SystemLanguage current={lang} loggedInLang={loggedInLang} />

      <section className="card w-full bg-base-100 shadow-sm m-4 border-1 border-base-300 min-h-1/3 flex items-center ">
        <div className="flex flex-col items-center justify-between max-w-96 my-10 ">
          <div className="text-primary max-h-30 flex justify-center items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 96 96"
              strokeWidth={1.5}
              stroke="none"
              className=""
              role="img"
              aria-labelledby="logo-title"
            >
              <title id="logo-title">{dict.general.logo_sr}</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={ICONS.sustainAble}
              />
            </svg>
          </div>
          <h1 className="title titleBig pt-10">{dict.general.projectName}</h1>
          <p
            className="text96 text-center w-full mt-6 mb-6"
            dangerouslySetInnerHTML={{ __html: dict.general.projectSlogan }}
          ></p>
          <div className="flex justify-between w-full mb-6 px-10 pt-5 gap-4">
            <Tooltip text={dict.general.notImplementet} className="">
              <button
                type="button"
                className=" buttonStyle text96 px-5 rounded-full w-32
                disabled:bg-primary disabled:text-primary-content disabled:opacity-100  disabled:cursor-not-allowed"
                disabled
                aria-disabled="true"
                aria-describedby="register-tip"
              >
                {dict.general.register}
              </button>
            </Tooltip>
            <Link
              href={`/${lang}/login`}
              className="btn btn-base-100 buttonStyle text96 hoverButtonBase flex items-center justify-cente w-32"
              role="button"
            >
              {dict.general.login}
            </Link>
          </div>
          <InstallButton />
        </div>
      </section>
    </div>
  );
}
