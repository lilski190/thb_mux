"use client";

import { Toaster } from "react-hot-toast";
import { loginAction } from "@/app/actions/authAction";
import { useState } from "react";
import Tooltip from "../tooltips/InformationTooltip";

/**
 * LoginForm Komponent
 * Dieser Komponent ist ein einfaches Login-Formular, das in verschiedenen Themen verwendet werden kann.
 * Er enthält Eingabefelder für E-Mail und Passwort sowie einen Button zum Einloggen.
 * Das Styling erfolgt über Tailwind CSS-Klassen und DaisyUI-Klassen.
 * Die Login-Action wird über die Funktion loginAction aufgerufen, die in der Datei app/actions/authAction.js definiert ist.s
 * @param {Object} dict - Das Wörterbuch-Objekt, das die Übersetzungen für die verschiedenen Sprachen enthält.
 */
export default function LoginForm({ dict }) {
  return (
    <>
      <Toaster position="top-center" />
      <form action={loginAction} className="">
        <fieldset className="fieldset">
          <div className="relative mt-3 text">
            <input
              type="email"
              name="email"
              id="floating_outlined_mail"
              className="input block px-2.5 pb-2 pt-2 w-full  bg-transparent rounded-full border-1 border-base-300 appearance-none focus:outline-none focus:ring-0 focus:border-info peer hover:border-info "
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_outlined_mail"
              className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-info peer-focus:dark:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              {dict.login.mail}
            </label>
          </div>
          <div className="relative mt-1 text -mb-1">
            <input
              type="password"
              name="password"
              id="floating_outlined_mail"
              className="input block px-2.5 pb-2 pt-2 w-full bg-transparent rounded-full border-1 border-base-300 appearance-none focus:outline-none focus:ring-0 focus:border-info peer hover:border-info"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_outlined_mail"
              className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-info peer-focus:dark:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              {dict.login.pw}
            </label>
          </div>

          <div className="flex items-center justify-between ">
            <Tooltip text={dict.general.notImplementet}>
              <a className="link link-hover text54 text-accent">
                <div className="flex items-center">
                  <div className="ml-3 h-2.5 w-2.5 bg-[#EFE9E5] rounded-full mr-1"></div>
                  {dict.login.stayLoggedIn}
                </div>
              </a>
            </Tooltip>
            <Tooltip text={dict.general.notImplementet}>
              <a className="link link-hover text54 text-accent">
                <div className="flex items-center mr-2">
                  <div className="h-2.5 w-2.5  rounded-full mr-1"></div>
                  {dict.login.ForgotPassword}
                </div>
              </a>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary buttonStyle mt-3 text75 text-primary-content Textbold hoverButtonPrim"
            >
              {dict.login.login}
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
