"use server";

import { redirect } from "next/dist/server/api-utils";
import { getRequestToken } from "../api/api";
import { cookies } from "next/headers";

const path = "api/???";

export async function pushArivalData(formData) {
  console.log("PUSH DATA FOR ARIVAL");

  const transportation = formData.get("transportation");
  const distance = formData.get("distance");
  let obj = {
    key: transportation,
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

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}

export async function pushMealData(formData) {
  console.log("PUSH DATA FOR MEAL");

  const meal = formData.get("meal");
  let obj = {
    key: meal,
    value: 1,
  };

  console.log("PUSH DATA FOR MEAL", JSON.stringify(obj));

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  //SEND obj, token and path
  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}

export async function pushNotoficationData(formData) {
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

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}
