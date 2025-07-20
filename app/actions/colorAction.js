"use server";

import { cookies } from "next/headers";
import { postRequestToken } from "../api/api";
import { redirect } from "next/navigation"; // redirect richtig importieren

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
    console.log("response COLORMODE post", response);

    cookieStore.set("colorMode", cm);

    return { success: true, message: "Farbmodus gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern des Farbmodus:", error.message);
    return { success: false, message: error.message };
  }
}

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
    console.log("response LANG post", response);

    cookieStore.set("dir", dir);
    cookieStore.set("lang", chosenLang);

    return { success: true, message: "Sprache gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Sprache:", error.message);
    return { success: false, message: error.message };
  }
}
