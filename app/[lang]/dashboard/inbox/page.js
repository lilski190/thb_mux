import { getDictionary } from "@/lib/getDictionary";

export default async function InboxPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.routes.inpox}</h1>
      <p>{dict.general.notImplementet}</p>
    </div>
  );
}
