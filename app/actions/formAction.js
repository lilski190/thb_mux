"use server";

import { redirect } from "next/navigation"; // besser als von api-utils
import { getRequestToken, postRequestToken } from "../api/api";
import { cookies } from "next/headers";

export async function pushArivalData(formData) {
  const path = "add_transportation_entry";
  console.log("PUSH DATA FOR ARIVAL");

  const transportation = formData.get("transportation");
  const distance = formData.get("distance");

  const obj = {
    transportationType: transportation,
    value: distance,
  };

  console.log("PUSH DATA FOR ARIVAL", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    console.log("response Arrival post", response);
    return { success: true, message: "Daten erfolgreich gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Ankunftsdaten:", error.message);
    return { success: false, message: error.message };
  }
}

export async function pushMealData(formData) {
  const path = "add_meal_entry";
  console.log("PUSH DATA FOR MEAL");

  const meal = formData.get("meal");

  const obj = {
    mealType: meal,
    value: 1,
  };

  console.log("PUSH DATA FOR MEAL", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    console.log("response Meal post", response);
    return { success: true, message: "Mahlzeit erfolgreich gespeichert" };
  } catch (error) {
    console.error("Fehler beim Speichern der Mahlzeit:", error.message);
    return { success: false, message: error.message };
  }
}

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

  console.log("PUSH DATA FOR NOTIFICATIONS", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  try {
    const response = await postRequestToken(token, path, obj);
    console.log("response Notifications post", response);
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
