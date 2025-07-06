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
      <div className="card bg-base-100 shadow-sm m-3 border-1 border-base-300 h-fit">
        <div className="card-body">
          <div className="text-primary h-30 flex justify-center items-center">
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
          <h2 className="title titleBig">{dict.general.projectName}</h2>
          <div className="text96">{dict.general.projectSlogan}</div>
          <div className="card-actions justify-center">
            <Tooltip text={dict.general.notImplementet}>
              <button className="btn btn-primary text96">
                {dict.general.register}
              </button>
            </Tooltip>
            <Link href={`/${lang}/login`}>
              <button className="btn btn-base-200 text96">
                {dict.general.login}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
