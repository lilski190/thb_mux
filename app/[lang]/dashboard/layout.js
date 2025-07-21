import { getDictionary } from "@/lib/getDictionary";
import BottomNav from "./BottomNav";
import { cookies } from "next/headers";

export default async function Layout({ children, params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  const cookieStore = await cookies();
  const cookiecolor = cookieStore.get("colorMode")?.value || "main";

  return (
    <div className="bg-base-200 h-screen">
      <nav aria-label="Hauptnavigation">
        <BottomNav lang={lang} dict={dict} mode={cookiecolor} />
      </nav>
      <div className="">{children}</div>
    </div>
  );
}
