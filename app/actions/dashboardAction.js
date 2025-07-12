"use server";

import { redirect } from "next/dist/server/api-utils";
import { getRequestToken } from "../api/api";
import { cookies } from "next/headers";
import statisticDummi from "@/app/dummidata/statistik.json";
import HomeDummi from "@/app/dummidata/home.json";
import ProfilDummi from "@/app/dummidata/profil.json";
import { resolve } from "styled-jsx/css";

export async function getHomeData() {
  let path = "home";
  console.log("GET DATA FOR HOME");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = HomeDummi.response;
  //TODO: write usual_arival in cookies
  //const response = await getRequestToken(token, path);

  //COLROMODE Cookie setzen
  console.log("home request result: ", response);

  return response.data;
}

export async function getStatisitcData() {
  console.log("GET DATA FOR STATISTICS");
  let path = "statistics";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = statisticDummi.response;
  //const response = await getRequestToken(token, path);
  console.log("statistic response", response);
  return response; //data;
}

export async function getProfilData() {
  let path = "profile";
  console.log("GET DATA FOR HOME");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // oder dein Cookie-Name

  if (!token) {
    console.warn("No token found");
    redirect("/login");
    return null;
  }

  let response = ProfilDummi.response;
  //const response = await getRequestToken(token, path);
  console.log("statistic response", response);
  return response.data; //data;

  //const data = await getRequestToken(path, token);
}
