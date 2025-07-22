"use server";

import { cookies } from "next/headers";
import { postRequestToken } from "../api/api";
import { redirect } from "next/navigation";

/**
 * Setzt den Farbmodus (colorMode) des Benutzers.
 * Speichert die Einstellung serverseitig über eine API-Anfrage und aktualisiert das entsprechende Cookie.
 * Leitet bei fehlendem Token zur Login-Seite weiter.
 *
 * @param {string} colormode - Der gewünschte Farbmodus, z.B. "main" oder "contrast".
 * @returns {Promise<{success: boolean, message: string} | null>} Ergebnis der Speicherung oder null bei Umleitung.
 */
export async function setColorMode(colormode) {
  const path = "settings/colorMode";
  const cm = colormode || "main";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  const obj = { colorMode: cm };

  try {
    const response = await postRequestToken(token, path, obj);

    cookieStore.set("colorMode", cm);

    return { success: true, message: "Farbmodus gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern des Farbmodus:", error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Setzt die Sprache (lang) des Benutzers.
 * Speichert die Einstellung serverseitig über eine API-Anfrage, aktualisiert die Sprach- und Richtungs-Cookies.
 * Leitet bei fehlendem Token zur Login-Seite weiter.
 *
 * @param {string} lang - Gewünschter Sprachcode, z.B. "de", "en", "ar".
 * @returns {Promise<{success: boolean, message: string} | null>} Ergebnis der Speicherung oder null bei Umleitung.
 */
export async function setLang(lang) {
  const path = "settings/lang";
  const chosenLang = lang || "de";
  const dir = chosenLang === "ar" ? "rtl" : "dir";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  const obj = { lang: chosenLang };

  try {
    const response = await postRequestToken(token, path, obj);
    cookieStore.set("dir", dir);
    cookieStore.set("lang", chosenLang);

    return { success: true, message: "Sprache gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Sprache:", error.message);
    return { success: false, message: error.message };
  }
}
