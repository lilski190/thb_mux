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
  let result = true; //await postRequest(path, obj);
  //TODO: DEBUG LOGIN
  console.log("Reasult", result);
  if (result?.token) {
    // JWT Cookie für 6 Stunden setzen
    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true, // schützt vor JS-Zugriff
      secure: process.env.NODE_ENV === "production", // nur über HTTPS in Produktion
      maxAge: 6 * 60 * 60, // 6 Stunden in Sekunden
      path: "/",
    });

    // Weiterleitung zum Dashboard
    redirect("/dashboard");
  } else {
    // Optional: Fehlerbehandlung
    console.log("Login fehlgeschlagen, Setze Dummi token");
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MTU0ODgzNSwianRpIjoiMjcwZDgwMDgtYjliYS00NjQ1LTk1ZDUtMTQyMzRlNzU0MzRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE3NTE1NDg4MzUsImNzcmYiOiI2YTRiZWUyNi01ZGZhLTQ0ZmEtYTJkMy1iMDE4ZmI2OTgzY2MiLCJleHAiOjE3NTE1NDk3MzV9.x0crUjgeKWBSKQVbiAiVfTrPenJ2KcVEsVBFME6jhQs";
    // JWT Cookie für 6 Stunden setzen
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, // schützt vor JS-Zugriff
      secure: process.env.NODE_ENV === "production", // nur über HTTPS in Produktion
      maxAge: 6 * 60 * 60, // 6 Stunden in Sekunden
      path: "/",
    });
    //TODO: COLORMODE FROM THE LOGIN DATA SETZTE!
    let colorMode = "dark";
    cookieStore.set("colorMode", colorMode || "main");
    redirect("/dashboard");
  }
}
