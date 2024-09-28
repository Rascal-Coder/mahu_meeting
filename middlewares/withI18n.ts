import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import acceptLanguage from "accept-language";
import { CustomMiddleware } from "@/lib/utils";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";
export const withI18n = (middleware: CustomMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
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
      return await middleware(
        req,
        event,
        NextResponse.redirect(
          new URL(
            `/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`,
            req.url
          )
        )
      );
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

    return await middleware(req, event, NextResponse.next());
  };
};