import { auth } from "./auth";

export default auth((req) => {
  const isLandingPage = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/Landing-page";
  const isAuthUser = !!req.auth;

  if (isLandingPage) {
    // Always allow access to landing page
    return null;
  }

  // Allow everyone to access any /admin route (admin handles its own auth)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return null;
  }

  // Allow everyone to access the login page
  if (req.nextUrl.pathname.startsWith("/login")) {
    return null;
  }

  if (!isAuthUser) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|public).*)"],
};
