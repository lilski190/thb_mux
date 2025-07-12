"use server";

import { redirect } from "next/dist/server/api-utils";
import { getRequestToken, postRequestToken } from "../api/api";
import { cookies } from "next/headers";

export async function pushArivalData(formData) {
  let path = "add_transportation_entry";
  console.log("PUSH DATA FOR ARIVAL");

  const transportation = formData.get("transportation");
  const distance = formData.get("distance");
  let obj = {
    transportationType: transportation,
    value: distance,
  };

  console.log("PUSH DATA FOR ARIVAL", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  //SEND obj, token and path
  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = await postRequestToken(token, path, obj);
  console.log("response Arival post", response);

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}

export async function pushMealData(formData) {
  let path = "add_meal_entry";

  console.log("PUSH DATA FOR MEAL");

  const meal = formData.get("meal");
  let obj = {
    mealType: meal,
    value: 1,
  };

  console.log("PUSH DATA FOR MEAL", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = await postRequestToken(token, path, obj);
  console.log("response MEAl post", response);

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}

export async function pushNotoficationData(formData) {
  let path = "settings/notifications";
  const mo = formData.get("mo") ?? "0";
  const di = formData.get("di") ?? "0";
  const mi = formData.get("mi") ?? "0";
  const don = formData.get("do") ?? "0";
  const fr = formData.get("fr") ?? "0";

  let obj = {
    notifications: [mo, di, mi, don, fr],
  };

  console.log("PUSH DATA FOR NOTIFICATONS", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  //SEND obj, token and path
  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = await postRequestToken(token, path, obj);
  console.log("response NOTOFICATINS post", response);

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}
