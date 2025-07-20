"use server";

import { getRequestToken, postRequest, postRequestToken } from "../api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const path = "login";

export async function loginAction(formData, lang) {
  console.log("Send login: ");
  const user = formData.get("email");
  const pw = formData.get("password");

  console.log("username", user, "pw", pw);

  const obj = { username: user, password: pw };

  try {
    const result = await postRequest(path, obj);
    console.log("Result", result);

    if (result?.access_token) {
      const cookieStore = await cookies();

      cookieStore.set("token", result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60,
        path: "/",
      });

      cookieStore.set("colorMode", result?.colorMode || "main");
      cookieStore.set("lang", result?.lang || "de");

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

export async function logoutAction() {
  const cookieStore = cookies();
  let lastLang = cookieStore.get("lang")?.value || "de";
  // Cookie löschen, indem man es mit leerem Wert und maxAge 0 setzt
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  // Optional: andere Cookies wie colorMode auch löschen
  cookieStore.set("colorMode", "", {
    maxAge: 0,
    path: "/",
  });

  cookieStore.set("lang", "", {
    maxAge: 0,
    path: "/",
  });

  redirect(`/${lastLang}/`);
}
