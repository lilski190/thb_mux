"use server";

import { redirect } from "next/dist/server/api-utils";
import { getRequestToken } from "../api/api";
import { cookies } from "next/headers";

/**
 * Holt die Daten für die Startseite vom Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @returns {Promise<Object|null>} Die Daten für die Startseite oder null bei Umleitung.
 */
export async function getHomeData() {
  let path = "home";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }
  const response = await getRequestToken(token, path);
  return response.data;
}

/**
 * Holt die Eingabedaten (input data) vom Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @returns {Promise<Object|null>} Die Eingabedaten oder null bei Umleitung.
 */
export async function getInputData() {
  let path = "home";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }
  const response = await getRequestToken(token, path);
  return response.data;
}

/**
 * Holt die Statistik-Daten vom Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @returns {Promise<Object|null>} Die Statistik-Daten oder null bei Umleitung.
 */
export async function getStatisitcData() {
  let path = "statistics";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  const response = await getRequestToken(token, path);
  return response;
}

/**
 * Holt die Profildaten vom Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @returns {Promise<Object|null>} Die Profildaten oder null bei Umleitung.
 */
export async function getProfilData() {
  let path = "profile";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  const response = await getRequestToken(token, path);
  return response.data;
}
