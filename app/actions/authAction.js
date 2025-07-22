"use server";

import { getRequestToken, postRequest, postRequestToken } from "../api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const path = "login";

/**
 * Führt den Login-Vorgang auf dem Server aus.
 * Liest Benutzername und Passwort aus dem übergebenen FormData-Objekt,
 * sendet diese an den Login-API-Endpunkt und setzt bei Erfolg entsprechende Cookies.
 *
 * @param {FormData} formData - Formulardaten mit den Feldern "email" und "password".
 * @param {string} lang - Sprachcode, z.B. "de" oder "en".
 *
 * @returns {Promise<{success: boolean, message: string}>} Ergebnis des Login-Versuchs.
 */
export async function loginAction(formData, lang) {
  const user = formData.get("email");
  const pw = formData.get("password");
  const obj = { username: user, password: pw };

  try {
    const result = await postRequest(path, obj);

    if (result?.access_token) {
      const cookieStore = await cookies();

      cookieStore.set("token", result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
        path: "/",
      });

      cookieStore.set("colorMode", result?.colorMode || "main");
      cookieStore.set("lang", result?.lang || "de");
      let dir = "ltr";
      if (result?.lang === "ar") {
        dir = "rtl";
      }
      cookieStore.set("dir", dir || "ltr");

      return { success: true, message: "success" };
    } else {
      console.warn("Login fehlgeschlagen: Kein access_token");
      return { success: false, message: "Login fehlgeschlagen" };
    }
  } catch (error) {
    console.error("Fehler beim Login:", error.message);
    return { success: false, message: error.message || "Unbekannter Fehler" };
  }
}

/**
 * Führt den Logout-Vorgang auf dem Server aus.
 * Löscht Login-bezogene Cookies (token, colorMode, lang, dir)
 * und leitet auf die Startseite der zuletzt genutzten Sprache um.
 *
 * @returns {Promise<void>}
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  let lastLang = cookieStore.get("lang")?.value || "de";
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("colorMode", "", {
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("lang", "", {
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("dir", "", {
    maxAge: 0,
    path: "/",
  });

  redirect(`/${lastLang}/`);
}
