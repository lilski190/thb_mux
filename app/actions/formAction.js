"use server";

import { redirect } from "next/navigation"; // besser als von api-utils
import { postRequestToken } from "../api/api";
import { cookies } from "next/headers";

/**
 * Sendet die Ankunftsdaten (Transport und Entfernung) an den Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @param {FormData} formData - Formulardaten mit Feldern "transportation" und "distance".
 * @returns {Promise<{success: boolean, message: string} | null>} Erfolgsmeldung oder Umleitung (null).
 */
export async function pushArivalData(formData) {
  const path = "add_transportation_entry";

  const transportation = formData.get("transportation");
  const distance = formData.get("distance");

  const obj = {
    transportationType: transportation,
    value: distance,
  };
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    return { success: true, message: "Daten erfolgreich gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Ankunftsdaten:", error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Sendet die Mahlzeit-Daten an den Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @param {FormData} formData - Formulardaten mit Feld "meal".
 * @returns {Promise<{success: boolean, message: string} | null>} Erfolgsmeldung oder Umleitung (null).
 */
export async function pushMealData(formData) {
  const path = "add_meal_entry";
  const meal = formData.get("meal");

  const obj = {
    mealType: meal,
    value: 1,
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    return { success: true, message: "Mahlzeit erfolgreich gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Mahlzeit:", error.message);
    return { success: false, message: error.message };
  }
}

/**
 * Sendet die Benachrichtigungseinstellungen an den Server.
 * Leitet bei fehlendem Token auf die Login-Seite um.
 *
 * @param {FormData} formData - Formulardaten mit Feldern "mo", "di", "mi", "do", "fr" (jeweils "0" oder "1").
 * @returns {Promise<{success: boolean, message: string} | null>} Erfolgsmeldung oder Umleitung (null).
 */
export async function pushNotoficationData(formData) {
  const path = "settings/notifications";

  const mo = formData.get("mo") ?? "0";
  const di = formData.get("di") ?? "0";
  const mi = formData.get("mi") ?? "0";
  const don = formData.get("do") ?? "0";
  const fr = formData.get("fr") ?? "0";

  const obj = {
    notifications: [mo, di, mi, don, fr],
  };
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    return {
      success: true,
      message: "Benachrichtigungen erfolgreich gespeichert",
    };
  } catch (error) {
    console.error(
      "Fehler beim Speichern der Benachrichtigungseinstellungen:",
      error.message
    );
    return { success: false, message: error.message };
  }
}
