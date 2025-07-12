"use server";

import { getRequestToken, postRequest, postRequestToken } from "../api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const path = "login";

export async function loginAction(formData) {
  console.log("Send login: ");
  const user = formData.get("email");
  const pw = formData.get("password");

  console.log("username", user, "pw", pw);

  //logs:
  //Send login:
  //username demo@thb.de pw demo2025

  let obj = { username: user, password: pw };
  let result = await postRequest(path, obj);
  //TODO: DEBUG LOGIN
  console.log("Reasult", result);
  if (result?.access_token) {
    // JWT Cookie für 6 Stunden setzen
    const cookieStore = await cookies();
    cookieStore.set("token", result.access_token, {
      httpOnly: true, // schützt vor JS-Zugriff
      secure: process.env.NODE_ENV === "production", // nur über HTTPS in Produktion
      maxAge: 6 * 60 * 60, // 6 Stunden in Sekunden
      path: "/",
    });

    cookieStore.set("colorMode", result?.colorMode || "main");

    // Weiterleitung zum Dashboard
    redirect("/dashboard");
  } else {
    // Optional: Fehlerbehandlung
    console.log("Login fehlgeschlagen, Setze Dummi token");
  }
}
