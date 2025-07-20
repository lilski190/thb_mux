"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../modals/Toast";
import { loginAction } from "@/app/actions/authAction";
import Tooltip from "../tooltips/InformationTooltip";

async function handleLogin(formData, dict, showToast, router, lang) {
  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  if (!email || !email.includes("@")) {
    showToast("error", 3, dict.login.invalidEmail || "Ungültige E-Mail");
    return;
  }
  if (!password || password.length < 6) {
    showToast("error", 3, dict.login.shortPassword || "Passwort zu kurz");
    return;
  }

  try {
    const res = await loginAction(formData);
    const success =
      (typeof res.success === "boolean" && res.success) ||
      (typeof res.message === "string" &&
        res.message.toLowerCase().trim() === "success");

    if (success) {
      showToast("success", 3, dict.login.success || "Login erfolgreich!");
      // Kurze Pause, damit Toast sichtbar wird
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push(`/${lang}/dashboard`);
    } else {
      showToast(
        "error",
        3,
        res.message || dict.login.failed || "Login fehlgeschlagen"
      );
    }
  } catch (error) {
    showToast("error", 3, dict.login.errorGeneral || "Fehler beim Login");
  }
}

export default function LoginForm({ dict, lang }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    await handleLogin(formData, dict, showToast, router, lang);
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} disabled={loading} className="px-10">
      <fieldset className="fieldset">
        <legend className="sr-only">{dict.login.sr_description}</legend>
        <div className="relative mt-3 text">
          <input
            type="text"
            name="email"
            id="email"
            className="input block px-2.5 pb-2 pt-2 w-full  bg-transparent rounded-full border-1 border-base-300 appearance-none focus:outline-none focus:ring-0 focus:border-info peer hover:border-info "
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-info peer-focus:dark:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {dict.login.mail}
          </label>
        </div>

        <div className="relative mt-1 text -mb-1">
          <input
            type={showPassword ? "text" : "password"} // <-- toggle type
            name="password"
            id="password"
            className="input block px-2.5 pb-2 pt-2 w-full bg-transparent rounded-full border-1 border-base-300 appearance-none focus:outline-none focus:ring-0 focus:border-info peer hover:border-info pr-10" // padding für Icon
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
          >
            {dict.login.pw}
          </label>
          {/* Auge-Icon */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2 right-3 text-gray-500 hover:text-info"
            aria-label={
              showPassword
                ? dict.login.hidePassword || "Passwort verbergen"
                : dict.login.showPassword || "Passwort anzeigen"
            }
          >
            <div className="mt-0.5">
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between " aria-hidden="true">
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
            disabled={loading}
            aria-busy={loading}
            className="btn btn-primary buttonStyle mt-3 text75 text-primary-content Textbold hoverButtonPrim"
          >
            {loading
              ? dict.login.loadingText || "Bitte warten..."
              : dict.login.login}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
