import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import Tooltip from "../components/tooltips/InformationTooltip";
import { ICONS } from "@/lib/globals";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 h-screen flex items-center justify-center">
      <div className="card w-full bg-base-100 shadow-sm m-4 border-1 border-base-300 min-h-2/3 flex items-center ">
        <div className="card-body flex flex-col items-center max-w-96 ">
          <div className="text-primary max-h-30 flex justify-center items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 96 96"
              strokeWidth={1.5}
              stroke="none"
              className=""
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={ICONS.sustainAble}
              />
            </svg>
          </div>
          <h2 className="title titleBig pt-2">{dict.general.projectName}</h2>
          <div className="text96 text-center w-full mt-4 mb-6">
            {dict.general.projectSlogan}
          </div>
          <div className="grid grid-cols-2  w-full mb-6 gap-4 ">
            <Tooltip text={dict.general.notImplementet} className="w-full grow">
              <button className="btn buttonStyle btn-primary text96 w-full">
                {dict.general.register}
              </button>
            </Tooltip>
            <Link href={`/${lang}/login`} className="w-full grow">
              <button className="btn btn-base-100 buttonStyle text96 w-full  hoverButtonBase">
                {dict.general.login}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
