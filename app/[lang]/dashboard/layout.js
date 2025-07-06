import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import Tooltip from "@/app/components/tooltips/InformationTooltip";

export default async function Layout({ children, params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 h-screen">
      {/* Navbar */}
      <div className="h-16 bg-base-300 w-full fixed bottom-0 z-20 flex justify-evenly items-center ">
        <Link href={`/${lang}/dashboard`}>{dict.routes.home}</Link>
        <Link href={`/${lang}/dashboard/input`}>{dict.routes.input}</Link>
        <Link href={`/${lang}/dashboard/statistic`}>
          {dict.routes.statistic}
        </Link>
        <Tooltip text={dict.general.notImplementet}>
          {dict.routes.inbox}
        </Tooltip>
        <Link href={`/${lang}/dashboard/profil`}>{dict.routes.profil}</Link>
      </div>
      {/* Page content here */}
      <div className="">{children}</div>
    </div>
  );
}
