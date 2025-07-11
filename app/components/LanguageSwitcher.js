"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] || "de";

  const handleLanguageChange = (lang) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = lang;
    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };

  const langLabels = {
    de: "Deutsch",
    en: "English",
  };

  return (
    <div className="flex items-center gap-4 p-2">
      <span className="font-medium">TODO STYLE:</span>
      <div className="flex gap-4">
        {["de", "en"].map((lang) => (
          <label key={lang} className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="language"
              value={lang}
              checked={lang === currentLang}
              onChange={() => handleLanguageChange(lang)}
              className="radio radio-sm"
            />
            <span>{langLabels[lang]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
