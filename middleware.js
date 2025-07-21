import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const SUPPORTED_LANGUAGES = ["de", "en", "sp", "pl", "ar"];

const PUBLIC_FILES = [
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
  "/sw.js",
  // weitere statische Dateien hier
];

const PUBLIC_ROUTES = ["/"];

const PROTECTED_ROUTES = ["/dashboard"];

const AUTH_ROUTES = ["/login"];

/**
 * Middleware zur Sprachvalidierung und Zugriffskontrolle.
 *
 * - Prüft, ob die Sprache in der URL unterstützt wird, sonst Redirect zu /de
 * - Erlaubt Zugriff auf öffentliche Routen ohne Einschränkung
 * - Schützt geschützte Routen, leitet bei fehlendem Token auf Login-Seite um
 * - Leitet eingeloggte Nutzer von Login-Seite zum Dashboard um
 *
 * @param {NextRequest} req - Eingehende Request-Objekt
 * @returns {NextResponse} Antwort, entweder Weiterleitung oder Fortsetzung der Anfrage
 */
export function middleware(req) {
  const { pathname } = req.nextUrl;

  const pathSegments = pathname.split("/").filter(Boolean); // ['de', 'dashboard']
  const langInPath = pathSegments[0];

  // Sprache fehlt oder ungültig → redirect zu /de
  if (!SUPPORTED_LANGUAGES.includes(langInPath)) {
    const newUrl = new URL(`/de${pathname}`, req.url);
    newUrl.search = req.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const strippedPath = `/${pathSegments.slice(1).join("/")}`; // z.B. '/dashboard'
  const token = req.cookies.get("token")?.value;
  const res = NextResponse.next();

  // Zugriff auf Public Routes immer erlaubt
  if (PUBLIC_ROUTES.includes(strippedPath)) return res;

  // Zugriff auf Protected Routes nur mit Token
  if (PROTECTED_ROUTES.some((route) => strippedPath.startsWith(route))) {
    if (!token) {
      const newUrl = new URL(`/${langInPath}/login`, req.url);
      newUrl.search = req.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }
    return res;
  }

  // Auth Routes nur für nicht eingeloggte Nutzer
  if (AUTH_ROUTES.includes(strippedPath)) {
    if (token) {
      const newUrl = new URL(`/${langInPath}/dashboard`, req.url);
      newUrl.search = req.nextUrl.search;
      return NextResponse.redirect(newUrl);
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.[^/]+$).*)"],
};
