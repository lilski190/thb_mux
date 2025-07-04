import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import Tooltip from "../components/tooltips/InformationTooltip";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-sm m-3 border-1 border-base-300 h-fit">
        <div className="card-body">
          <div>LOGO</div>
          <h2 className="card-title">{dict.general.projectName}</h2>
          <p>{dict.general.projectSlogan}</p>
          <div className="card-actions justify-center">
            <Tooltip text={dict.general.notImplementet}>
              <button className="btn btn-primary">
                {dict.general.register}
              </button>
            </Tooltip>
            <Link href={`/${lang}/login`}>
              <button className="btn btn-base-200">{dict.general.login}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
