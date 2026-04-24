import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, cookies, redirect } = context;

  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;
  const isLoggedIn = !!(accessToken && refreshToken);

  // Root redirect
  if (pathname === "/" || pathname === "") {
    return redirect(isLoggedIn ? "/budget" : "/signin");
  }

  // Protected routes: redirect to signin if not logged in
  const protectedRoutes = ["/budget", "/net-worth", "/profile"];
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isLoggedIn) {
    return redirect("/signin");
  }

  // Auth routes: redirect to dashboard if already logged in
  const authRoutes = ["/signin", "/register"];
  if (authRoutes.some(route => pathname.startsWith(route)) && isLoggedIn) {
    return redirect("/budget");
  }

  return next();
});
