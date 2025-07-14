import { getDictionary } from "@/lib/getDictionary";
import BottomNav from "./BottomNav";

export default async function Layout({ children, params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200 h-screen">
      <nav aria-label="Hauptnavigation">
        <BottomNav lang={lang} dict={dict} />
      </nav>
      <div className="">{children}</div>
    </div>
  );
}
