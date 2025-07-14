import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import Tooltip from "../components/tooltips/InformationTooltip";
import { ICONS } from "@/lib/globals";
import SystemLanguage from "../systemLang";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 h-screen flex items-center justify-center">
      <SystemLanguage current={lang} />
      <section className="card w-full bg-base-100 shadow-sm m-4 border-1 border-base-300 min-h-2/3 flex items-center ">
        <div className="card-body flex flex-col items-center max-w-96 ">
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
          <h1 className="title titleBig pt-2">{dict.general.projectName}</h1>
          <p className="text96 text-center w-full mt-4 mb-6">
            {dict.general.projectSlogan}
          </p>
          <div className="grid grid-cols-2  w-full mb-6 gap-4 ">
            <Tooltip text={dict.general.notImplementet} className="w-full grow">
              <button
                type="button"
                className=" buttonStyle text96 px-5 rounded-full w-full
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
              className="btn btn-base-100 buttonStyle text96 w-full hoverButtonBase flex items-center justify-center"
              role="button"
            >
              {dict.general.login}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
