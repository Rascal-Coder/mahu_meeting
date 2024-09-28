import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { CustomMiddleware } from "@/lib/utils";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
export const withI18n = (middleware: CustomMiddleware) => {
  return clerkMiddleware(async (auth, req, event) => {
    const { userId } = auth();

    const { pathname } = req.nextUrl;
    if (
      [
        "/manifest.json",
        "/favicon.ico",
        // Your other files in `public`
      ].includes(pathname)
    )
      return;
    if (
      req.nextUrl.pathname.indexOf("icon") > -1 ||
      req.nextUrl.pathname.indexOf("chrome") > -1
    )
      return await middleware(req, event, NextResponse.next());
    let lng: string | undefined | null;
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      const response = NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
      );

      return await middleware(req, event, response);
    }
    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer") || "");
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return await middleware(req, event, response);
    }
    const publicRoutes = createRouteMatcher([
      `/${lng}/sign-in(.*)`,
      `/${lng}/sign-up(.*)`,
      `/${lng}`,
    ]);
    // 放行 publicRoutes
    if (publicRoutes(req)) {
      return await middleware(req, event, NextResponse.next());
    }

    // 鉴权逻辑
    if (!userId) {
      return NextResponse.redirect(new URL(`/${lng}`, req.url));
    }
  });
};
