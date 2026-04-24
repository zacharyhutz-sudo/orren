import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, cookies, redirect } = context;

  // If visiting the root, redirect based on auth status
  if (pathname === "/" || pathname === "") {
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
      return redirect("/signin");
    } else {
      return redirect("/budget");
    }
  }

  // Auth gating for protected routes
  const protectedRoutes = ["/budget", "/net-worth", "/profile"];
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const accessToken = cookies.get("sb-access-token")?.value;
    const refreshToken = cookies.get("sb-refresh-token")?.value;

    if (!accessToken || !refreshToken) {
      return redirect("/signin");
    }
  }

  return next();
});
