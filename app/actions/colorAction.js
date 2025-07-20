// app/actions/setColorMode.ts
"use server";

import { cookies } from "next/headers";
import { postRequestToken } from "../api/api";

export async function setColorMode(colormode) {
  let path = "settings/colorMode";
  const cm = colormode;
  console.log("set Cookie", cm);
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name
  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let obj = {
    colorMode: cm || "main",
  };
  let response = await postRequestToken(token, path, obj);
  console.log("response COLORMODE post", response);

  if (response != undefined) {
    cookieStore.set("colorMode", cm || "main");
  }

  return true;
}

export async function setLang(lang) {
  console.log("set Lang", lang);
  let path = "settings/lang";
  let dir = lang === "ar" ? "rtl" : "dir";

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name
  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let obj = {
    lang: lang || "de",
  };

  let response = await postRequestToken(token, path, obj);
  console.log("response LANG post", response);

  if (response != undefined) {
    cookieStore.set("dir", dir || "dir");
    cookieStore.set("lang", lang || "de");
  }

  return true;
}
