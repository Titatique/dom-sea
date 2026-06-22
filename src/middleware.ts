import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de protection des routes.
 *
 * Règles :
 * - /dashboard/client/* → CLIENT ou ADMIN
 * - /dashboard/partner/* → PARTNER ou ADMIN
 * - /dashboard/admin/* → ADMIN seulement
 * - /connexion, /inscription → redirige vers dashboard si déjà connecté
 */
export default auth((req) => {
  const { nextUrl, auth: session } = req as NextRequest & { auth: typeof req.auth };
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;
  const pathname = nextUrl.pathname;

  // ── Redirection si déjà connecté ────────────────────────────────────────
  if (isLoggedIn && (pathname === "/connexion" || pathname === "/inscription")) {
    const redirectTo =
      role === "ADMIN"
        ? "/dashboard/admin"
        : role === "PARTNER"
        ? "/dashboard/partner"
        : "/dashboard/client";
    return NextResponse.redirect(new URL(redirectTo, nextUrl));
  }

  // ── Protection routes admin ──────────────────────────────────────────────
  if (pathname.startsWith("/dashboard/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/connexion?from=" + pathname, nextUrl));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // ── Protection routes partenaire ─────────────────────────────────────────
  if (pathname.startsWith("/dashboard/partner")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/connexion?from=" + pathname, nextUrl));
    }
    if (role !== "PARTNER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // ── Protection routes client ─────────────────────────────────────────────
  if (pathname.startsWith("/dashboard/client")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/connexion?from=" + pathname, nextUrl));
    }
    if (role !== "CLIENT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

// Le middleware s'exécute sur toutes les routes sauf les fichiers statiques
// et les routes internes Next.js (_next).
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
