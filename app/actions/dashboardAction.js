"use server";

import { redirect } from "next/dist/server/api-utils";
import { getRequestToken } from "../api/api";
import { cookies } from "next/headers";
import statisticDummi from "@/app/dummidata/statistik.json";

const path = "api/???";

export async function getHomeData() {
  console.log("GET DATA FOR HOME");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}

export async function getStatisitcData() {
  console.log("GET DATA FOR HOME");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  //const data = await getRequestToken(path, token);
  return statisticDummi.response; //data;
}

export async function getProfilData() {
  console.log("GET DATA FOR HOME");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  //const data = await getRequestToken(path, token);
  return "DATEN GELADEN ;)"; //data;
}
