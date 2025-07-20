import { getDictionary } from "@/lib/getDictionary";

export default async function ErrorDemo({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);
  let altText = dict.errors.errorAltText || "Error loading page";
  let title = dict.errors.error || "Error";
  let description =
    dict.errors.errorDescription ||
    "There was an Error, please reload the page.";

  return (
    <div className="bg-base-200 h-screen">
      <section
        className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-start justify-start h-screen w-screen"
        role="alert"
        aria-live="assertive"
        aria-label={title}
      >
        <img
          src="/error.gif"
          alt={altText}
          className="w-full mt-6"
          aria-hidden="true"
        />
        <header className="px-10 mt-4 w-full">
          <h1 className="title titleBig text.center" tabIndex={-1}>
            {title}
          </h1>
        </header>
        <p className="px-10 text96 text-center w-full mt-3 my-6">
          {description}
        </p>
      </section>
    </div>
  );
}
