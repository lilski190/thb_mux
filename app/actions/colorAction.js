// app/actions/setColorMode.ts
"use server";

import { cookies } from "next/headers";

export async function setColorMode(colormode) {
  const cm = colormode;
  console.log("set Cookie", cm);
  const cookieStore = await cookies();
  cookieStore.set("colorMode", cm || "main");
  //TODO save color mode request
  return "DEFALUT SAVE MESSAGE";
}

export async function setLang(lang) {
  console.log("set Cookie", lang);
  const cookieStore = await cookies();
  let dir = lang === "ar" ? "rtl" : "dir";
  cookieStore.set("dir", dir || "dir");
  //TODO save lang
  //lang = "de" || "en" || "sp" || "pl" || "ar"
  return "DEFALUT SAVE MESSAGE";
}
