// app/actions/setColorMode.ts
"use server";

import { cookies } from "next/headers";

export async function setColorMode(formData) {
  const cm = formData.get("colormode");
  console.log("set Cookie", cm);
  const cookieStore = await cookies();
  cookieStore.set("colorMode", cm || "main");
  //TODO save color mode request
}
