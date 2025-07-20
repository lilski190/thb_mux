import { getDictionary } from "@/lib/getDictionary";

export default async function Home({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  let altText = dict["errorPage.altText"] || "Error loading page";
  let title = dict["errorPage.title"] || "Error";
  let description =
    dict["errorPage.description"] ||
    "There was an Error, please reload the page.";

  return (
    <div className="bg-base-200 h-screen">
      <div
        className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-start justify-center h-screen w-screen"
        role="alert"
        aria-live="assertive"
        aria-label={altText}
      >
        <h1 className="title titleBig">{title}</h1>
        <p className="text96 text-center w-full mt-3  mb-6">{description}</p>
        <img src="/error.GIF" alt={altText} className="w-full " />
      </div>
    </div>
  );
}
