import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div className="bg-base-200">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{dict.home.title}</h1>
            <p className="mb-5">{dict.home.description}</p>
            <Link href={`/${lang}/login`}>
              <button className="btn btn-primary">LOGIN</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
