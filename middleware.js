import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const SUPPORTED_LANGUAGES = ["de", "en"];

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/examples",
  "/tutorial",
  "/join",
  "/impressum",
  "/collection",
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/styleguide",
  "/templates",
  "/content",
  "/create",
  "/management",
];

const AUTH_ROUTES = ["/login"];

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
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
